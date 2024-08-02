import { Pause, Play } from './Player'
import { playerStore } from '../store/playerStore.js'

const CardPlayButton = ({ id, size = 'small' }) => {
  const { currentMusic, isPlaying, setIsPlaying, setCurrentMusic } =
    playerStore(state => state)

  const isPlayingPlaylist = isPlaying && currentMusic?.playlist.id === id

  const handleClick = () => {
    console.log(id)
    if (isPlayingPlaylist) {
      setIsPlaying(false)
      return
    }

    fetch(`/api/get-info-playlist.json?id=${id}`)
      .then(res => res.json())
      .then(data => {
        const { songs, playlist } = data

        setIsPlaying(true)
        setCurrentMusic({ songs, playlist, song: songs[0] })
        console.log(`/api/get-info-playlist.json?id=${id}`)
      })
  }

  const sizeButton = size === 'small' ? 'size-4' : 'size-9 p-2'

  return (
    <button
      onClick={handleClick}
      className="card-play-button rounded-full bg-green-500 p-3 hover:scale-105 transition hover:bg-green-400"
    >
      {isPlayingPlaylist ? (
        <Pause className={sizeButton} />
      ) : (
        <Play className={sizeButton} />
      )}
    </button>
  )
}

export default CardPlayButton