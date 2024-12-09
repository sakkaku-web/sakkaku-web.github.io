import { isSameWeek, startOfWeek } from 'date-fns';
import seedrandom from 'seedrandom';
import prompts from './data/prompts.json';
import practices from './data/practice.json';
import colors from './data/colors.json';
import emotions from './data/emotions.json';

interface WeeklyDraw {
  color: string;
  emotion: string;
  prompt: string;
  practice: string;
}

interface WeeklyProps {
  date: Date;
}

export function Weekly({ date }: WeeklyProps) {
  const generateWeeklyDraw = (date: Date): WeeklyDraw => {
    const week = startOfWeek(date);
    const generator = seedrandom(`${week.getTime()}`);
    const random = () => Math.abs(generator.int32());

    const pickRandom = (arr: any[]) => arr[random() % arr.length];

    const color = pickRandom(colors);
    const emotion = pickRandom(emotions);
    const prompt = pickRandom(prompts);
    const practice = pickRandom(practices);

    return { color, emotion, prompt, practice };
  };

  const weekly = generateWeeklyDraw(date);
  const isThisWeek = isSameWeek(new Date(), date, { weekStartsOn: 1 });

  return (
    <div
      className={`flex flex-col justify-center text-center items-center gap-4 p-2 ${
        isThisWeek ? '' : 'opacity-25 text-xs'
      }`}
    >
      <div className={`font-bold ${isThisWeek ? 'text-2xl' : 'text-lg'}`}>
        {weekly.prompt}
      </div>
      <div className="flex flex-col font-light">
        <div> Color: {weekly.color} </div>
        <div> Emotion: {weekly.emotion} </div>
        <div className="mt-2"> Practice: {weekly.practice} </div>
      </div>
    </div>
  );
}
