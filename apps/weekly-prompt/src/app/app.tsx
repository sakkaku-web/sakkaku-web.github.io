import { addWeeks, subWeeks } from 'date-fns';
import { Weekly } from './weekly';

export function App() {
  return (
    <div className="flex flex-col justify-center items-center gap-8 p-4 h-full">
      <Weekly date={subWeeks(new Date(), 1)} />
      <Weekly date={new Date()} />
      <Weekly date={addWeeks(new Date(), 1)} />
    </div>
  );
}

export default App;
