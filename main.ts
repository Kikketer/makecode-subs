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
    }
}

Game.init()
