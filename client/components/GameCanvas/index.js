import { useRef, useState, useEffect } from 'react';
import { Stage, useApp } from '@pixi/react';
import { Graphics } from 'pixi.js';
import BattleEvent from '@/classes/BattleEvent';

const UNIT_SIZE = 50; // Define the global unit size in pixels

// Player Component
const Player = ({ position, setPosition, layout, grasses }) => {
    const app = useApp();
    const playerRef = useRef(null);

    useEffect(() => {
        const graphics = new Graphics();
        graphics.beginFill(0x66ccff);
        graphics.drawRect(0, 0, UNIT_SIZE, UNIT_SIZE);
        graphics.endFill();

        playerRef.current = graphics;
        app.stage.addChild(graphics);

        return () => {
            if (playerRef.current) {
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
            const newX = position.x + dx * UNIT_SIZE;
            const newY = position.y + dy * UNIT_SIZE;

            // Check for collision with walls
            const newGridX = Math.floor(newX / UNIT_SIZE);
            const newGridY = Math.floor(newY / UNIT_SIZE);

            const wallCollision = checkCollision(newGridX, newGridY, 1);
            const grassEvent = checkCollision(newGridX, newGridY, 2);

            if (!wallCollision ) {
                setPosition({ x: newX, y: newY });
            }
            else console.log('Blocked');
            if (grassEvent) {
                grasses[`${newGridX},${newGridY}`].triggerEvent();
            }

        };

        const checkCollision = (gridX, gridY, check) => {
            if (layout[gridY][gridX] === check) return true;
            return false;
        };

        const handleKeyDown = (e) => {
            switch (e.key) {
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
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [position, layout, grasses, setPosition]);

    return null;
};

// Tile Component
const Tile = ({x, y, width, height, color}) => {
    const app = useApp();

    useEffect(() => {
        const graphics = new Graphics();
        graphics.beginFill(color);
        graphics.drawRect(0, 0, width * UNIT_SIZE, height * UNIT_SIZE);
        graphics.endFill();
        graphics.x = x * UNIT_SIZE;
        graphics.y = y * UNIT_SIZE;

        app.stage.addChild(graphics);

        return () => {
            app.stage.removeChild(graphics);
        };
    }, [app, x, y, width, height, color]);

    return null;
}

// Map Component
const Map = ({ layout }) => {
    const tiles = [];

    layout.forEach((row, y) => {
        row.forEach((cell, x) => {
            if (cell === 1) tiles.push({ x, y, width: 1, height: 1, color: 0xff3300 });
            if (cell === 2) tiles.push({ x, y, width: 1, height: 1, color: 0x00ff00 });
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
const GameCanvas = () => {
    const [position, setPosition] = useState({ x: 1 * UNIT_SIZE, y: 1 * UNIT_SIZE });

    const layout = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 2, 2, 1],
        [1, 1, 1, 1, 0, 0, 0, 1],
        [1, 0, 2, 1, 0, 1, 0, 1],
        [1, 0, 2, 2, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 1, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    const normalGrass = new BattleEvent([{probability: 40, encounterId: 100},
                                        {probability: 5, encounterId: 999},
                                        {probability: 20, encounterId: -100}
    ])
    const grasses = {};

    for (let y = 0; y < layout.length; y++) {
        for (let x = 0; x < layout[y].length; x++) {
            if (layout[y][x] === 2) {
                grasses[`${x},${y}`] = normalGrass;
            }
        }
    }

    return (
        <Stage width={800} height={600} options={{ backgroundColor: 0x000000 }}>
            <Map layout={layout} />
            <Player position={position} setPosition={setPosition} layout={layout} grasses={grasses} />
        </Stage>
    );
};

export default GameCanvas;