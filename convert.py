import pandas as pd

# Read the CSV files
events_df = pd.read_csv("frontend/public/data/joined.csv")
venues_df = pd.read_csv("frontend/public/data/venues.csv")

# If you want TypeScript types, you can save as .ts files instead
with open("frontend/data/events.ts", "w") as f:
    f.write(f'const events = {events_df.to_json(orient="records", indent=2)}\n\n')
    f.write("export default events;")

with open("frontend/data/venues.ts", "w") as f:
    f.write(f'const venues = {venues_df.to_json(orient="records", indent=2)}\n\n')
    f.write("export default venues;")
