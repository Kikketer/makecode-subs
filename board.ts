enum CursorDirection {
    Up,
    Down,
    Left,
    Right
}

namespace Board {
    const currentDepth = 1
    const perFloorLocations = [
        [{ x: 0, y: 0 }, { x: 15, y: 15 }]
    ]
    let cursorLocation: { x: number, y: number } = { 
        y: perFloorLocations[0][0].y * currentDepth, 
        x: perFloorLocations[0][0].x
    }

    export function moveCursor(direction: CursorDirection) {
        // Move cursor around the board, if it's over the top add the Depth
    }
}