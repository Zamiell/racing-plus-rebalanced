/** @noSelf */
declare function AStar(tiledMapHandler: TiledMapHandler): AStar;

declare class AStar {
  findPath(coords1: { x: int; y: int }, coords2: { x: int; y: int }): Path;
}

declare interface Path {
  getNodes(): Node[];
}

declare interface Node {
  location: {
    x: int;
    y: int;
  };
}
