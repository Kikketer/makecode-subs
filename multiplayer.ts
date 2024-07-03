namespace Multiplayer {
    let isConnected: boolean = false
    let connectedPlayers: Array<mp.Player> = []

    function onPlayerConnected(player: mp.Player) {
        console.log('Another player connected! ' + JSON.stringify(player))
        console.log('Players ' + JSON.stringify(connectedPlayers))
    }

    export function init() {
        connectedPlayers = mp.allPlayers()
        mp.onControllerEvent(ControllerEvent.Connected, onPlayerConnected)
    }

    export function connect() {
    }
}
