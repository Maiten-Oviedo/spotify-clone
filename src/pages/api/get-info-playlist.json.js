import { allPlaylists, songs as allSongs } from '../../lib/data'

export async function GET({ params, request }) {
  //Obtenemos la id de la url
  const { url } = request

  const urlObjet = new URL(url)

  const id = urlObjet.searchParams.get('id')

  //Obtenemos la playlist

  const playlist = allPlaylists.find(playlist => playlist.id === id)

  //Obtenemos las canciones de la playlist
  const songs = allSongs.filter(song => song.albumId === playlist?.albumId)

  return new Response(JSON.stringify({ playlist, songs }), {
    headers: { 'Content-Type': 'application/json' },
  })
}
