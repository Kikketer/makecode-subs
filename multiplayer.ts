namespace MultiplayerState {
    export const isReady = create()
}

namespace Multiplayer {
    let connectedPlayers: Array<{
        connected: boolean
        player: mp.Player
    }> = []

    function onPlayerConnected(player: mp.Player) {
        console.log('Another player connected! ' + player.index)
        
        // Check to see if this player index is already initialized
        if (!connectedPlayers[player.index]) {
            connectedPlayers[player.index] = {
                connected: true,
                player
            }
            // mp.setPlayerSprite(player, sprite)
        }
        console.log('Players: ' + JSON.stringify(connectedPlayers))
    }

    function onPlayerDisconnect(player: mp.Player) {
        console.log('Player disconnected ' + player.index)
    }

    export function init() {
        // mp.setPlayerState(mp.getPlayerByIndex(0), MultiplayerState.isReady, 0)
        mp.onControllerEvent(ControllerEvent.Connected, onPlayerConnected)
        mp.onControllerEvent(ControllerEvent.Disconnected, onPlayerDisconnect)
    }

    export function connect() {
    }
}
