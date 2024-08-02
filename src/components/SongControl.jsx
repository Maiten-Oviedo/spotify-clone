import { useEffect, useState } from 'react'

const SongControl = ({ audio }) => {
  const [currenTime, setCurrenTime] = useState(0)
  const duration = audio?.current?.duration

  useEffect(() => {
    audio.current.addEventListener('timeupdate', handleTimeUpdate)
    return () => {
      audio.current.removeEventListener('timeupdate', handleTimeUpdate)
    }
  }, [audio])

  const handleTimeUpdate = () => {
    setCurrenTime(audio.current.currentTime)
  }

  const formatTime = time => {
    if (time === null) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes.toString()}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="flex text-zinc-100/70 text-xs items-center gap-2">
      <span>{formatTime(currenTime)}</span>
      <input
        defaultValue={[0]}
        value={[currenTime]}
        type="range"
        className="w-[410px] h-1 bg-gray-200 rounded-lg outline-none appearance-none cursor-pointer focus:outline-none"
        min={[0]}
        max={[audio?.current?.duration ?? 0]}
        onChange={value => {
          audio.current.currentTime = value.target.value
        }}
      />

      <span>{duration ? formatTime(duration) : '0:00'}</span>
    </div>
  )
}

export default SongControl
