from pathlib import Path

import pandas as pd
import typer
from loguru import logger


@typer.run
def main(input_dir: str):
    input_dir = Path(input_dir)
    events = pd.concat([pd.read_csv(csv_path) for csv_path in input_dir.glob('*_events.csv')])
    num_events = len(events)
    events = events.drop_duplicates(subset=['name', 'day_of_week', 'start_time', 'end_time'])
    num_events_deduplicated = len(events)
    logger.info(f"Deduplicated {num_events - num_events_deduplicated} events")

    venues = pd.concat([pd.read_csv(csv_path) for csv_path in input_dir.glob('*_venues.csv')])
    num_venues = len(venues)
    venues = venues.drop_duplicates(subset=['name'])
    num_venues_deduplicated = len(venues)
    logger.info(f"Deduplicated {num_venues - num_venues_deduplicated} venues")

    print(events.describe())
    print(venues.describe())

    events.to_csv('gs://tz-ml-public/timetable_parsing/events.csv', index=False)
    venues.to_csv('gs://tz-ml-public/timetable_parsing/venues.csv', index=False)
