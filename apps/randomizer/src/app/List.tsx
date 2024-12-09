import { useState } from 'react';
import { getRandomItem } from './random';

interface ListProps {
  items: any[];
  editable?: boolean;

  isEqual?: (a: any, b: any) => boolean;
  getId?: (item: any) => string;
  format?: (item: any) => JSX.Element;
  getRandomFor?: (item: any) => Promise<any>;
  formatRandom?: (item: any) => JSX.Element;

  onDelete?: (item: any) => void;
}

export const List = ({
  items,
  editable = false,
  isEqual = (a, b) => a === b,
  format = (x) => x,
  getRandomFor = async (x) => getRandomItem(x),
  formatRandom = (x) => x,
  getId = (x) => x,
  onDelete,
}: ListProps) => {
  const [randomItem, setRandomItem] = useState<any | null>(null);
  const [disabled, setDisabled] = useState<any[]>([]);

  const handleGetRandom = async () => {
    const enabledItems = items.filter((x) => !isDisabled(x));
    setRandomItem(await getRandomFor(enabledItems));
  };

  const isDisabled = (item: any) =>
    disabled.find((x) => isEqual(x, item)) != null;

  const toggleDisabled = (item: any) => {
    if (isDisabled(item)) {
      setDisabled(disabled.filter((x) => !isEqual(x, item)));
    } else {
      setDisabled([...disabled, item]);
    }
  };

  const toggleAll = () => {
    if (disabled.length === 0) {
      setDisabled(items);
    } else {
      setDisabled([]);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-start">
      <div className="flex gap-4 items-center">
        <input
          type="checkbox"
          checked={disabled.length === 0}
          onChange={() => toggleAll()}
        />
        <button
          className="bg-slate-100 hover:bg-slate-300 px-2 py-1"
          onClick={() => handleGetRandom()}
        >
          Random
        </button>
        {randomItem && formatRandom(randomItem)}
      </div>

      <div className="flex flex-col gap-2">
        {items.map((x) => (
          <div className="flex gap-2" key={getId(x)}>
            <input
              type="checkbox"
              checked={!isDisabled(x)}
              onChange={() => toggleDisabled(x)}
            />
            <span>{format(x)}</span>

            {editable && (
              <button
                className="font-bold"
                onClick={() => onDelete && onDelete(x)}
              >
                x
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
