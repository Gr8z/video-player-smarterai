import { RefObject } from 'react'
import { Recording } from '../types/Recording.type'

interface TogglePlayPauseParams {
  isPlaying: boolean
  videoRef: RefObject<HTMLVideoElement>
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
  currentVideoIndex: number
  recordings: Recording[]
  setCurrentVideoIndex: React.Dispatch<React.SetStateAction<number>>
  setPlaybackTime: React.Dispatch<React.SetStateAction<number>>
}

export const togglePlayPause = ({
  isPlaying,
  videoRef,
  setIsPlaying,
  currentVideoIndex,
  recordings,
  setCurrentVideoIndex,
  setPlaybackTime,
}: TogglePlayPauseParams) => {
  if (isPlaying) {
    videoRef.current?.pause()
    setIsPlaying(false)
  } else {
    // If playback has ended, reset to start
    if (
      currentVideoIndex === recordings.length - 1 &&
      videoRef.current?.ended
    ) {
      setCurrentVideoIndex(0)
      setPlaybackTime(0)
    }
    setIsPlaying(true)
  }
}
