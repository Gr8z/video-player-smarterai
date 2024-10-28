import { useState, useEffect, useRef } from 'react'
import { recordings } from '../data/recordings'

/***
 * Custom hook to calculate playback time and total duration
 * @param currentVideoIndex - Current video index
 * @param isPlaying - Is video playing
 * @param videoRef - Video reference
 * @returns playbackTime, setPlaybackTime, totalDuration
 */
export const usePlaybackTime = (
  currentVideoIndex: number,
  isPlaying: boolean,
  videoRef: React.RefObject<HTMLVideoElement>
) => {
  const [playbackTime, setPlaybackTime] = useState(0)
  const totalDurationRef = useRef<number>(0)

  // Calculate total duration only once
  useEffect(() => {
    const duration = recordings.reduce((acc, rec) => {
      return acc + (rec.endTimestamp - rec.startTimestamp) / 1000
    }, 0)
    totalDurationRef.current = duration
  }, [])

  // Update playback time smoothly
  useEffect(() => {
    let animationFrameId: number

    // Update playback time based on the current video index, isPlaying state, and video reference
    const updatePlaybackTime = () => {
      let accumulatedTime = 0

      // Calculate accumulated time for all the videos before the current video
      for (let i = 0; i < currentVideoIndex; i++) {
        accumulatedTime +=
          (recordings[i].endTimestamp - recordings[i].startTimestamp) / 1000
      }

      // Add the current video's playback time
      if (videoRef.current) {
        setPlaybackTime(accumulatedTime + videoRef.current.currentTime)
      }

      // Request next frame
      animationFrameId = requestAnimationFrame(updatePlaybackTime)
    }

    // If video is playing, request animation frame
    if (isPlaying) {
      animationFrameId = requestAnimationFrame(updatePlaybackTime)
    }

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [isPlaying, currentVideoIndex, videoRef])

  return {
    playbackTime,
    setPlaybackTime,
    totalDuration: totalDurationRef.current,
  }
}
