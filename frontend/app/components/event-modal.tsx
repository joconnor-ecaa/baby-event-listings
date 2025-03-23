import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { formatTime } from "@/lib/utils"

type Event = {
  name: string
  venue_name: string
  day_of_week: string
  start_time: string
  end_time: string
  name_venue: string
  other_notes: string
}

type Venue = {
  name: string
  address: string
  phone_number: string
  other_notes: string
}

type EventModalProps = {
  event: Event
  venue: Venue | undefined
  isOpen: boolean
  onClose: () => void
}

export function EventModal({ event, venue, isOpen, onClose }: EventModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{event.name}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">Venue:</span>
            <span className="col-span-3">{event.venue_name || "Unknown"}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">Day:</span>
            <span className="col-span-3">{event.day_of_week || "No Day"}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">Time:</span>
            <span className="col-span-3">
              {formatTime(event.start_time)} - {formatTime(event.end_time)}
            </span>
          </div>
          {venue && (
            <>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-bold">Address:</span>
                <span className="col-span-3">{venue.address || "Not available"}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-bold">Phone:</span>
                <span className="col-span-3">{venue.phone_number || "Not available"}</span>
              </div>
              {venue.other_notes && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="font-bold">Venue Notes:</span>
                  <span className="col-span-3">{venue.other_notes}</span>
                </div>
              )}
            </>
          )}
          {event.other_notes && (
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-bold">Event Notes:</span>
              <span className="col-span-3">{event.other_notes}</span>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

