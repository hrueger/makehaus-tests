import { hub, diagnostics, autoAnimate, Tile, TileEncoder12, TileEncoder8, TileFader4, TileLedButton12, TileLedButton8 } from "@makeproaudio/makehaus-js";

hub.init("192.168.178.85", 8192);

const colors = [
    "#ff0000", // red
    "#ffff00", // yellow
    "#00ff00", // green
    "#00ffff", // light blue
    "#0000ff", // dark blue
    "#ff00ff", // pink
    "#ffffff", // white
];

const tiles: (TileEncoder8 | TileEncoder12 | TileFader4 | TileLedButton12 | TileLedButton8)[] = [];
// diagnostics.start(hub);
let currentIdx = -1;

hub.on(Tile.ENCODER8, (tile: TileEncoder8) => {
    tiles.push(tile);
});
hub.on(Tile.ENCODER12, (tile: TileEncoder12) => {
    tiles.push(tile);
});
hub.on(Tile.MOTORFADER4, (tile: TileFader4) => {
    tiles.push(tile);
});
hub.on(Tile.LEDBUTTON8, (tile: TileLedButton12) => {
    tiles.push(tile);
    for (const w of tile.widgets) {
        w.on("pressed", () => {
            currentIdx++;
            for (const t of tiles.filter((tl) => [Tile.LEDBUTTON8, Tile.LEDBUTTON12].includes(tl.tileType())) as TileLedButton8[]) {
                for (const x of t.widgets) {
                    x.setColor(colors[currentIdx]);
                }
            }
        })
    }
});
hub.on(Tile.LEDBUTTON12, (tile: TileLedButton12) => {
    tiles.push(tile);
});

function t(): number {
    return 0.5 * (Math.sin(0.0005 * Date.now()) + 1)
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}