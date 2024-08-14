import { useRef, useState, useEffect } from 'react';
import { Stage, useApp } from '@pixi/react';
import { Graphics, Sprite, Texture, Loader } from 'pixi.js';
import { useBattle } from '@/context/battleContext';
import styles from "./GameCanvas.module.css";
import axios from 'axios';
import MapMenu from '../Menus/MapMenu';
import { useMenu } from '@/context/menuContext';
import Pokemon from '../Menus/Pokedex/Pokemon';
import PokemonMenu from '../Menus/PokemonMenu';
import Pokedex from '../Menus/Pokedex';

class PlayerAnimation {
    constructor(graphics, textures) {
      this.graphics = graphics;
      this.textures =  textures;
        this.currentDirection = 'down'; // Default direction
        this.currentFrame = 0;
        this.isMoving = false;
        this.animationSpeed = 0.1;
        this.frameTimer = 0;
    }

    setDirection(direction) {
        if (this.currentDirection !== direction) {
            this.currentDirection = direction;
            this.currentFrame = 0; // Reset to first frame when changing direction
        }
    }

    start() {
        this.isMoving = true;
    }

    stop() {
        this.isMoving = false;
    }

    update(delta) {
        if (this.isMoving) {
            this.frameTimer += delta * this.animationSpeed;
            if (this.frameTimer >= 1) {
                this.currentFrame = (this.currentFrame + 1) % this.textures[this.currentDirection].length;
                this.frameTimer = 0;
            }
        }
        this.graphics.texture = this.textures[this.currentDirection][this.currentFrame];
    }
}
// Player Component
const Player = ({ position, setPosition, layout, grasses, tileSize, encounters, screen, setMenu, setPokemonId }) => {
    const app = useApp();
    const playerRef = useRef(null);
    const animationRef = useRef(null);
    const textures = {
        down: [Texture.from('/player/wd1.png'), Texture.from('/player/wd2.png'), Texture.from('/player/wd3.png'), Texture.from('/player/wd4.png')],
        up: [Texture.from('/player/wu1.png'), Texture.from('/player/wu2.png'), Texture.from('/player/wu3.png'), Texture.from('/player/wu4.png')],
        left: [Texture.from('/player/wl1.png'), Texture.from('/player/wl2.png'), Texture.from('/player/wl3.png'), Texture.from('/player/wl4.png')],
        right: [Texture.from('/player/wr1.png'), Texture.from('/player/wr2.png'), Texture.from('/player/wr3.png'), Texture.from('/player/wr4.png')]}

    useEffect(() => {
        const sprite = new Sprite(textures.down[0]);
        sprite.width = tileSize;
        sprite.height = tileSize;

        playerRef.current = sprite;
        app.stage.addChild(sprite);

        const playerAnimation = new PlayerAnimation(sprite, textures);
        animationRef.current = playerAnimation;

        app.ticker.add((delta) => {
            playerAnimation.update(delta);
        });

        return () => {
            if (playerRef.current && app.stage) {
                app.stage.removeChild(playerRef.current);
                app.ticker.remove(playerAnimation.update);
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
            return layout[gridY] && layout[gridY][gridX] === check;
        };

        const handleKeyDown = (e) => {
            if (screen === "map") {
                switch (e.key) {
                    case 'ArrowUp':
                        move(0, -1);
                        animationRef.current.setDirection('up');
                        animationRef.current.start();
                        break;
                    case 'ArrowDown':
                        move(0, 1);
                        animationRef.current.setDirection('down');
                        animationRef.current.start();
                        break;
                    case 'ArrowLeft':
                        move(-1, 0);
                        animationRef.current.setDirection('left');
                        animationRef.current.start();
                        break;
                    case 'ArrowRight':
                        move(1, 0);
                        animationRef.current.setDirection('right');
                        animationRef.current.start();
                        break;
                    case 'Escape':
                        setMenu(prev => setMenu(!prev));
                        setPokemonId(null);
                        break;
                    default:
                        break;
                }
            }
        };

        const handleKeyUp = () => {
            animationRef.current.stop();
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
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

    const [layout, setLayout] = useState([]);
    const [grasses, setGrasses] = useState({});
    const [layers, setLayers] = useState([]);
    const [mapWidth, setMapWidth] = useState(0);
    const [mapHeight, setMapHeight] = useState(0);
    const { encounters, screen, position, setPosition, tileSize, setTileSize } = useBattle();

    const [ menuVisible, setMenuVisible ] = useState(false);
    const { mapMenu, setMapMenu, pokemonId, setPokemonId } = useMenu();

    useEffect(() => {
        const fetchMapData = async () => {
            try {
                const response = await axios.get(`/maps/${mapName}.json`);
                const mapData = response.data;

                setTileSize(mapData.tileSize);
                setMapWidth(mapData.mapWidth);
                setMapHeight(mapData.mapHeight);
                setLayers(mapData.layers);

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
        <div className={styles.map_spacer}>
        
            <Stage width={tileSize*mapWidth} height={tileSize*mapHeight} options={{ backgroundColor: 0x000000 }}>
                {layout.length > 0 && encounters &&(
                    <>
                        <Map layers={layers} tileSize={tileSize} mapWidth={mapWidth} mapHeight={mapHeight} mapName={mapName} />
                        <Player position={position} setPosition={setPosition} setMenu={setMenuVisible} setPokemonId={setPokemonId} layout={layout} grasses={grasses} tileSize={tileSize} encounters={encounters} screen={screen}/>
                    </>
                )}
            </Stage>

            { menuVisible && <MapMenu onClick={(input) => setMapMenu(input)} /> }
            { (menuVisible && mapMenu === "pokedex" && !pokemonId) && <Pokedex /> }
            { (menuVisible && mapMenu === "pokedex" && pokemonId) && <Pokemon id={pokemonId} /> }
            { (menuVisible && mapMenu === "pokemon") && <PokemonMenu /> }

        </div>
    );
};

export default GameCanvas;

