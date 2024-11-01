import { useEffect } from 'react'
import { recordings } from '../data/recordings'

/***
 * Custom hook to control video playback and handle video ended event
 * @param currentVideoIndex - Current video index
 * @param isPlaying - Is video playing
 * @param videoRef - Video reference
 * @param setCurrentVideoIndex - Set current video index
 * @param setIsPlaying - Set isPlaying state
 */
export const useVideoControls = (
  currentVideoIndex: number,
  isPlaying: boolean,
  videoRef: React.RefObject<HTMLVideoElement>,
  setCurrentVideoIndex: React.Dispatch<React.SetStateAction<number>>,
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
) => {
  // Load the current video when currentVideoIndex changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = recordings[currentVideoIndex].url

      // Play the video if isPlaying is true
      if (isPlaying) {
        videoRef.current.play()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentVideoIndex])

  // Play or pause the video when isPlaying changes
  useEffect(() => {
    if (videoRef.current) {
      // Play or pause the video based on isPlaying state
      if (isPlaying) {
        videoRef.current.play()
      } else {
        videoRef.current.pause()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying])

  // Handle video ended event to play the next video
  const handleVideoEnded = () => {
    if (currentVideoIndex < recordings.length - 1) {
      setCurrentVideoIndex((prevIndex) => prevIndex + 1)

      // Ensure isPlaying remains true
      setIsPlaying(true)
    } else {
      // Playback has finished all videos
      setIsPlaying(false)
    }
  }

  return { handleVideoEnded }
}
