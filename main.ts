enum Phase {
    Planning = 0,
    Executing = 0
}
namespace Game {
    let currentPhase: Phase = Phase.Planning

    export function init() {
        scene.setBackgroundColor(9)
        
        Multiplayer.init()
        Player.init()
    }
}

Game.init()
