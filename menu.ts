namespace Menu {
    const selections = [
        { text: 'Drop Charge', callback: () => {}, x: 95, y: 80 },
        { text: 'Move Boat', callback: () => {}, x: 95, y: 60 }
    ]

    let currentSelectionIndex: number = 0
    let menuSprite: Sprite
    let selectSprite: Sprite

    export function focus({ onMoveBoat, onDropCharge }: { onMoveBoat: () => void, onDropCharge: () => void }) {
        menuSprite = sprites.create(assets.image`Menu Background`)
        selectSprite = sprites.create(assets.image`empty`)

        selections[0].callback = onMoveBoat
        selections[1].callback = onDropCharge

        controller.down.addEventListener(ControllerButtonEvent.Pressed, onDown)
        controller.up.addEventListener(ControllerButtonEvent.Pressed, onUp)
        controller.A.addEventListener(ControllerButtonEvent.Pressed, onSelect)

        render()
    }

    export function blur() {
        controller.down.removeEventListener(ControllerButtonEvent.Pressed, onDown)
        controller.up.removeEventListener(ControllerButtonEvent.Pressed, onUp)
        controller.A.removeEventListener(ControllerButtonEvent.Pressed, onSelect)

        if (menuSprite) {
            menuSprite.destroy()
        }
        if (selectSprite) {
            selectSprite.destroy()
        }
    }

    function onDown() {
        currentSelectionIndex += 1
        if (currentSelectionIndex > selections.length - 1) {
            currentSelectionIndex = 0
        }

        render()
    }

    function onUp() {
        currentSelectionIndex -= 1
        if (currentSelectionIndex < 0) {
            currentSelectionIndex = selections.length - 1
        }

        render()
    }

    function onSelect() {
        selections[currentSelectionIndex].callback()
    }

    function render() {
        menuSprite.x = 121
        menuSprite.y = 75
        selectSprite.x = selections[currentSelectionIndex].x
        selectSprite.y = selections[currentSelectionIndex].y
        animation.runImageAnimation(selectSprite, assets.animation`Menu Arrow`, 300, true)
    }
}
