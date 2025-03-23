# Better Start Events

A Next.js application for viewing and filtering events from the Better Start Spring 2025 schedule. The app provides an interactive interface to browse events by venue and day of the week.

## Features

- Filter events by multiple venues
- Filter by day of the week with quick access to today and tomorrow
- View detailed event information including venue details
- Responsive design that works on both desktop and mobile
- Search functionality within venue selection
- Interactive table with event details
- Modal view for detailed event and venue information

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Data Parsing**: Papa Parse for CSV handling
- **TypeScript**: For type safety and better developer experience

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
   If you encounter dependency conflicts, you can try:
   ```bash
   npm install --legacy-peer-deps
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Data Structure

The application expects two CSV files:

### Events CSV
Contains event information with the following fields:
- name
- venue_name
- day_of_week
- start_time
- end_time

### Venues CSV
Contains venue information with the following fields:
- name
- address
- phone_number

## Components

- `EventFilter`: Main component for filtering and displaying events
- `EventModal`: Displays detailed event and venue information
- `MultiSelect`: Reusable component for selecting multiple venues

## Disclaimer

The event information is extracted using AI and should be verified with official sources before making any plans.

## License

MIT 