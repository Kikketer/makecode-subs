enum Phase {
    Planning = 0,
    Executing = 0
}
namespace Game {
    let currentPhase: Phase = Phase.Planning

    export function init() {
        scene.setBackgroundColor(15)
        
        Player.init()
    }
}
Game.init()
