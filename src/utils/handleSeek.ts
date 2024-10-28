import { RefObject } from 'react'
import { Recording } from '../types/Recording.type'

interface HandleSeekParams {
  event: React.ChangeEvent<HTMLInputElement>
  setPlaybackTime: React.Dispatch<React.SetStateAction<number>>
  recordings: Recording[]
  setCurrentVideoIndex: React.Dispatch<React.SetStateAction<number>>
  videoRef: RefObject<HTMLVideoElement>
  isPlaying: boolean // Use wasPlayingBeforeSeek
}

export const handleSeek = ({
  event,
  setPlaybackTime,
  recordings,
  setCurrentVideoIndex,
  videoRef,
  isPlaying,
}: HandleSeekParams) => {
  const time = parseFloat(event.target.value)
  setPlaybackTime(time)
  let accumulatedTime = 0
  for (let i = 0; i < recordings.length; i++) {
    const recDuration =
      (recordings[i].endTimestamp - recordings[i].startTimestamp) / 1000
    if (accumulatedTime + recDuration >= time) {
      setCurrentVideoIndex(i)
      const timeInVideo = time - accumulatedTime
      if (videoRef.current) {
        videoRef.current.src = recordings[i].url
        videoRef.current.currentTime = timeInVideo
        if (isPlaying) {
          videoRef.current.play().catch((err) => {
            console.error('Error attempting to play video:', err)
          })
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
