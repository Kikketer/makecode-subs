enum Phase {
    ActionMenu,
    Planning,
    Executing
}

namespace Game {
    let currentPhase: Phase = Phase.Planning
    let player: SubsPlayer
    let currentFocus

    export function init() {
        scene.setBackgroundColor(0)
        scene.setBackgroundImage(assets.image`Main Board`)

        player = new SubsPlayer()

        setPhase()
    }

    function setPhase() {
        if (currentPhase === Phase.ActionMenu) {
        } else if (currentPhase === Phase.Planning) {
            Board.focus({ 
                mode: SelectionMode.YourSubs,
                row: 3,
                col: 2,
                onSelectCallback: ({ row, col, depth }) => {
                    console.log(row + ':' + col + ':' + depth)
                    currentPhase = Phase.Executing
                    Board.blur()
                } 
            })
        }
    }

    function focusCursor() {}

    function focusMenu() {}
}
Game.init()
