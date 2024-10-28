import { RefObject } from 'react'
import { recordings } from '../data/recordings'

interface HandleSeekParams {
  event: React.ChangeEvent<HTMLInputElement>
  setPlaybackTime: React.Dispatch<React.SetStateAction<number>>
  setCurrentVideoIndex: React.Dispatch<React.SetStateAction<number>>
  videoRef: RefObject<HTMLVideoElement>
  isPlaying: boolean
}

/***
 * Handle seeking in the video player
 * @param event - Change event
 * @param setPlaybackTime - Playback time setter
 * @param setCurrentVideoIndex - Current video index setter
 * @param videoRef - Video reference
 * @param isPlaying - Is video playing
 */
export const handleSeek = async ({
  event,
  setPlaybackTime,
  setCurrentVideoIndex,
  videoRef,
  isPlaying,
}: HandleSeekParams) => {
  let accumulatedTime = 0
  const time = parseFloat(event.target.value)
  setPlaybackTime(time)

  for (let i = 0; i < recordings.length; i++) {
    // Calculate the duration of the recording in seconds
    const recDuration =
      (recordings[i].endTimestamp - recordings[i].startTimestamp) / 1000

    // If the accumulated time plus the duration of the recording is greater than the time
    if (accumulatedTime + recDuration >= time) {
      setCurrentVideoIndex(i)
      const timeInVideo = time - accumulatedTime

      if (videoRef.current) {
        // Set the video source and time
        videoRef.current.src = recordings[i].url
        videoRef.current.currentTime = timeInVideo

        // Play or pause the video
        if (isPlaying) {
          await videoRef.current.play()
        } else {
          videoRef.current.pause()
        }
      }

      break
    } else {
      accumulatedTime += recDuration
    }
  }
}
