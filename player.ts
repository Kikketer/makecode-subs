type Depth = 1 | 2 | 3

class SubsPlayer {
    boats: Array<Boat> = []
    subs: Array<Sub> = []
    mine: Mine
    queuedAction: { action: ActionType, boat: Boat, toX?: number, toY?: number }

    constructor() {
        // this.mySprite = sprite
        // ctrl.onButtonEvent(ControllerButton.Left, ControllerButtonEvent.Pressed, () => this.move())
    }

    // Setups:
    placeSub(x: number, y: number, depth: Depth) {}

    placeMine(x: number, y: number) {}

    moveBoat(boatIndex: number, x: number, y: number) {
        if (!this.boats[boatIndex]) return

        this.queuedAction = {
            action: ActionType.Move,
            boat: this.boats[boatIndex],
            toX: x,
            toY: y
        }
    }

    fireDepthCharge(boatIndex: number) {
        if (!this.boats[boatIndex]) return

        this.queuedAction = {
            action: ActionType.Fire,
            boat: this.boats[boatIndex]
        }
    }

    clearAction() {
        this.queuedAction = undefined
    }
}
