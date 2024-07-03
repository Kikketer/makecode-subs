enum ActionType {
    Move,
    Fire
}

namespace Boat {
    // const boat_dl = sprites.create(assets.image`boat_dl`)
    // const boat_l = sprites.create(assets.image`boat_l`)
    
    // const boatSprites = {
    //     up: sprites.create(assets.image`boat_dl`),
    //     up_left: sprites.create(assets.image`boat_dl`),
    //     left: sprites.create(assets.image`boat_dl`),
    //     down_left: sprites.create(assets.image`boat_dl`),
    //     down: sprites.create(assets.image`boat_dl`),
    //     down_right: sprites.create(assets.image`boat_dl`),
    //     right: sprites.create(assets.image`boat_dl`),
    //     up_right: sprites.create(assets.image`boat_dl`),
    // }


    let currentSprite: Sprite
    let currentLocation: { x: number, y: number }
    let queuedAction: {
        actionType: ActionType,
            to ?: { x: number, y: number },
            depth ?: number
    }

    export function init() {
        currentSprite = sprites.create(assets.image`boat_dl`, SpriteKind.Player)
        animation.runImageAnimation(
            currentSprite,
            assets.animation`boat_l`,
            800,
            true
        )
        // console.log(boat_dl)
    }

    export function place(x: number, y: number) {
        // Can simply place on the map (start)
    }

    export function move(x: number, y: number) {
        queuedAction = {
            actionType: ActionType.Move,
            to: { x, y }
        }
    }

    export function fire(depth: number) {
        queuedAction = {
            actionType: ActionType.Fire,
            depth
        }
    }

    export function performAction() {
        // Do the action...
        // this.currentSprite.setPosition(10, 10)
        // And clear it
        queuedAction = null
    }
}
