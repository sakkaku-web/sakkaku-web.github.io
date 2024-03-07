import { useEffect, useState } from 'react';

const TABOO_KEY = 'sakkaku-web-games-taboo';

export function Taboo() {
  const [newTeam, setNewTeam] = useState('');
  const [teams, setTeams] = useState([] as string[]);
  const [points, setPoints] = useState({} as Record<string, number>);

  useEffect(() => {
    const data = localStorage.getItem(TABOO_KEY);
    if (data) {
      const json = JSON.parse(data);
      setTeams(json['teams']);
      setPoints(json['points']);
    }
  }, []);

  const addTeam = () => {
    const name = newTeam.trim();
    if (teams.includes(name)) {
      return;
    }

    const updatedTeams = [...teams, name];
    setTeams(updatedTeams);
    setNewTeam('');
    localStorage.setItem(
      TABOO_KEY,
      JSON.stringify({ teams: updatedTeams, points })
    );
  };

  const resetTeams = () => {
    setTeams([]);
    setPoints({});
    localStorage.removeItem(TABOO_KEY);
  };

  const resetPoints = () => {
    setPoints({});
    localStorage.setItem(TABOO_KEY, JSON.stringify({ teams, points: {} }));
  };

  const changeTeamPoints = (team: string, delta: number) => {
    const updatedPoints = { ...points, [team]: getTeamPoints(team) + delta };
    setPoints(updatedPoints);
    localStorage.setItem(TABOO_KEY, JSON.stringify({ teams, points }));
  };

  const getTeamPoints = (team: string) => {
    return points[team] || 0;
  };

  return (
    <div className="p-2">
      <div className="flex gap-2 p-2">
        <input
          className="border px-2 py"
          placeholder="Add Team"
          onChange={(e) => setNewTeam(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTeam()}
          value={newTeam}
        />
        <button
          className="p-2 bg-slate-100 hover:bg-slate-300"
          onClick={() => addTeam()}
        >
          Add
        </button>
        {teams.length > 0 && (
          <>
            <button
              className="p-2 bg-slate-100 hover:bg-slate-300"
              onClick={() => resetPoints()}
            >
              Reset Points
            </button>
            <button
              className="p-2 bg-slate-100 hover:bg-slate-300"
              onClick={() => resetTeams()}
            >
              Reset Game
            </button>
          </>
        )}
      </div>

      <table>
        <tbody>
          {teams.map((t) => (
            <tr key={t}>
              <td className="p-2 font-bold">{t}</td>
              <td className="text-right w-16">{getTeamPoints(t)}</td>
              <td>
                <div key={t} className="flex gap-2 px-4">
                  <button
                    className="bg-green-100 py-2 px-4"
                    onClick={() => changeTeamPoints(t, 1)}
                  >
                    Guessed
                  </button>
                  <button
                    className="bg-red-100 py-2 px-4 font-bold"
                    onClick={() => changeTeamPoints(t, -1)}
                  >
                    TABOO!
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
