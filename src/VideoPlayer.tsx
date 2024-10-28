import React, { useState, useRef, useEffect } from 'react'
import recordings from './recordings.json'
import { usePlaybackTime } from './usePlaybackTime'
import { useVideoControls } from './useVideoControls'
import { formatTime } from './formatTime'
import { togglePlayPause } from './togglePlayPause'
import { handleSeek } from './handleSeek'

import './VideoPlayer.css'

const VideoPlayer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [wasPlayingBeforeSeek, setWasPlayingBeforeSeek] = useState(false)
  const [isSeeking, setIsSeeking] = useState(false)

  const { playbackTime, setPlaybackTime, totalDuration } = usePlaybackTime(
    recordings,
    currentVideoIndex,
    isPlaying && !isSeeking, // Don't update playbackTime while seeking
    videoRef
  )

  const { handleVideoEnded } = useVideoControls(
    recordings,
    currentVideoIndex,
    isPlaying,
    videoRef,
    setCurrentVideoIndex,
    setIsPlaying
  )

  // Handle seeking start
  const handleSeekStart = () => {
    setIsSeeking(true)
    setWasPlayingBeforeSeek(isPlaying)
    if (isPlaying) {
      setIsPlaying(false)
    }
  }

  // Handle seeking end
  const handleSeekEnd = () => {
    setIsSeeking(false)
    if (wasPlayingBeforeSeek) {
      setIsPlaying(true)
    }
  }

  // Preload all videos
  useEffect(() => {
    recordings.map((recording) => {
      const videoElement = document.createElement('video')
      videoElement.src = recording.url
      videoElement.preload = 'auto'
      return videoElement
    })
  }, [])

  return (
    <div className='video-player'>
      <video
        ref={videoRef}
        width='854'
        height='480'
        onEnded={handleVideoEnded}
        controls={false}
        preload='auto'
      />
      <div className='controls'>
        <button
          onClick={() =>
            togglePlayPause({
              isPlaying,
              videoRef,
              setIsPlaying,
              currentVideoIndex,
              recordings,
              setCurrentVideoIndex,
              setPlaybackTime,
            })
          }
        >
          {isPlaying ? '❚❚' : '►'}
        </button>
        <input
          type='range'
          min='0'
          max={totalDuration}
          value={playbackTime}
          onChange={(event) =>
            handleSeek({
              event,
              setPlaybackTime,
              recordings,
              setCurrentVideoIndex,
              videoRef,
              isPlaying,
            })
          }
          step='0.1'
          onMouseDown={handleSeekStart}
          onMouseUp={handleSeekEnd}
          onTouchStart={handleSeekStart}
          onTouchEnd={handleSeekEnd}
        />
        <span>
          {formatTime(playbackTime)} / {formatTime(totalDuration)}
        </span>
      </div>
    </div>
  )
}

export default VideoPlayer
