/***
 * formatTime.ts
 * Time formatting utility function (added hours just in case)
 * @param seconds - number of seconds
 * @returns formatted time string
 */
export const formatTime = (seconds: number): string => {
  const hrs = Math.floor(seconds / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)

  // Hide hours if not needed
  const formattedHrs = hrs > 0 ? `${hrs}:` : ''
  const formattedMins =
    hrs > 0 ? String(mins).padStart(2, '0') : mins.toString()
  const formattedSecs = String(secs).padStart(2, '0')

  // Example: 1:02:03
  return `${formattedHrs}${formattedMins}:${formattedSecs}`
}
