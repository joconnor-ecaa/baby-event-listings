import tempfile
from datetime import time
from enum import Enum
from pathlib import Path

import fitz
import pandas as pd
import requests
from google import genai
from pydantic import BaseModel

MODEL_NAME = "gemini-2.0-flash"

event_extraction_prompt = """Extract all of the events listed in the input.
Use UTC (+00:00) in the time fields. Use the 24-hour clock. There are AM/PM headers in the input to help you convert.
Extract all of the events and venues listed in the input.
Some events repeat on multiple days, or multiple times per day. Extract everything.
Use only the information explicitly provided in the input."""

OCR_PROMPT = """
Convert this image to markdown as accurately as possible. Pay very close attention to the text: transcription mistakes are very costly.

Do not include any preamble, comments or other text in your response.
"""


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


def page_to_text(page: fitz.Page):
    page_image = page.get_pixmap(dpi=150)
    image_bytes = page_image.tobytes(output="png")

    client = genai.Client(vertexai=True, project="tz-ml-dev", location="us-central1")

    image = genai.types.Part.from_bytes(data=image_bytes, mime_type="image/png")

    response = client.models.generate_content(
        model=MODEL_NAME,
        contents=[image, OCR_PROMPT],
    )

    return response.text


class DayEnum(str, Enum):
    MONDAY = "Monday"
    TUESDAY = "Tuesday"
    WEDNESDAY = "Wednesday"
    THURSDAY = "Thursday"
    FRIDAY = "Friday"
    SATURDAY = "Saturday"
    SUNDAY = "Sunday"


class Event(BaseModel):
    venue_name: str
    name: str
    day_of_week: DayEnum
    start_time: time | None
    end_time: time | None
    other_notes: str | None


class Venue(BaseModel):
    name: str
    address: str | None
    phone_number: str | None
    other_notes: str | None


class VenueList(BaseModel):
    venues: list[Venue]


class EventList(BaseModel):
    events: list[Event]


def structured_extraction(system_prompt, text, output_class, model_name):
    client = genai.Client(vertexai=True, project="tz-ml-dev", location="us-central1")

    response = client.models.generate_content(
        model=model_name,
        contents=[system_prompt, text],
        config=genai.types.GenerateContentConfig(
            response_mime_type="application/json",
            response_schema=output_class,
        ),
    )

    return output_class.model_validate_json(response.text)


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
            for page in doc[2:]:
                image = page.get_pixmap(dpi=150)
                pdf_name = pdf.split("/")[-1].split(".")[0]
                image.save(f"data/images/{pdf_name}.png")
                text = page_to_text(page)
                print(text)
                venues: VenueList = structured_extraction(
                    system_prompt="Extract all venues mentioned in the text.",
                    text=text,
                    output_class=VenueList,
                    model_name=MODEL_NAME,
                )
                print(venues)
                events: EventList = structured_extraction(
                    system_prompt=event_extraction_prompt,
                    text=text,
                    output_class=EventList,
                    model_name=MODEL_NAME,
                )
                print(events)
                all_venues.append(pd.json_normalize(venues.model_dump()["venues"]))
                all_events.append(pd.json_normalize(events.model_dump()["events"]))

        Path(local_file).rename(f"data/pdfs/{pdf.split('/')[-1]}")

    all_events = pd.concat(all_events)
    all_events.to_csv("data/events.csv", index=False)
    all_venues = pd.concat(all_venues)
    all_venues.to_csv("data/venues.csv", index=False)
