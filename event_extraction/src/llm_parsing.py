import json
from datetime import time
from enum import Enum
from pathlib import Path

import pandas as pd
import typer
from google import genai
from google.genai import types
from pydantic import BaseModel
from table_chunkers import GroupedMultiRowChunker


def extract_outputs(x: dict):
    return x.additional_kwargs["function_call"]["arguments"]


def get_schema_string(pydantic_model):
    # Copy schema to avoid altering original Pydantic schema.
    schema = {k: v for k, v in pydantic_model.schema().items()}

    # Remove extraneous fields.
    reduced_schema = schema
    if "title" in reduced_schema:
        del reduced_schema["title"]
    if "type" in reduced_schema:
        del reduced_schema["type"]
    # Ensure json in context is well-formed with double quotes.
    return json.dumps(reduced_schema)


class DayEnum(str, Enum):
    MONDAY = "Monday"
    TUESDAY = "Tuesday"
    WEDNESDAY = "Wednesday"
    THURSDAY = "Thursday"
    FRIDAY = "Friday"
    SATURDAY = "Saturday"
    SUNDAY = "Sunday"


class Event(BaseModel):
    name: str
    day_of_week: DayEnum
    color: str
    start_time: time | None
    end_time: time | None
    other_notes: str | None


class Venue(BaseModel):
    name: str
    color: str
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
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
            response_schema=output_class,
        ),
    )

    return output_class.model_validate_json(response.text)


def main(csv_path: str, output_dir: str, model_name: str = "gemini-2.0-flash-001"):

    csv_path = Path(csv_path)
    output_dir = Path(output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)
    df = pd.read_csv(csv_path)

    chunker = GroupedMultiRowChunker(
        table_description="A table of events and venues",
        group_columns=["cluster_position"],
    )

    chunks = chunker.get_chunks(df)
    venues = structured_extraction(
        system_prompt="Extract all of the venues listed in the input.",
        text=chunks[0],
        output_class=VenueList,
        model_name=model_name,
    )
    venues_df = pd.DataFrame([venue.model_dump() for venue in venues.venues])
    output_path = output_dir / f"{csv_path.stem}_venues.csv"
    venues_df.to_csv(output_path, index=False)

    outputs = []
    for text in chunks[1:]:
        outputs.append(
            structured_extraction(
                system_prompt="""Extract all of the events listed in the input.
                Use UTC (+00:00) in the time fields. Use the 24-hour clock. There are AM/PM headers in the input to help you convert.
                Extract all of the events and venues listed in the input.
                Some events repeat on multiple days, or multiple times per day. Extract everything.
                Use only the information explicitly provided in the input.""",
                text=text,
                output_class=EventList,
                model_name=model_name,
            )
        )
    events_df = pd.DataFrame(
        [event.model_dump() for output in outputs for event in output.events]
    )
    output_path = output_dir / f"{csv_path.stem}_events.csv"
    events_df.to_csv(output_path, index=False)

    print(f"Extracted {len(events_df)} events and {len(venues_df)} venues")


if __name__ == "__main__":
    typer.run(main)
