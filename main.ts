enum Phase {
    ActionMenu,
    Planning,
    Executing
}

namespace Game {
    let currentPhase: Phase = Phase.ActionMenu
    let player: SubsPlayer
    let currentFocus

    export function init() {
        scene.setBackgroundColor(0)
        scene.setBackgroundImage(assets.image`Main Board`)

        player = new SubsPlayer()
        player.placeBoats()

        setPhase()
    }

    function setPhase() {
        if (currentPhase === Phase.ActionMenu) {
            Board.blur()
            Menu.focus({
                onMoveBoat: () => {
                    Menu.blur()
                    Board.focus({
                        mode: SelectionMode.Boats,
                        onSelectCallback: () => {}
                    })
                },
                onDropCharge: () => {
                    Menu.blur()
                    // Board.focus({
                    //     mode: SelectionMode.TheirSubs
                    // })
                }
            })
        } else if (currentPhase === Phase.Executing) {
            Menu.blur()
            Board.blur()
        }
    }

    function focusCursor() {}

    function focusMenu() {}
}
Game.init()
