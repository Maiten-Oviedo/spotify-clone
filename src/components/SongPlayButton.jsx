import { Pause, Play } from './Player'
import { playerStore } from '../store/playerStore'

const SongPlayButton = ({ idAlbum, idSong }) => {
  const { currentMusic, isPlaying, setIsPlaying, setCurrentMusic } =
    playerStore(state => state)

  const isPlayingSong =
    isPlaying &&
    currentMusic?.playlist.id === idAlbum &&
    currentMusic?.song.id === idSong

  const handleClick = () => {
    console.log(isPlayingSong)
    if (isPlayingSong) {
      setIsPlaying(false)
      return
    }

    fetch(`/api/get-info-playlist.json?id=${idAlbum}`)
      .then(res => res.json())
      .then(data => {
        const { songs, playlist } = data

        setIsPlaying(true)
        setCurrentMusic({ songs, playlist, song: songs[idSong - 1] })
      })
  }

  return (
    <button
      onClick={handleClick}
      className="bg-red p-3 hover:scale-110 transition w-5"
    >
      {isPlayingSong ? (
        <Pause className="text-white size-4" />
      ) : (
        <Play className="text-white size-4" />
      )}
    </button>
  )
}

export default SongPlayButton
