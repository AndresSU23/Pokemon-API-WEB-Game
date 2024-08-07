import { useRef, useState, useEffect } from 'react';
import { Stage, useApp } from '@pixi/react';
import { Graphics, Sprite, Texture } from 'pixi.js';
import { useBattle } from '@/context/battleContext';
import axios from 'axios';

// Player Component
const Player = ({ position, setPosition, layout, grasses, tileSize, encounters, menu }) => {
    const app = useApp();
    
    
    const playerRef = useRef(null);

    useEffect(() => {
        const graphics = new Graphics();
        graphics.beginFill(0x581845);
        graphics.drawRect(0, 0, tileSize, tileSize);
        graphics.endFill();

        playerRef.current = graphics;
        app.stage.addChild(graphics);

        return () => {
            if (playerRef.current && app.stage) {
                app.stage.removeChild(playerRef.current);
            }
        };
    }, [app]);

    useEffect(() => {
        if (playerRef.current) {
            playerRef.current.x = position.x;
            playerRef.current.y = position.y;
        }
    }, [position]);

    useEffect(() => {
        const move = (dx, dy) => {
            const newX = position.x + dx * tileSize;
            const newY = position.y + dy * tileSize;

            // Check for collision with walls
            const newGridX = Math.floor(newX / tileSize);
            const newGridY = Math.floor(newY / tileSize);

            const wallCollision = checkCollision(newGridX, newGridY, 1);
            const grassEvent = checkCollision(newGridX, newGridY, 2);
            
            if (!wallCollision) {
                setPosition({ x: newX, y: newY });
            } else console.log('Blocked');
            if (grassEvent) {
                encounters[grasses[`${newGridX},${newGridY}`]].triggerEvent();
            }
        };

        const checkCollision = (gridX, gridY, check) => {
            if (layout[gridY][gridX] === check) return true;
            return false;
        };

        const handleKeyDown = (e) => {
            if (menu === "map")
            {switch (e.key) {
                case 'ArrowUp':
                    move(0, -1);
                    break;
                case 'ArrowDown':
                    move(0, 1);
                    break;
                case 'ArrowLeft':
                    move(-1, 0);
                    break;
                case 'ArrowRight':
                    move(1, 0);
                    break;
                default:
                    break;
            }}
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [position, layout, grasses, setPosition]);

    return null;
};

// Tile Component
const Tile = ({ x, y, width, height, image, tileSize }) => {
    const app = useApp();

    useEffect(() => {
        const texture = Texture.from(image);
        const sprite = new Sprite(texture);
        sprite.width = width * tileSize;
        sprite.height = height * tileSize;
        sprite.x = x * tileSize;
        sprite.y = y * tileSize;
        app.stage.addChild(sprite);

        return () => {
            if (app.stage) app.stage.removeChild(sprite);
        };
    }, [app, x, y, width, height, image]);

    return null;
};

// Map Component
const Map = ({ layers, tileSize, mapName }) => {
    const tiles = [];

    layers.forEach(layer => {
        layer.tiles.forEach(tile => {
            const posX = parseInt(tile.x, 10);
            const posY = parseInt(tile.y, 10);
            const image = `/tileSets/${mapName}/tiles/tile${tile.id.toString().padStart(3, '0')}.png`;
            tiles.push({ x: posX, y: posY, width: 1, height: 1, image, tileSize });
        });
    });

    return (
        <>
            {tiles.map((tile, index) => (
                <Tile key={index} {...tile} />
            ))}
        </>
    );
};

// GameCanvas Component
const GameCanvas = ({ mapName = "map1_TheIsland" }) => {
    const [position, setPosition] = useState({ x: 1, y: 1 });
    const [layout, setLayout] = useState([]);
    const [grasses, setGrasses] = useState({});
    const [layers, setLayers] = useState([]);
    const [tileSize, setTileSize] = useState(16);
    const [mapWidth, setMapWidth] = useState(0);
    const [mapHeight, setMapHeight] = useState(0);
    const { encounters, menu } = useBattle();

    useEffect(() => {
        const fetchMapData = async () => {
            try {
                const response = await axios.get(`/maps/${mapName}.json`);
                const mapData = response.data;

                setTileSize(mapData.tileSize);
                setMapWidth(mapData.mapWidth);
                setMapHeight(mapData.mapHeight);
                setLayers(mapData.layers);
                setPosition({ x: 20*tileSize, y: 20*tileSize })

                let newLayout = Array.from({ length: mapData.mapHeight }, () => Array(mapData.mapWidth).fill(-1));
                let newGrasses = {};

                mapData.layers.reverse().forEach(layer => {
                    const code = layer.name.split('_');
                    layer.tiles.forEach(tile => {
                        const posX = parseInt(tile.x, 10);
                        const posY = parseInt(tile.y, 10);
                        if (code[0] === 'e') {
                            newLayout[posY][posX] = 2;
                            if (code[1] === 'g') newGrasses[`${posX},${posY}`] = code[2];
                        }
                        else if (code[0] === 'c') newLayout[posY][posX] = 1;
                        else if (code[0] === 'p') newLayout[posY][posX] = 0;

                        if (code[0] === 'o'){
                            if (code[0] === 'p') newLayout[posY][posX] = 0;
                            if (code[0] === 'c') newLayout[posY][posX] = 1;
                            if (code[0] === 'e') newLayout[posY][posX] = 2;
                        }
                    });
                });

                newLayout = newLayout.map(row => row.map(cell => (cell === -1 ? 0 : cell)));

                setLayout(newLayout);
                setGrasses(newGrasses);
            } catch (error) {
                console.error('Failed to fetch map data:', error);
            }
        };

        fetchMapData();
    }, [mapName]);

    return (
        
            <Stage width={tileSize*mapWidth} height={tileSize*mapHeight} options={{ backgroundColor: 0x000000 }}>
                {layout.length > 0 && (
                    <>
                        <Map layers={layers} tileSize={tileSize} mapWidth={mapWidth} mapHeight={mapHeight} mapName={mapName} />
                        <Player position={position} setPosition={setPosition} layout={layout} grasses={grasses} tileSize={tileSize} encounters={encounters} menu={menu}/>
                    </>
                )}
            </Stage>
    );
};

export default GameCanvas;

