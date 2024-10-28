import { useEffect } from 'react'
import { Recording } from './types'

export const useVideoControls = (
  recordings: Recording[],
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
      if (isPlaying) {
        videoRef.current.play().catch((err) => {
          console.error('Error attempting to play video:', err)
        })
      }
    }
  }, [currentVideoIndex])

  // Play or pause the video when isPlaying changes
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch((err) => {
          console.error('Error attempting to play video:', err)
        })
      } else {
        videoRef.current.pause()
      }
    }
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
