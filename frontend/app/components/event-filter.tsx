"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatTime } from "@/lib/utils"
import { useMemo, useState } from "react"
import { Event, Venue } from "../types/events"
import { EventModal } from "./event-modal"
import { MultiSelect, type Option } from "./multi-select"

const ITEMS_PER_PAGE = 50

export default function EventFilter({ events, venues }: { events: Event[]; venues: Venue[] }) {
  const [selectedVenues, setSelectedVenues] = useState<string[]>([])
  const [selectedDay, setSelectedDay] = useState<string>("all")
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const uniqueDays = useMemo(
    () => Array.from(new Set(events.map((event) => event.day_of_week))).filter(Boolean),
    [events],
  )

  const venueOptions: Option[] = useMemo(
    () =>
      venues
        .filter((venue) => venue.name && venue.name.trim() !== "")
        .map((venue) => ({ value: venue.name, label: venue.name })),
    [venues],
  )

  const filteredEvents = useMemo(
    () =>
      events
        .filter(
          (event) =>
            (selectedVenues.length === 0 || selectedVenues.includes(event.name_venue)) &&
            (selectedDay === "all" || event.day_of_week === selectedDay),
        )
        .sort((a, b) => {
          // Convert time strings to comparable values (minutes since midnight)
          const getMinutes = (time: string | null) => {
            if (!time) return Infinity // Events without start time go to the end
            const [hours, minutes] = time.split(':').map(Number)
            return hours * 60 + minutes
          }
          return getMinutes(a.start_time) - getMinutes(b.start_time)
        }),
    [events, selectedVenues, selectedDay],
  )

  const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE)
  const paginatedEvents = useMemo(
    () => filteredEvents.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE),
    [filteredEvents, currentPage],
  )

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event)
  }

  const handleCloseModal = () => {
    setSelectedEvent(null)
  }

  const handleDaySelect = (day: string) => {
    setSelectedDay(day)
    setCurrentPage(1) // Reset to first page when changing filters
  }

  const getDayOfWeek = (offset: number) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const today = new Date()
    const targetDay = new Date(today.setDate(today.getDate() + offset))
    return days[targetDay.getDay()]
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <div className="w-full md:w-64">
          <h3 className="mb-2 font-semibold">Venues</h3>
          <MultiSelect
            options={venueOptions}
            selected={selectedVenues}
            onChange={(venues) => {
              setSelectedVenues(venues)
              setCurrentPage(1) // Reset to first page when changing filters
            }}
            placeholder="Select venues..."
          />
        </div>
        <div className="w-full md:w-auto">
          <h3 className="mb-2 font-semibold">Day</h3>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedDay === getDayOfWeek(0) ? "default" : "outline"}
              onClick={() => handleDaySelect(getDayOfWeek(0))}
            >
              Today
            </Button>
            <Button
              variant={selectedDay === getDayOfWeek(1) ? "default" : "outline"}
              onClick={() => handleDaySelect(getDayOfWeek(1))}
            >
              Tomorrow
            </Button>
            <Select value={selectedDay} onValueChange={handleDaySelect}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select day" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Days</SelectItem>
                {uniqueDays.map((day) => (
                  <SelectItem key={day} value={day}>
                    {day || "Unnamed Day"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Event Name</TableHead>
            <TableHead>Venue</TableHead>
            <TableHead>Day</TableHead>
            <TableHead>Start</TableHead>
            <TableHead>End</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedEvents.map((event, index) => (
            <TableRow key={index} className="cursor-pointer hover:bg-gray-100" onClick={() => handleEventClick(event)}>
              <TableCell>{event.name || "Unnamed Event"}</TableCell>
              <TableCell>{event.name_venue || "Unknown"}</TableCell>
              <TableCell>{event.day_of_week || "No Day"}</TableCell>
              <TableCell>{formatTime(event.start_time)}</TableCell>
              <TableCell>{formatTime(event.end_time)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="flex items-center px-4">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}

      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          venue={venues.find((v) => v.name === selectedEvent.name_venue)}
          isOpen={!!selectedEvent}
          onClose={handleCloseModal}
        />
      )}
    </div>
  )
}

