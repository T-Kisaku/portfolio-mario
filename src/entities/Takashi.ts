import { Animation } from '../animation'
import { AudioBoard } from '../AudioBoard'
import { Entity } from './Entity'
import { loadAudioBoard } from '../loaders/audio'
import { loadSpriteSheet } from '../loaders/sprite'
import { SpriteSheet } from '../SpriteSheet'
import { Go } from '../traits/Go'
import { Jump } from '../traits/Jump'
import { Killable } from '../traits/Killable'
import { Physics } from '../traits/Physics'
import { Solid } from '../traits/Solid'
import { Stomper } from '../traits/Stomper'

const FAST_DRAG = 1 / 5000
const SLOW_DRAG = 1 / 1000

const SIZE = {
    // width: 16*4,
    // height: 16*4,
    width: 16*2,
    height: 16*2

}

export class Takashi extends Entity {
    jump = this.addTrait(new Jump())
    go = this.addTrait(new Go())
    stomper = this.addTrait(new Stomper())

    killable = this.addTrait(new Killable())
    solid = this.addTrait(new Solid())
    physics = this.addTrait(new Physics())

    constructor(
        private sprites: SpriteSheet,
        public audio: AudioBoard,
        private animations: {run: Animation, jump: Animation}
    ) {
        super()

        // width, height
        this.size.set(SIZE.width, SIZE.width)

        this.go.dragFactor = SLOW_DRAG
        this.killable.removeAfter = 0

        this.setTurboState(false)
    }

    resolveAnimationFrame() {
        if (this.jump.falling) {
            return this.animations.jump(this.go.distance)
        }

        if (this.go.distance > 0) {
            if (
                (this.vel.x > 0 && this.go.dir < 0) ||
                (this.vel.x < 0 && this.go.dir > 0)
            ) {
                return 'brake'
            }

            return this.animations.run(this.go.distance)
        }
        return 'idle'
    }

    draw(context: CanvasRenderingContext2D) {
        this.sprites.draw(
            this.resolveAnimationFrame(),
            context,
            0,
            0,
            this.go.heading < 0,
        )
    }

    setTurboState(turboState: boolean) {
        this.go.dragFactor = turboState ? FAST_DRAG : SLOW_DRAG
    }
}

export async function loadTakashi(audioContext: AudioContext) {
    const [takashiSprites, audioBoard] = await Promise.all([
        loadSpriteSheet('takashi', SIZE.width, SIZE.height),
        loadAudioBoard('takashi', audioContext),
    ])

    return function createTakashi() {
        return new Takashi(
            takashiSprites,
            audioBoard,
            {
                run: takashiSprites.getAnimation('run'),
                jump: takashiSprites.getAnimation('jump')
            }
        )
    }
}
