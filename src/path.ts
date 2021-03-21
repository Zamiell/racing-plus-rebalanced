import g from "./globals";
import "./lib/astar"; // eslint-disable-line import/extensions
import "./lib/tiledmaphandler"; // eslint-disable-line import/extensions

enum GridValue {
  ROOM = 0,
  NULL = 1,
}

export function findMidBoss(percent: int): int {
  // Local variables
  const startingRoomIndex = g.l.GetStartingRoomIndex();
  const rooms = g.l.GetRooms();

  // Initialize an empty 13x13 grid
  const grid: GridValue[][] = [];
  for (let i = 0; i < 13; i++) {
    const row = [];
    for (let j = 0; j < 13; j++) {
      row.push(GridValue.NULL);
    }
    grid.push(row);
  }

  // Make an entry for each room on the floor
  // (to both the grid and the roomData)
  let bossRoomIndex: int | undefined;
  for (let i = 0; i < rooms.Size; i++) {
    // This is 0 indexed
    const roomDesc = rooms.Get(i);
    if (roomDesc === null) {
      continue;
    }
    const roomIndexSafe = roomDesc.SafeGridIndex; // This is always the top-left index
    const roomData = roomDesc.Data;
    const roomType = roomData.Type;
    const roomShape = roomData.Shape;

    // Record the boss index
    if (roomType === RoomType.ROOM_BOSS) {
      bossRoomIndex = roomIndexSafe;
    }

    // There will never be a special room in the path to the boss, so we can ignore special rooms
    // Furthermore, we do not want to account for the Secret Room (e.g. moon strats)
    if (roomType === RoomType.ROOM_DEFAULT || roomType === RoomType.ROOM_BOSS) {
      // Fill in the grid
      const { x, y } = getCoordsFromGridIndex(roomIndexSafe);
      grid[y][x] = GridValue.ROOM;

      if (
        roomShape === RoomShape.ROOMSHAPE_1x2 || // 1 wide x 2 tall
        roomShape === RoomShape.ROOMSHAPE_IIV // 1 wide x 2 tall, narrow
      ) {
        grid[y + 1][x] = GridValue.ROOM; // The square below
      } else if (
        roomShape === RoomShape.ROOMSHAPE_2x1 || // 2 wide x 1 tall
        roomShape === RoomShape.ROOMSHAPE_IIH // 2 wide x 1 tall, narrow
      ) {
        grid[y][x + 1] = GridValue.ROOM; // The square to the right
      } else if (roomShape === RoomShape.ROOMSHAPE_2x2) {
        // 2 wide x 2 tall
        grid[y][x + 1] = GridValue.ROOM; // The square to the right
        grid[y + 1][x] = GridValue.ROOM; // The square below
        grid[y + 1][x + 1] = GridValue.ROOM; // The square to the bottom-right
      } else if (roomShape === RoomShape.ROOMSHAPE_LTL) {
        // L room, top-left is missing
        grid[y + 1][x] = GridValue.ROOM; // The square below
        grid[y + 1][x - 1] = GridValue.ROOM; // The square to the bottom-left
      } else if (roomShape === RoomShape.ROOMSHAPE_LTR) {
        // L room, top-right is missing
        grid[y + 1][x] = GridValue.ROOM; // The square below
        grid[y + 1][x + 1] = GridValue.ROOM; // The square to the bottom-right
      } else if (roomShape === RoomShape.ROOMSHAPE_LBL) {
        // L room, bottom-left is missing
        grid[y][x + 1] = GridValue.ROOM; // The square to the right
        grid[y + 1][x + 1] = GridValue.ROOM; // The square to the bottom-right
      } else if (roomShape === RoomShape.ROOMSHAPE_LBR) {
        // L room, bottom-right is missing
        grid[y][x + 1] = GridValue.ROOM; // The square to the right
        grid[y + 1][x] = GridValue.ROOM; // The square below
      }

      Isaac.DebugString(`Plotted room ${i}:`);
      Isaac.DebugString(`  ID: ${roomData.Variant}`);
      Isaac.DebugString(`  Index: ${roomIndexSafe}`);
      Isaac.DebugString(`  Coordinates: (${x}, ${y})`);
      Isaac.DebugString(`  Shape: ${roomShape}`);
    }
  }

  // Get the coordinates for the two most important rooms
  const startingRoomCoords = getCoordsFromGridIndex(startingRoomIndex);
  if (bossRoomIndex === undefined) {
    error("Failed to find the boss room when iterating through the rooms.");
  }
  const bossRoomCoords = getCoordsFromGridIndex(bossRoomIndex);

  // Print out a graphic representing the grid
  Isaac.DebugString("Grid:");
  Isaac.DebugString("     1  2  3  4  5  6  7  8  9  10 11 12 13 14 15 16");
  for (let i = 0; i < grid.length; i++) {
    let rowString = `  ${i} `;
    if (i < 10) {
      rowString += " ";
    }
    for (let j = 0; j < grid[i].length; j++) {
      const gridValue = grid[i][j];
      if (gridValue === GridValue.NULL) {
        rowString += "  ";
      } else if (gridValue === GridValue.ROOM) {
        rowString += gridValue;
        if (i === startingRoomCoords.y && j === startingRoomCoords.x) {
          rowString += "S";
        } else if (i === bossRoomCoords.y && j === bossRoomCoords.x) {
          rowString += "B";
        }
      }
      rowString += " ";
    }
    Isaac.DebugString(rowString);
  }

  // We have created a grid, so now we feed it to the AStar algorithm
  const maphandler = TiledMapHandler(grid);
  const astar = AStar(maphandler);

  startingRoomCoords.x += 1;
  startingRoomCoords.y += 1;
  bossRoomCoords.x += 1;
  bossRoomCoords.y += 1;

  Isaac.ConsoleOutput(
    `STARTING ROOM COORDS: (${startingRoomCoords.x}, ${startingRoomCoords.y})`,
  );
  Isaac.ConsoleOutput(
    `BOSS ROOM COORDS: (${bossRoomCoords.x}, ${bossRoomCoords.y})`,
  );
  const path = astar.findPath(startingRoomCoords, bossRoomCoords);
  const nodes = path.getNodes();

  Isaac.DebugString("Path:");
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    const loc = node.location;
    Isaac.DebugString(`${i}.  (${loc.x}, ${loc.y})`);
  }

  // Get the node X% of the way towards the boss
  let nodeIndex = math.floor(nodes.length * percent);
  // Subtract one from the index to account for the the fact that the nodes table is generated by
  // Lua code, and is therefore 1-indexed instead of 0-indexed
  nodeIndex -= 1;
  const inBetweenNodeCoords = nodes[nodeIndex].location;
  return getGridIndexFromXY(inBetweenNodeCoords);
}

// Get the grid coordinates on a 13x13 grid
// 0 --> (0, 0)
// 1 --> (1, 0)
// 13 --> (0, 1)
// 14 --> (1, 1)
// etc.
function getCoordsFromGridIndex(gridIndex: int): { x: int; y: int } {
  const y = math.floor(gridIndex / 13);
  const x = gridIndex - y * 13;

  return { x, y };
}

function getGridIndexFromXY(coords: { x: int; y: int }): int {
  const x = coords.x - 1;
  const y = coords.y - 1;
  return y * 13 + x;
}
