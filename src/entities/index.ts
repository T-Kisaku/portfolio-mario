import { loadBullet } from './Bullet'
import { loadCannon } from './Cannon'
import { loadGoomba } from './Goomba'
import { loadKoopa } from './Koopa'
import { loadMario } from './Mario'
import { loadTakashi } from './Takashi'
import { Entity } from './Entity'
import { Dict } from '../types'

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
