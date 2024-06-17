import { BotMessageSquareIcon } from 'lucide-react';

export function ChatHeader() {
  return (
    <div className="w-full flex gap-3 justify-start items-center text-zinc-800">
      <div className="flex flex-col items-start text-sm">
        <div className="flex gap-1.5 items-center">
          <BotMessageSquareIcon color="#0c4a6e" />
          <p className="w-2 h-2 rounded-full bg-sky-500" />
          <p className="font-medium text-underline-rising">Beiryu support</p>
        </div>
      </div>
    </div>
  );
}
