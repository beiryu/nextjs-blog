'use client';

import ChatInput from './ChatInput';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from 'components/ui/Accordion';
import ChatMessages from './ChatMessage';
import { ChatHeader } from './ChatHeader';

export default function Chat() {
  return (
    <Accordion type="single" collapsible className="relative z-40">
      <AccordionItem value="item-1">
        <div className="fixed right-8 w-60 bottom-8 bg-sky-50 border shadow-lg drop-shadow-lg border-gray-200 rounded-md overflow-hidden">
          <div className="w-full h-full flex flex-col">
            <AccordionTrigger className="px-6 border-b border-zinc-300">
              <ChatHeader />
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col h-80">
                <ChatMessages className="px-2 py-3 flex-1" />
                <ChatInput className="px-4" />
              </div>
            </AccordionContent>
          </div>
        </div>
      </AccordionItem>
    </Accordion>
  );
}
