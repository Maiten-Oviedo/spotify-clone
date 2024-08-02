import { useEffect, useRef, useState } from 'react'
import { playerStore } from '../store/playerStore.js'
import VolumeControl from './VolumeControl.jsx'
import SongControl from './SongControl.jsx'

export const Pause = ({ className }) => (
  <svg
    role="img"
    aria-hidden="true"
    viewBox="0 0 16 16"
    fill="currentColor"
    className={className}
  >
    <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path>
  </svg>
)
export const Play = ({ className }) => (
  <svg
    role="img"
    aria-hidden="true"
    viewBox="0 0 16 16"
    fill="currentColor"
    className={className}
  >
    <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path>
  </svg>
)

const CurrentSong = ({ image, title, artists }) => {
  return (
    <div className="flex justify-center items-center overflow-hidden w-max gap-2">
      <picture className="overflow-hidden bg-zinc-800 outline-none size-12 rounded-md shadow-lg">
        <img src={image} alt={title} />
      </picture>
      <div>
        <h3 className="font-bold text-zinc-100">{title}</h3>
        <p className="text-sm text-zinc-400">{artists?.join(', ')}</p>
      </div>
    </div>
  )
}

const Player = () => {
  const { volume, setVolume, isPlaying, setIsPlaying, currentMusic } =
    playerStore(state => state)
  const audioRef = useRef()
  const volumeRef = useRef(1)
  const previusVolume = useRef(volume)

  useEffect(() => {
    isPlaying ? audioRef.current.play() : audioRef.current.pause()
  }, [isPlaying])

  useEffect(() => {
    const { playlist, song } = currentMusic

    console.log(`Current Music: ${song}`)
    if (song) {
      const src = `/music/${playlist?.id}/0${song?.id}.mp3`
      audioRef.current.src = src
      audioRef.current.volume = volumeRef.current
      audioRef.current.play()
    }
  }, [currentMusic])

  useEffect(() => {
    audioRef.current.src = '/music/1/01.mp3'
  }, [])

  const handleClick = () => {
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleVolumeChange = event => {
    const newVolume = event.target.value / 100
    audioRef.current.volume = newVolume
    volumeRef.current = newVolume
    setVolume(newVolume)
  }

  const isVolumeSilence = volume < 0.01

  const handleVolumeSilence = () => {
    if (isVolumeSilence) {
      setVolume(previusVolume.current)
      audioRef.current.volume = previusVolume.current
    } else {
      previusVolume.current = volume
      setVolume(0)
      audioRef.current.volume = 0
    }
  }

  return (
    <div className="flex flex-row justify-center gap-20 w-full items-center h-full px-4 z-50 relative">
      <div className="absolute left-0 pl-4">
        <CurrentSong {...currentMusic.song} />
      </div>

      <div className="grid place-content-center gap-4 mx-auto">
        <div className="flex items-center flex-col gap-2">
          <button
            className="size-8 bg-white text-[#000] rounded-full p-2"
            onClick={handleClick}
          >
            {isPlaying ? <Pause /> : <Play />}
          </button>
          <SongControl audio={audioRef} />
        </div>
      </div>

      <VolumeControl
        handleVolumeChange={handleVolumeChange}
        handleVolumeSilence={handleVolumeSilence}
      />
      <audio ref={audioRef}></audio>
    </div>
  )
}

export default Player
