import React, { useState, useRef, useEffect } from 'react'
import { usePlaybackTime } from './hooks/usePlaybackTime'
import { useVideoControls } from './hooks/useVideoControls'
import { formatTime } from './utils/formatTime'
import { togglePlayPause } from './utils/togglePlayPause'
import { handleSeek } from './utils/handleSeek'

import './VideoPlayer.scss'

/**
 * VideoPlayer Component
 *
 * This component is a custom video player. It includes the following features:
 *
 * - Video playback with play/pause functionality.
 * - Seeking functionality with a range input.
 * - Display of current playback time and total duration.
 * - Prefetching of the next video to improve loading times.
 */
const VideoPlayer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [wasPlayingBeforeSeek, setWasPlayingBeforeSeek] = useState(false)
  const [isSeeking, setIsSeeking] = useState(false)

  const { playbackTime, setPlaybackTime, totalDuration } = usePlaybackTime(
    currentVideoIndex,
    isPlaying && !isSeeking,
    videoRef
  )

  const { handleVideoEnded } = useVideoControls(
    currentVideoIndex,
    isPlaying,
    videoRef,
    setCurrentVideoIndex,
    setIsPlaying
  )

  // prefetch next video
  useEffect(() => {
    // Add 2 to the current video index
    const nextVideoIndex = currentVideoIndex + 2

    // If the next video index is less than or equal to 3, prefetch the video
    if (nextVideoIndex <= 3) {
      const nextVideo = new Audio()
      nextVideo.src = require(`./recordings/video${nextVideoIndex}.mp4`)
    }
  }, [currentVideoIndex])

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

  return (
    <div className='video-player'>
      <video
        ref={videoRef}
        onEnded={handleVideoEnded}
        controls={false}
        height='480'
      />
      <div className='controls'>
        <button
          onClick={() =>
            togglePlayPause({
              isPlaying,
              videoRef,
              setIsPlaying,
              currentVideoIndex,
              setCurrentVideoIndex,
              setPlaybackTime,
            })
          }
        >
          {isPlaying ? '⏸️' : '▶️'}
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
              setCurrentVideoIndex,
              videoRef,
              isPlaying,
            })
          }
          step='0.01'
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
