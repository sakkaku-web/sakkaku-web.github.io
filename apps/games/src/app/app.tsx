import { Route, Routes, NavLink, redirect } from 'react-router-dom';
import { Taboo } from './taboo';
import { Yahtzee } from './yahtzee';

export function App() {
  const links = [
    { link: '/taboo', name: 'Taboo', component: Taboo },
    { link: '/yahtzee', name: 'Yahtzee', component: Yahtzee },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="grow">
        <Routes>
          <Route path="/" loader={async () => redirect('/taboo')}></Route>
          <Route path="/taboo" element={<Taboo />}></Route>
          <Route path="/yahtzee" element={<Yahtzee />}></Route>
        </Routes>
      </div>
      <div role="navigation">
        <ul className="flex border-t bg-slate-100">
          {links.map((l) => (
            <li key={l.link}>
              <NavLink
                className={({ isActive }) =>
                  `px-4 py-2 block border-r ${
                    isActive ? 'bg-slate-500' : 'hover:bg-slate-300'
                  }`
                }
                to={l.link}
              >
                {l.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
