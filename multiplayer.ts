namespace MultiplayerState {
    export const isReady = create()
}

namespace Multiplayer {
    let connectedPlayers: Array<mp.Player> = []

    function onPlayerConnected(player: mp.Player, sprite: Sprite) {
        console.log('Another player connected! ' + player.index)
        console.log('Players ' + JSON.stringify(connectedPlayers))
        mp.setPlayerSprite(player, sprite)
    }

    function onPlayerDisconnect(player: mp.Player) {
        console.log('Player disconnected ' + player.index)
    }

    export function init(sprite: Sprite) {
        // mp.setPlayerState(mp.getPlayerByIndex(0), MultiplayerState.isReady, 0)
        connectedPlayers = mp.allPlayers()
        mp.onControllerEvent(ControllerEvent.Connected, (player: mp.Player) => onPlayerConnected(player, sprite))
        mp.onControllerEvent(ControllerEvent.Disconnected, onPlayerDisconnect)
    }

    export function connect() {
    }
}
