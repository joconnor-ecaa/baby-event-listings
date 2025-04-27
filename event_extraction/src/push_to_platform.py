import pandas as pd
import typer


@typer.run
def main():
    events = pd.read_csv("data/events.csv")
    venues = pd.read_csv("data/venues.csv")
    venues = venues.drop_duplicates(subset=["name"])
    events = events.drop_duplicates(
        subset=["name", "day_of_week", "start_time", "end_time"]
    )
    j = pd.merge(
        events, venues, left_on="venue_name", right_on="name", suffixes=("", "_venue")
    )

    # If you want TypeScript types, you can save as .ts files instead
    with open("../frontend/data/events.ts", "w") as f:
        f.write(f'const events = {j.to_json(orient="records", indent=2)}\n\n')
        f.write("export default events;")

    with open("../frontend/data/venues.ts", "w") as f:
        f.write(f'const venues = {venues.to_json(orient="records", indent=2)}\n\n')
        f.write("export default venues;")
