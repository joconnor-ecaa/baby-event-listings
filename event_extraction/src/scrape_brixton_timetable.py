import tempfile
from pathlib import Path

import fitz
import llm_parsing
import pandas as pd
import parse_timetable_image
import requests


def download_pdf(url):
    # Download the PDF
    response = requests.get(url)
    if response.status_code != 200:
        raise Exception(f"Failed to download PDF. Status code: {response.status_code}")

    # Create a temporary file to store the PDF
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp_file:
        tmp_file.write(response.content)
        tmp_file_path = tmp_file.name
    return tmp_file_path


def find_pdf_links(url):
    # Send GET request to the URL
    response = requests.get(url)
    if response.status_code != 200:
        raise Exception(f"Failed to fetch page. Status code: {response.status_code}")

    # Get the page content
    page_content = response.text

    # Find all PDF links
    pdf_links = []
    # Look for href attributes containing .pdf
    for line in page_content.split('"'):
        if ".pdf" in line.lower():
            # Clean up the URL
            pdf_url = line.strip()
            # Handle relative URLs
            if pdf_url.startswith("/"):
                # Convert relative URL to absolute
                from urllib.parse import urljoin

                pdf_url = urljoin(url, pdf_url)
            pdf_links.append(pdf_url)

    return pdf_links


if __name__ == "__main__":

    pdfs = find_pdf_links(
        "https://www.lambeth.gov.uk/children-young-people-families/childrens-centres/better-start-childrens-centre-timetables"
    )
    tables = []
    all_events = []
    all_venues = []
    for pdf in pdfs:
        local_file = download_pdf(url=pdf)
        with fitz.open(local_file) as doc:
            num_pages = len(doc)
            last_page = doc[-1]
            for i, table in enumerate(last_page.find_tables()):
                table.to_pandas().to_csv(
                    f"data/tables/{pdf.split('/')[-1]}_{i}.csv",
                    index=False,
                )
            image = last_page.get_pixmap(dpi=150)
            pdf_name = pdf.split("/")[-1].split(".")[0]
            image.save(f"data/images/{pdf_name}.png")
            parse_timetable_image.main(
                image_path=f"data/images/{pdf_name}.png",
                output_path=f"data/colour_tables/{pdf_name}.csv",
            )
            llm_parsing.main(
                csv_path=f"data/colour_tables/{pdf_name}.csv",
                output_dir=f"data/structured_tables/",
            )
            venues = pd.read_csv(
                f"data/structured_tables/{pdf_name}_venues.csv"
            ).assign(document_id=pdf_name)
            all_venues.append(venues)
            events = pd.read_csv(
                f"data/structured_tables/{pdf_name}_events.csv"
            ).assign(document_id=pdf_name)
            all_events.append(events)

        Path(local_file).rename(f"data/pdfs/{pdf.split('/')[-1]}")

    all_events = pd.concat(all_events)
    all_events.to_csv("data/events.csv", index=False)
    all_venues = pd.concat(all_venues)
    all_venues.to_csv("data/venues.csv", index=False)

    joined = all_events.merge(
        all_venues, on=["document_id", "color"], suffixes=("", "_venue")
    )
    joined.to_csv("data/joined.csv", index=False)
