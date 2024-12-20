import { useState } from 'react';
import {
  AllTiles,
  MAX_HAND_TILE,
  YAKUS,
  YAKU_OTHERS,
  YAKU_PAIRS,
  YAKU_SEQUENCE,
  YAKU_SUITS,
  YAKU_TERMINAL_HONOR,
  YakuType,
  allTiles,
} from './richi-yaku';

function MahjongTile({
  tile,
  onClick,
  active,
}: Readonly<{
  active?: boolean;
  tile: AllTiles;
  onClick?: (tile: AllTiles) => void;
}>) {
  return (
    <button
      onClick={() => onClick?.(tile)}
      className={`text-5xl border border-transparent hover:border-black ${
        active ? '' : 'opacity-50'
      }`}
      dangerouslySetInnerHTML={{ __html: tile }}
    ></button>
  );
}

function YakuTileList({ yaku }: Readonly<{ yaku: YakuType }>) {
  const data = YAKUS[yaku]!;
  return (
    <div key={yaku} className="flex flex-col">
      <div className="flex gap-2 items-center">
        <div className="font-bold">{data.name}</div>
        <div className="text-sm text-gray-600">- {data.description}</div>
      </div>
      <div className={`text-5xl flex gap-2 p-2`}>
        {data.example.map((tile, i) => (
          <div key={i} dangerouslySetInnerHTML={{ __html: tile }} />
        ))}
      </div>
    </div>
  );
}

export function RichiMahjong() {
  const [tiles, setTiles] = useState([] as AllTiles[]);

  const toggleTile = (tile: AllTiles) => {
    if (tiles.includes(tile)) {
      setTiles(tiles.filter((t) => t !== tile));
    } else {
      if (tiles.length < MAX_HAND_TILE) {
        setTiles([...tiles, tile]);
      }
    }
  };

  return (
    <div className="p-2 h-full flex flex-col gap-4">
      <div className="grid grid-cols-9">
        {allTiles.map((tile) => (
          <MahjongTile
            key={tile}
            tile={tile}
            active={tiles.includes(tile)}
            onClick={(tile) => toggleTile(tile)}
          />
        ))}
      </div>

      <div className="flex flex-col gap-2">
        {YAKU_SEQUENCE.map((yaku) => (
          <YakuTileList key={yaku} yaku={yaku} />
        ))}
        {YAKU_TERMINAL_HONOR.map((yaku) => (
          <YakuTileList key={yaku} yaku={yaku} />
        ))}
        {YAKU_PAIRS.map((yaku) => (
          <YakuTileList key={yaku} yaku={yaku} />
        ))}
        {YAKU_SUITS.map((yaku) => (
          <YakuTileList key={yaku} yaku={yaku} />
        ))}
        {YAKU_OTHERS.map((yaku) => (
          <YakuTileList key={yaku} yaku={yaku} />
        ))}
      </div>
    </div>
  );
}
