import { Mario } from './entities/data/Mario'
import { Takashi } from './entities/data/Takashi'
import { Entity } from './entities/Entity'
import { InputRouter } from './InputRouter'
import { Keyboard, KeyListener } from './Keyboard'
import { Go } from './traits/Go'
import { Jump } from './traits/Jump'

export function setupKeyboard(target: EventTarget) {
  const input = new Keyboard()
  const router = new InputRouter<Entity>()

  const addMultiEventListener = (keyList: string[], listener: KeyListener) => keyList.forEach(key => input.addListener(key, listener))

  let leftState = 0
  let rightState = 0

  input.listenTo(target)

  addMultiEventListener(['ArrowRight', 'KeyD'], keyState => {
    rightState = keyState
    router.route((entity) => {
      entity.useTrait(Go, (go) => {
        go.dir = rightState - leftState
      })
    })
  })

  addMultiEventListener(['ArrowLeft', 'KeyA'], keyState => {
    leftState = keyState
    router.route((entity) => {
      entity.useTrait(Go, (go) => {
        go.dir = rightState - leftState
      })
    })
  })


  /** Jump */
  addMultiEventListener(['KeyZ', 'Space', 'ArrowUp'], pressed => {
    if (pressed) {
      router.route((entity) => {
        entity.useTrait(Jump, (jump) => jump.start())
      })
    } else {
      router.route((entity) => {
        entity.useTrait(Jump, (jump) => jump.cancel())
      })
    }
  })

  /** Speed up */
  addMultiEventListener(['KeyX', 'KeyF'], keyState => {
    router.route((entity) => {
      // the turbo should probably be a separate trait
      if (entity instanceof Takashi || entity instanceof Mario) {
        entity.setTurboState(keyState === 1)
      }
    })
  })

  return router
}
