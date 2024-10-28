export const formatTime = (seconds: number): string => {
  const hrs = Math.floor(seconds / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)

  const formattedHrs = hrs > 0 ? `${hrs}:` : ''
  const formattedMins =
    hrs > 0 ? String(mins).padStart(2, '0') : mins.toString()
  const formattedSecs = String(secs).padStart(2, '0')

  return `${formattedHrs}${formattedMins}:${formattedSecs}`
}
