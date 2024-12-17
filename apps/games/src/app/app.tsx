import { Route, Routes, NavLink } from 'react-router-dom';
import { Taboo } from './taboo';
import { Yahtzee } from './yahtzee';
import { CodeNames } from './codenames';

export function App() {
  const links = [
    { link: '/taboo', name: 'Taboo' },
    { link: '/yahtzee', name: 'Yahtzee', },
    { link: '/codenames', name: 'Codenames' },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="grow p-2">
        <Routes>
          <Route path="/" element={'Select a game below...'}></Route>
          <Route path="/taboo" element={<Taboo />}></Route>
          <Route path="/yahtzee" element={<Yahtzee />}></Route>
          <Route path="/codenames" element={<CodeNames />}></Route>
        </Routes>
      </div>
      <nav>
        <ul className="flex border-t bg-slate-100">
          {links.map((l) => (
            <li key={l.link}>
              <NavLink
                className={({ isActive }) =>
                  `px-4 py-2 block border-r ${
                    isActive ? 'bg-slate-300' : 'hover:bg-slate-400'
                  }`
                }
                to={l.link}
              >
                {l.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default App;
