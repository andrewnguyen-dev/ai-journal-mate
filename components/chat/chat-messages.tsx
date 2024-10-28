import React from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Message } from "ai";

const ChatMessages = ({ messages, className = "mb-24" }: { messages: Message[], className?: string }) => {
  return (
    <ScrollArea className={`${className} mt-6 pr-4 md:pr-6`}>
      {messages.map((m) =>
        (m.role === "user" || m.role === "assistant") &&
        !m.id.startsWith("system-evaluate-message") ? (
          <div
            key={m.id}
            className={`mb-4 whitespace-pre-line ${
              m.role === "user" ? "text-right" : "text-left"
            }`}
          >
            <div
              className={`inline-block max-w-[80%] rounded-lg px-4 py-2 ${
                m.role === "user"
                  ? "bg-wsu-600/90 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {m.content}
            </div>
          </div>
        ) : null,
      )}
    </ScrollArea>
  );
};

export default ChatMessages;
