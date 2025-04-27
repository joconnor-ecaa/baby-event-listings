export type Event = {
  name: string
  day_of_week: string
  start_time: string | null
  end_time: string | null
  name_venue: string
  other_notes: string | null
  document_id: string
  address: string
  phone_number: string | null
  other_notes_venue: string | null
}

export type Venue = {
  name: string
  address: string
  phone_number: string | null
  other_notes: string | null
  document_id: string
} 