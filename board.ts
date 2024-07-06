enum CursorDirection {
    Up,
    Down,
    Left,
    Right
}

namespace Board {
    const cursorSprite: Sprite = sprites.create(assets.image`boat_dl`)
    // How far to render the y distance given the depth
    const depthDistance = 30
    let currentDepth = 0
    const perFloorLocations = [
        [{ x: 21, y: 4 }, { x: 28, y: 4 }, { x: 35, y: 4 }, { x: 43, y: 4 }, { x: 50, y: 4 }, { x: 58, y: 4 }],
        [{ x: 18, y: 9 }, { x: 27, y: 9 }, { x: 35, y: 9 }, { x: 43, y: 9 }, { x: 52, y: 9 }, { x: 61, y: 9 }],
        [{ x: 14, y: 16 }, { x: 24, y: 16 }, { x: 35, y: 16 }, { x: 44, y: 16 }, { x: 54, y: 16 }, { x: 65, y: 16 }],
        [{ x: 10, y: 23 }, { x: 22, y: 23 }, { x: 34, y: 23 }, { x: 45, y: 23 }, { x: 56, y: 23 }, { x: 69, y: 23 }],
    ]
    let currentFloorCursorIndex: { row: number, col: number} = { row: 0, col: 0 }

    export function moveCursor(direction: CursorDirection) {
        // Move cursor around the board, if it's over the top add the Depth
        if (direction === CursorDirection.Right) {
            currentFloorCursorIndex.col += 1
            if (currentFloorCursorIndex.col > (perFloorLocations[0].length - 1)) {
                // Wrap around the right side to the left:
                currentFloorCursorIndex.col = 0
            }
        } else if (direction === CursorDirection.Left) {
            currentFloorCursorIndex.col -= 1
            if (currentFloorCursorIndex.col < 0) {
                currentFloorCursorIndex.col = perFloorLocations[0].length - 1
            }
        } else if (direction === CursorDirection.Up) {
            currentFloorCursorIndex.row -= 1
            // If we go off the top of the current floor
            if (currentFloorCursorIndex.row < 0) {
                currentDepth = currentDepth <= 0 ? currentDepth = 3 : currentDepth -= 1
                currentFloorCursorIndex.row = perFloorLocations.length - 1
            }
        } else if (direction === CursorDirection.Down) {
            currentFloorCursorIndex.row += 1
            // If we go off the bottom of the current floor
            if (currentFloorCursorIndex.row > perFloorLocations.length - 1) {
                currentDepth = currentDepth >= 3 ? currentDepth = 0 : currentDepth += 1
                currentFloorCursorIndex.row = 0
            }
        }

        render()
    }

    export function render() {
        cursorSprite.x = perFloorLocations[currentFloorCursorIndex.row][currentFloorCursorIndex.col].x
        cursorSprite.y = perFloorLocations[currentFloorCursorIndex.row][currentFloorCursorIndex.col].y + (currentDepth * depthDistance)
        animation.runImageAnimation(cursorSprite, assets.animation`cursor`, 500, true)
    }
}