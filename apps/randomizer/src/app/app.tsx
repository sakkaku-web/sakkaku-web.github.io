import React, { useEffect, useState } from 'react';
import { ListHandler, RandomList } from './RandomList';
import { BiEdit, BiInfoCircle } from 'react-icons/bi';
import { grouperListHandler } from './handler/grouper';

const LISTS_ID_KEY = 'randomizerListIds';
const ANIME_CHAR_KEY = 'Anime';
const GROUPER_KEY = 'Grouper';

const HANDLER: Record<string, ListHandler<any>> = {
  // [ANIME_CHAR_KEY]: animeListHandler,
  [GROUPER_KEY]: grouperListHandler,
};

function App() {
  const [lists, setLists] = useState<string[]>([]);
  const [newList, setNewList] = useState<string>('');
  const [editable, setEditable] = useState<boolean>(false);

  const [isCoinHead, setIsCoinHead] = useState<boolean | null>(null);
  const [diceResult, setDiceResult] = useState<number | null>(null);
  const [diceNumber, setDiceNumber] = useState<number>(6);

  useEffect(() => {
    const storedLists = localStorage.getItem(LISTS_ID_KEY);
    if (storedLists) {
      setLists(JSON.parse(storedLists));
    }
  }, []);

  const updateLists = (newLists: string[]) => {
    setLists(newLists);
    localStorage.setItem(LISTS_ID_KEY, JSON.stringify(newLists));
  };

  const handleAddList = async (e: React.KeyboardEvent) => {
    if (e.key !== 'Enter') return;
    if (!newList) return;

    updateLists([...lists, newList]);
    setNewList('');
  };

  const handleDeleteList = (list: string) => {
    updateLists(lists.filter((l) => l !== list));
  };

  const handleMoveList = (list: string, direction: 'left' | 'right') => {
    const index = lists.indexOf(list);
    if (index === -1) return;
    lists.splice(index, 1);
    if (direction === 'left') {
      lists.splice(index - 1, 0, list);
    } else {
      lists.splice(index + 1, 0, list);
    }
    updateLists([...lists]);
  };

  const randomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="flex gap-8 flex-wrap">
        <div className="flex gap-4 items-center">
          <input
            className="border px-2 py-1"
            type="text"
            placeholder="New List"
            value={newList}
            onKeyUp={handleAddList}
            onChange={(e) => setNewList(e.target.value)}
          />

          <button
            onClick={() => setEditable(!editable)}
            className={'p-2 ' + (editable ? 'text-red-500' : '')}
          >
            <BiEdit />
          </button>

          <BiInfoCircle title="Predefined lists&#013;&#013; Anime - random anime character, using anime ids from animecharactersdatabase.com&#013;&#013; Grouper - group items in pairs" />
        </div>

        <div className="flex gap-4 items-center">
          <button
            className="bg-slate-100 hover:bg-slate-300 px-2 py-1"
            onClick={() => setIsCoinHead(Math.random() <= 0.5)}
          >
            Flip Coin
          </button>
          {isCoinHead !== null && <div>{isCoinHead ? 'Head' : 'Tail'}</div>}
        </div>
        <div className="flex gap-4 items-center">
          <button
            className="bg-slate-100 hover:bg-slate-300 px-2 py-1"
            onClick={() => setDiceResult(randomInt(1, diceNumber))}
          >
            Throw d{diceNumber}
          </button>
          <input
            type="number"
            value={diceNumber}
            className="border px-2 py-1 w-16"
            min={1}
            onChange={(e) => setDiceNumber(e.target.valueAsNumber)}
          />
          {diceResult !== null && <div>{diceResult}</div>}
        </div>
      </div>

      <div className="flex gap-4 flex-wrap">
        {lists.map((list) => (
          <RandomList
            key={list}
            editable={editable}
            name={list}
            handler={HANDLER[list]}
            onDelete={() => handleDeleteList(list)}
            onMoveLeft={() => handleMoveList(list, 'left')}
            onMoveRight={() => handleMoveList(list, 'right')}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
