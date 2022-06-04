import { Entity } from './Entity'
import { Dict } from '../types'

/**Below things are implemented data of entity */
import { loadBullet } from './data/Bullet'
import { loadCannon } from './data/Cannon'
import { loadGoomba } from './data/Goomba'
import { loadKoopa } from './data/Koopa'
import { loadMario } from './data/Mario'
import { loadTakashi } from './data/Takashi'

export type EntityFactory = () => Entity

export type EntityFactoryDict = Dict<EntityFactory>

export async function loadEntities(
  audioContext: AudioContext,
): Promise<EntityFactoryDict> {
  const factories: EntityFactoryDict = {}

  const addAs = (name: string) => (factory: EntityFactory) => {
    factories[name] = factory
  }

  await Promise.all([
    loadMario(audioContext).then(addAs('mario')),
    loadTakashi(audioContext).then(addAs('takashi')),
    loadGoomba().then(addAs('goomba')),
    loadKoopa().then(addAs('koopa')),
    loadBullet().then(addAs('bullet')),
    loadCannon(audioContext).then(addAs('cannon')),
  ])

  return factories
}
