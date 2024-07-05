enum Phase {
    Planning = 0,
    Executing = 0
}
namespace Game {
    let currentPhase: Phase = Phase.Planning
    let player: SubsPlayer

    export function init() {
        scene.setBackgroundColor(0)
        scene.setBackgroundImage(assets.image`Main Board`)

        player = new SubsPlayer()

        controller.right.onEvent(ControllerButtonEvent.Pressed, () => {
            Board.moveCursor(CursorDirection.Right)
        })
        controller.left.onEvent(ControllerButtonEvent.Pressed, () => {
            Board.moveCursor(CursorDirection.Left)
        })
        controller.up.onEvent(ControllerButtonEvent.Pressed, () => {
            Board.moveCursor(CursorDirection.Up)
        })
        controller.down.onEvent(ControllerButtonEvent.Pressed, () => {
            Board.moveCursor(CursorDirection.Down)
        })

        // Render loop:
        if (currentPhase === Phase.Planning) {
            Board.render()
        }
    }
}

Game.init()
