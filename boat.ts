enum ActionType {
    Move,
    Fire
}

namespace Boat {
    const boatSprites = {
        up: sprites.create(assets.image`boat_dl`),
        up_left: sprites.create(assets.image`boat_dl`),
        left: sprites.create(assets.image`boat_dl`),
        down_left: sprites.create(assets.image`boat_dl`),
        down: sprites.create(assets.image`boat_dl`),
        down_right: sprites.create(assets.image`boat_dl`),
        right: sprites.create(assets.image`boat_dl`),
        up_right: sprites.create(assets.image`boat_dl`),
    }

    export class Boat {
        constructor() { }

        currentLocation: { x: number, y: number }

        queuedAction: {
            actionType: ActionType,
            to?: { x: number, y: number },
            depth?: number
        }

        place(x: number, y: number) {
            // Can simply place on the map (start)
        }

        move(x: number, y: number) {
            this.queuedAction = {
                actionType: ActionType.Move,
                to: { x, y }
            }
        }

        fire(depth: number) {
            this.queuedAction = {
                actionType: ActionType.Fire,
                depth
            }
        }

        performAction() {
            // Do the action...
            // And clear it
            this.queuedAction = null
        }
    }
}
