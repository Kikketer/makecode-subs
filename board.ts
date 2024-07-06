enum CursorDirection {
    Up,
    Down,
    Left,
    Right
}

enum SelectionMode {
    // You can only select their subs, underwater
    TheirSubs,
    // You can only select your underwater, but anywhere
    YourSubs,
    // You can only select the top water
    Boats,
    // You can only select underwater in a given Z axis
    DepthCharge
}

type SelectCallbackProps = { row: number, col: number, depth: number }

namespace Board {
    let cursorSprite: Sprite
    let selectionMode: SelectionMode
    let onSelCallback: (T: SelectCallbackProps) => void
    // Used to move the cursor to the right side vs left side
    let leftDistance = 0
    // How far to render the y distance given the depth
    const depthDistance = 30
    // Max and min depth of selections
    let minDepth = 1
    let maxDepth = 3
    let currentDepth = minDepth
    const perFloorLocations = [
        [{ x: 21, y: 4 }, { x: 28, y: 4 }, { x: 35, y: 4 }, { x: 43, y: 4 }, { x: 50, y: 4 }, { x: 58, y: 4 }],
        [{ x: 18, y: 9 }, { x: 27, y: 9 }, { x: 35, y: 9 }, { x: 43, y: 9 }, { x: 52, y: 9 }, { x: 61, y: 9 }],
        [{ x: 14, y: 16 }, { x: 24, y: 16 }, { x: 35, y: 16 }, { x: 44, y: 16 }, { x: 54, y: 16 }, { x: 65, y: 16 }],
        [{ x: 10, y: 23 }, { x: 22, y: 23 }, { x: 34, y: 23 }, { x: 45, y: 23 }, { x: 56, y: 23 }, { x: 69, y: 23 }],
    ]
    let currentFloorCursorIndex: { row: number, col: number} = { row: 0, col: 0 }

    export function focus({ onSelectCallback, mode, row, col }: { 
            mode: SelectionMode,
            onSelectCallback: (T: SelectCallbackProps) => void,
            // These are required if you do DepthCharge mode
            row?: number,
            col?: number
        }) {

        onSelCallback = onSelectCallback
        selectionMode = mode
        cursorSprite = sprites.create(assets.image`empty`)

        // Set the starting location
        if (row != null && col != null) {
            currentFloorCursorIndex = { row, col }
        }
        if (mode === SelectionMode.YourSubs) {
            // if we are selecting our own subs, we are on the right side
            leftDistance = 80
            minDepth = 1
            maxDepth = 3
        } else if (mode === SelectionMode.TheirSubs) {
            leftDistance = 0
            minDepth = 1
            maxDepth = 3
            // TODO remove the movement and just do depth
        } else if (mode === SelectionMode.Boats) {
            leftDistance = 0
            minDepth = 0
            maxDepth = 0
        }
        currentDepth = minDepth

        controller.left.addEventListener(ControllerButtonEvent.Pressed, moveLeft)
        controller.right.addEventListener(ControllerButtonEvent.Pressed, moveRight)
        controller.up.addEventListener(ControllerButtonEvent.Pressed, moveUp)
        controller.down.addEventListener(ControllerButtonEvent.Pressed, moveDown)
        controller.A.addEventListener(ControllerButtonEvent.Pressed, selectLocation)

        render()
    }

    export function blur() {
        controller.left.removeEventListener(ControllerButtonEvent.Pressed, moveLeft)
        controller.right.removeEventListener(ControllerButtonEvent.Pressed, moveRight)
        controller.up.removeEventListener(ControllerButtonEvent.Pressed, moveUp)
        controller.down.removeEventListener(ControllerButtonEvent.Pressed, moveDown)
        controller.A.removeEventListener(ControllerButtonEvent.Pressed, selectLocation)

        // Other cleanup
        cursorSprite.destroy()
        onSelCallback = () => {}
    }

    function selectLocation() {
        if (onSelCallback) {
            onSelCallback({ row: currentFloorCursorIndex.row, col: currentFloorCursorIndex.col, depth: currentDepth })
        }
    }

    function moveLeft() { return moveCursor(CursorDirection.Left) }
    function moveRight() { return moveCursor(CursorDirection.Right) }
    function moveUp() { return moveCursor(CursorDirection.Up) }
    function moveDown() { return moveCursor(CursorDirection.Down) }

    function moveCursor(direction: CursorDirection) {
        // Move cursor around the board, if it's over the top add the Depth
        if (direction === CursorDirection.Right && selectionMode !== SelectionMode.TheirSubs) {
            currentFloorCursorIndex.col += 1
            if (currentFloorCursorIndex.col > (perFloorLocations[0].length - 1)) {
                // Wrap around the right side to the left:
                currentFloorCursorIndex.col = 0
            }
        } else if (direction === CursorDirection.Left && selectionMode !== SelectionMode.TheirSubs) {
            currentFloorCursorIndex.col -= 1
            if (currentFloorCursorIndex.col < 0) {
                currentFloorCursorIndex.col = perFloorLocations[0].length - 1
            }
        } else if (direction === CursorDirection.Up) {
            // if we restrict to their subs, we can only adjust Depth
            if (selectionMode === SelectionMode.TheirSubs) {
                currentDepth = currentDepth <= minDepth ? currentDepth = maxDepth : currentDepth -= 1
            } else {
                currentFloorCursorIndex.row -= 1
                // If we go off the top of the current floor
                if (currentFloorCursorIndex.row < 0) {
                    currentDepth = currentDepth <= minDepth ? currentDepth = maxDepth : currentDepth -= 1
                    currentFloorCursorIndex.row = perFloorLocations.length - 1
                }
            }
        } else if (direction === CursorDirection.Down) {
            // We can only adjust depth if we are selecting their subs
            if (selectionMode === SelectionMode.TheirSubs) {
                currentDepth = currentDepth >= maxDepth ? currentDepth = minDepth : currentDepth += 1
            } else {
                currentFloorCursorIndex.row += 1
                // If we go off the bottom of the current floor
                if (currentFloorCursorIndex.row > perFloorLocations.length - 1) {
                    currentDepth = currentDepth >= maxDepth ? currentDepth = minDepth : currentDepth += 1
                    currentFloorCursorIndex.row = 0
                }
            }
        }

        render()
    }

    export function render() {
        cursorSprite.x = perFloorLocations[currentFloorCursorIndex.row][currentFloorCursorIndex.col].x + leftDistance
        cursorSprite.y = perFloorLocations[currentFloorCursorIndex.row][currentFloorCursorIndex.col].y + (currentDepth * depthDistance)
        animation.runImageAnimation(cursorSprite, assets.animation`cursor`, 500, true)
    }
}