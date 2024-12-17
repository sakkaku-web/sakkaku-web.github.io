import { useEffect, useState } from 'react';
import { Button } from './button';

const CODENAMES_KEY = 'sakkaku-web-games-codenames';
const TEAM_BLUE = 'b';
const TEAM_RED = 'r';
const ASSASSIN = 'a';
const BYSTANDER = '';

const TEAM_BLUE_COLOR = 'bg-blue-400';
const TEAM_RED_COLOR = 'bg-red-400';
const ASSASSIN_COLOR = 'bg-black';
const BYSTANDER_COLOR = 'bg-gray-200';

const TEAM_NAMES: Record<string, string> = {
  [TEAM_BLUE]: 'Blue',
  [TEAM_RED]: 'Red',
  [ASSASSIN]: 'Assassin',
  [BYSTANDER]: 'Bystander',
};

export function CodeNames() {
  const [gridX, setGridX] = useState(4);
  const [gridY, setGridY] = useState(5);
  const [agentCount, setAgentCount] = useState(7);
  const [assassinCount, setAssassinCount] = useState(1);

  const [gameGrid, setGameGrid] = useState([] as string[][]);
  const [revealedGrid, setRevealedGrid] = useState([] as boolean[][]);

  const totalTiles = gridX * gridY;
  const byStanderCount = totalTiles - agentCount - agentCount - assassinCount;

  useEffect(() => {
    const data = localStorage.getItem(CODENAMES_KEY);
    if (data) {
      const json = JSON.parse(data);
      setGameGrid(json['grid']);
      setRevealedGrid(json['revealed']);
    }
  }, []);

  const resetGame = () => {
    setGameGrid([]);
    setRevealedGrid([]);
    localStorage.removeItem(CODENAMES_KEY);
  };

  const toggleTile = (x: number, y: number) => {
    const copy = [...revealedGrid];
    copy[y][x] = !copy[y][x];
    setRevealedGrid(copy);

    localStorage.setItem(
      CODENAMES_KEY,
      JSON.stringify({ grid: gameGrid, revealed: revealedGrid })
    );
  };

  const shuffle = (array: any[]) => {
    let currentIndex = array.length;
    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
  };

  const createGame = () => {
    const tiles = new Array(agentCount)
      .fill(TEAM_BLUE)
      .concat(new Array(agentCount + 1).fill(TEAM_RED)) // red starts with one more
      .concat(new Array(assassinCount).fill(ASSASSIN))
      .concat(new Array(byStanderCount).fill(BYSTANDER));

    shuffle(tiles);

    const grid: string[][] = [];
    const revealed: boolean[][] = [];

    for (let y = 0; y < gridY; y++) {
      for (let x = 0; x < gridX; x++) {
        if (grid[y] === undefined) {
          grid[y] = new Array(gridX).fill(BYSTANDER);
        }

        if (revealed[y] === undefined) {
          revealed[y] = new Array(gridX).fill(false);
        }

        grid[y][x] = tiles.shift() ?? BYSTANDER;
      }
    }

    setGameGrid(grid);
    setRevealedGrid(revealed);
    localStorage.setItem(CODENAMES_KEY, JSON.stringify({ grid, revealed }));
  };

  const getTeamPoints = () => {
    const score: Record<string, [number, number]> = {};
    for (let y = 0; y < gameGrid.length; y++) {
      for (let x = 0; x < gameGrid[y].length; x++) {
        const key = gameGrid[y][x];
        if (!score[key]) {
          score[key] = [0, 0];
        }

        score[key][0] += 1;

        if (revealedGrid[y][x]) {
          score[key][1] += 1;
        }
      }
    }

    return score;
  };

  const tileColorClass = (tile: string) => {
    switch (tile) {
      case TEAM_BLUE:
        return TEAM_BLUE_COLOR;
      case TEAM_RED:
        return TEAM_RED_COLOR;
      case ASSASSIN:
        return ASSASSIN_COLOR;
      default:
        return BYSTANDER_COLOR;
    }
  };

  const hasActiveGame = gameGrid.length > 0;
  const points = getTeamPoints();

  return (
    <div className="p-2 h-full">
      {(!hasActiveGame && (
        <div className="flex flex-col gap-2 p-2">
          <div className="flex gap-2">
            <label htmlFor="gridX">Grid Size</label>
            <input
              id="gridX"
              className="px-2 py border w-16"
              placeholder="Grid Column"
              type="number"
              min={1}
              onChange={(e) => setGridX(e.target.valueAsNumber)}
              value={gridX}
            />
            <span>x</span>
            <input
              id="gridY"
              className="px-2 py border w-16"
              placeholder="Grid Rows"
              type="number"
              min={1}
              onChange={(e) => setGridY(e.target.valueAsNumber)}
              value={gridY}
            />
          </div>
          <div className="flex gap-2">
            <label htmlFor="agents">Agents per team</label>
            <input
              id="agents"
              className="px-2 py border w-16"
              type="number"
              min={1}
              onChange={(e) => setAgentCount(e.target.valueAsNumber)}
              value={agentCount}
            />
          </div>
          <div className="flex gap-2">
            <label htmlFor="assassins">Assassins</label>
            <input
              id="assassins"
              className="px-2 py border w-16"
              type="number"
              min={1}
              onChange={(e) => setAssassinCount(e.target.valueAsNumber)}
              value={assassinCount}
            />
          </div>
          <div className={byStanderCount < 0 ? 'text-red-600' : ''}>
            Bystanders: {byStanderCount}
          </div>
          <Button onClick={() => createGame()}>Create Game</Button>
        </div>
      )) || (
        <div className="h-full flex flex-col">
          <Button onClick={() => resetGame()}>Reset Game</Button>
          <div
            className={`grow grid`}
            style={{
              gridTemplateColumns: `repeat(${gridX}, minmax(0, 1fr))`,
            }}
          >
            {gameGrid.map((row, y) =>
              row.map((tile, x) => (
                <div key={`${x}-${y}`} className={`flex p-2 md:p-8`}>
                  <button
                    onClick={() => toggleTile(x, y)}
                    className={`${tileColorClass(tile)} grow border-black ${
                      (revealedGrid[y][x] && 'border') || 'opacity-50'
                    }`}
                  ></button>
                </div>
              ))
            )}
          </div>
          <div className="flex justify-between">
            {[TEAM_BLUE, TEAM_RED, BYSTANDER].map((team) => (
              <div
                key={team}
                className={`flex gap-2 ${
                  points[team][0] === points[team][1]
                    ? 'text-green-600'
                    : ''
                } `}
              >
                <span className="font-bold">{TEAM_NAMES[team]}:</span>
                <span>
                  {points[team]?.[1] ?? 0} / {points[team]?.[0] ?? 0}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
