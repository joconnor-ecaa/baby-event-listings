export function formatTime(time: string | null | undefined): string {
  if (!time) return "-"

  // If the time is already in HH:MM format, return it as is
  if (/^\d{2}:\d{2}$/.test(time)) return time

  // If the time is a decimal, convert it to HH:MM
  const decimalTime = Number.parseFloat(time)
  if (!isNaN(decimalTime)) {
    const hours = Math.floor(decimalTime)
    const minutes = Math.round((decimalTime - hours) * 60)
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`
  }

  return time // Return original value if it doesn't match expected formats
}

