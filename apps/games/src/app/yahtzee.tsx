import { useEffect, useState } from 'react';
import { GiInfo } from 'react-icons/gi';

const YAHTZEE_KEY = 'sakkaku-web-games-yahtzee';

interface Data {
  field: string;
  name: string;
  desc: string;
  score?: string;
  fixedScore?: number;
}

export function Yahtzee() {
  const rows = [
    {
      field: 'aces',
      name: 'Aces',
      desc: 'Any combination',
      score: 'Sum of dice with the number 1',
    },
    {
      field: 'twos',
      name: 'Twos',
      desc: 'Any combination',
      score: 'Sum of dice with the number 2',
    },
    {
      field: 'threes',
      name: 'Threes',
      desc: 'Any combination',
      score: 'Sum of dice with the number 3',
    },
    {
      field: 'fours',
      name: 'Fours',
      desc: 'Any combination',
      score: 'Sum of dice with the number 4',
    },
    {
      field: 'fives',
      name: 'Fives',
      desc: 'Any combination',
      score: 'Sum of dice with the number 5',
    },
    {
      field: 'sixes',
      name: 'Sixes',
      desc: 'Any combination',
      score: 'Sum of dice with the number 6',
    },

    {
      field: 'threeKind',
      name: 'Three of a kind',
      desc: 'At least three dice the same',
      score: 'Sum of all dice',
    },
    {
      field: 'fourKind',
      name: 'Four of a kind',
      desc: 'At least four dice the same',
      score: 'Sum of all dice',
    },
    {
      field: 'fullHouse',
      name: 'Full House',
      desc: 'Three of one number and two of another',
      fixedScore: 25,
    },
    {
      field: 'smallStraight',
      name: 'Small Straight',
      desc: 'Four sequential dice',
      fixedScore: 30,
    },
    {
      field: 'largeStraight',
      name: 'Large Straight',
      desc: 'Five sequential dice',
      fixedScore: 40,
    },
    {
      field: 'yahtzee',
      name: 'Yahtzee',
      desc: 'All five dice the same',
      fixedScore: 50,
    },
    {
      field: 'chance',
      name: 'Chance',
      desc: 'Any combination',
      score: 'Sum of all dice',
    },
  ];

  const [values, setValues] = useState({} as Record<string, number>);

  useEffect(() => {
    const data = localStorage.getItem(YAHTZEE_KEY);
    if (data) {
      const json = JSON.parse(data);
      setValues(json);
    }
  }, []);

  const onChange = (value: number, field: string) => {
    const updated = { ...values, [field]: value };
    setValues(updated);
    localStorage.setItem(YAHTZEE_KEY, JSON.stringify(updated));
  };

  const removeField = (field: string) => {
    const updated = { ...values };
    delete updated[field];
    setValues(updated);
    localStorage.setItem(YAHTZEE_KEY, JSON.stringify(updated));
  }

  const onCheckboxChange = (data: Data) => {
    if (values[data.field] === 0) {
      removeField(data.field);
      return;
    }
    
    if (values[data.field] > 0) {
      onChange(0, data.field);
      return;
    }

    onChange(data.fixedScore ?? 0, data.field);
  };

  const onReset = () => {
    setValues({});
    localStorage.removeItem(YAHTZEE_KEY);
  };

  console.log(values);
  return (
    <div className="flex flex-col gap-2 max-w-xl p-2">
      <button
        className="bg-slate-100 py-2 hover:bg-slate-300"
        onClick={() => onReset()}
      >
        Reset
      </button>
      <table>
        <tbody>
          {rows.map((r) => (
            <tr key={r.field}>
              <td>
                <div className="flex gap-2 items-center">
                  <GiInfo
                    title={`${r.desc}: ${r.score ?? r.fixedScore}`}
                  ></GiInfo>
                  {r.name}
                </div>
              </td>
              <td className="p-2 text-right">
                {(r.fixedScore && (
                  <div className="flex gap-4 justify-end">
                    <label htmlFor={r.field}>{r.fixedScore}</label>
                    <input
                      id={r.field}
                      type="checkbox"
                      ref={input => {
                        if (input) {
                          input.indeterminate = values[r.field] === 0;
                        }
                      }}
                      checked={values[r.field] > 0}
                      onChange={(e) => onCheckboxChange(r)}
                    />
                  </div>
                )) || (
                  <input
                    className="border py-1 px-2 text-right"
                    type="number"
                    value={values[r.field]}
                    onChange={(e) => onChange(e.target.valueAsNumber, r.field)}
                  />
                )}
              </td>
            </tr>
          ))}

          <tr className="font-bold">
            <td>Sum</td>
            <td className="text-right p-4">
              {Object.values(values)
                .filter((x) => !isNaN(x))
                .reduce((prev, curr) => prev + curr, 0)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
