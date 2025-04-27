import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import eventsData from '@/data/events';
import venuesData from '@/data/venues';
import { AlertTriangle } from "lucide-react";
import EventFilter from "./components/event-filter";

export default async function Home() {
  const events = eventsData.map((event, index) => ({
    ...event,
    document_id: `event-${index}`,
  }));
  const venues = venuesData.map((venue, index) => ({
    ...venue,
    document_id: `venue-${index}`,
  }));

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Better Start Events: Summer 2025</h1>
      <Alert variant="default" className="mb-4">
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

