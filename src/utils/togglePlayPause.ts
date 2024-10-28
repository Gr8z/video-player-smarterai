import { RefObject } from 'react'
import { recordings } from '../data/recordings'

interface TogglePlayPauseParams {
  isPlaying: boolean
  videoRef: RefObject<HTMLVideoElement>
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
  currentVideoIndex: number
  setCurrentVideoIndex: React.Dispatch<React.SetStateAction<number>>
  setPlaybackTime: React.Dispatch<React.SetStateAction<number>>
}

/***
 * Toggle play/pause of the video
 * @param isPlaying - Is video playing
 * @param videoRef - Video reference
 * @param setIsPlaying - Is playing setter
 * @param currentVideoIndex - Current video index
 * @param setCurrentVideoIndex - Current video index setter
 * @param setPlaybackTime - Playback time setter
 */
export const togglePlayPause = ({
  isPlaying,
  videoRef,
  setIsPlaying,
  currentVideoIndex,
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

    // Play the video
    setIsPlaying(true)
  }
}
