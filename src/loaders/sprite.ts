import { createAnimation } from '../animation'
import { loadImage, loadJSON } from '.'
import { urlResolver } from '@/utils/resolver'
import { SpriteSheet } from '../SpriteSheet'
import { SpriteSheetSpec } from './types'

export async function loadSpriteSheet(name: string, dWidth?: number, dHeight?: number) {

  const url = `sprites/${name}.json`
  const sheetSpec = await loadJSON<SpriteSheetSpec>(urlResolver(url))
  const image = await loadImage(sheetSpec.imageURL)
  const sprites = new SpriteSheet(image, sheetSpec.tileW, sheetSpec.tileH)

  if (sheetSpec.tiles) {
    sheetSpec.tiles.forEach(tileSpec => {
      const [x, y] = tileSpec.index
      sprites.defineTile(tileSpec.name, x, y)
    })
  }

  if (sheetSpec.frames) {
    sheetSpec.frames.forEach(frameSpec => {
      const [x, y, width, height] = frameSpec.rect
      sprites.define(frameSpec.name, x, y, width, height, dWidth, dHeight)
    })
  }

  if (sheetSpec.animations) {
    sheetSpec.animations.forEach(animSpec => {
      const animation = createAnimation(animSpec.frames, animSpec.frameLength)
      sprites.defineAnimation(animSpec.name, animation)
    })
  }

  return sprites
}