// namespace MultiplayerState {
//     export const isReady = create()
// }

// namespace Multiplayer {
//     let connectedPlayers: Array<{
//         connected: boolean
//         controller?: controller.Controller
//         // player?: mp.Player
//         player: SubsPlayer
//         boats?: Array<{ x: number, y: number }>
//         subs?: Array<{ x: number, y: number }>
//     }> = []

//     function getControllerFromIndex(playerIndex: number) {
//         if (playerIndex === 0) return controller.player1
//         if (playerIndex === 1) return controller.player2

//         return null
//     }

//     function onPlayerConnected(player: mp.Player) {
//         console.log('Another player connected! ' + player.index)
        
//         // Check to see if this player index is already initialized
//         if (!connectedPlayers[player.index]) {
//             // Place their sprite
//             const sprite = sprites.create(assets.image`boat_dl`)
//             sprite.x = (30 * player.index) + 40

//             // Assign controls to that sprite
//             const controller = getControllerFromIndex(player.index)
//             // controller.onButtonEvent(ControllerButton.Left, () => )

//             // Create their Player
//             const plr = new SubsPlayer(controller, sprite)

//             connectedPlayers[player.index] = {
//                 connected: true,
//                 controller: getControllerFromIndex(player.index),
//                 player: plr,
//                 boats: [sprite]
//             }
//             // mp.setPlayerSprite(player, sprite)
//         }
//         console.log('Players: ')
//     }

//     function onPlayerDisconnect(player: mp.Player) {
//         console.log('Player disconnected ' + player.index)
//     }

//     export function init() {
//         // mp.setPlayerState(mp.getPlayerByIndex(0), MultiplayerState.isReady, 0)
//         mp.onControllerEvent(ControllerEvent.Connected, onPlayerConnected)
//         mp.onControllerEvent(ControllerEvent.Disconnected, onPlayerDisconnect)
//     }

//     export function connect() {
//     }
// }
