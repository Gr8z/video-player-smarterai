import { useState, useEffect, useRef } from 'react'
import { recordings } from '../data/recordings'

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

    const updatePlaybackTime = () => {
      let accumulatedTime = 0
      for (let i = 0; i < currentVideoIndex; i++) {
        accumulatedTime +=
          (recordings[i].endTimestamp - recordings[i].startTimestamp) / 1000
      }
      if (videoRef.current) {
        setPlaybackTime(accumulatedTime + videoRef.current.currentTime)
      }
      animationFrameId = requestAnimationFrame(updatePlaybackTime)
    }

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
