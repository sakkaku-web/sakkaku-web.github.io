export function App() {
  const urls = [
    {
      link: 'games',
      name: 'Games',
      desc: 'Some helpful tools for playing local board games',
    },
    {
      link: 'timers',
      name: 'Timers',
      desc: 'Create timers to track various activities',
    },
    {
      link: 'weekly-prompt',
      name: 'Weekly Prompt',
      desc: 'Weekly prompt generator for creative activities',
    },
    {
      link: 'randomizer',
      name: 'Randomizer',
      desc: 'Randomize lists of items for various stuff',
    },
  ];

  return (
    <div className="flex flex-col">
      {urls.map((url) => (
        <a
          key={url.link}
          href={url.link}
          className="p-4 m-4 bg-gray-200 hover:bg-gray-300 flex flex-col"
        >
          <h2 className="font-bold text-xl">{url.name}</h2>
          <p className="text-gray-600 text-sm">{url.desc}</p>
        </a>
      ))}
    </div>
  );
}

export default App;
