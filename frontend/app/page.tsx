import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import Papa from "papaparse";
import EventFilter from "./components/event-filter";

const base_url = process.env.NEXT_PUBLIC_BASE_URL || `https://${process.env.VERCEL_URL}`;

async function getData() {
  const eventsFile = await fetch(`${base_url}/data/joined.csv`).then(
    (res) => res.text(),
  )
  const venuesFile = await fetch(`${base_url}/data/venues.csv`).then(
    (res) => res.text(),
  )

  const events = Papa.parse(eventsFile, { header: true }).data
  const venues = Papa.parse(venuesFile, { header: true }).data

  return { events, venues }
}

export default async function Home() {
  const { events, venues } = await getData()

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Better Start Events: Spring 2025</h1>
      <Alert variant="warning" className="mb-4">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Disclaimer</AlertTitle>
        <AlertDescription>
          The event information displayed here has been extracted by AI. Please verify all details with the official
          sources before making any plans.
        </AlertDescription>
      </Alert>
      <EventFilter events={events} venues={venues} />
    </main>
  )
}

