import { loadJSON } from '.'
import { urlResolver } from '@/utils/resolver'
import { MusicPlayer } from '../MusicPlayer'

type MusicSheetSpec = {
  [_ in string]: {
    url: string
  }
}

export async function loadMusicSheet(name: string) {
  const musicSheet = await loadJSON<MusicSheetSpec>(urlResolver(`music/${name}.json`))

  const musicPlayer = new MusicPlayer()
  for (const [name, track] of Object.entries(musicSheet)) {
    musicPlayer.addTrack(name, track.url)
  }

  return musicPlayer
}
