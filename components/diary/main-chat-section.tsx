"use client";
import { defaultSystemMessage } from "@/lib/constants";
import { Question } from "@prisma/client";
import { useChat } from "ai/react";
import { useEffect } from "react";
import { Button } from "../ui/button";

const MainChatSection = ({ questions }: { questions: Question[] }) => {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    append,
    setMessages,
  } = useChat();

  console.log("🚀 ~ MainChatSection ~ messages:", messages);

  useEffect(() => {
    setMessages([
      {
        id: "default-system-message",
        role: "system",
        content: defaultSystemMessage,
      },
      {
        id: "system-message",
        role: "system",
        content: questions[0].systemMessage ?? "",
      },
      {
        id: "first-question",
        role: "assistant",
        content: questions[0].questionText,
      },
    ]);
  }, [questions, setMessages]);

  return (
    <main className="grid grid-cols-6 space-x-4">
      <section className="order-2 col-span-6 pt-6 sm:order-1 sm:col-span-4">
        <div className="rounded-sm border border-gray-200 bg-white p-3">
          <div className="relative stretch mx-auto max-w-2xl flex w-full flex-col py-12 h-[70vh]">
            {messages.map((m) => {
              if (m.role === "user" || m.role === "assistant") {
                return (
                  <div
                    key={m.id}
                    className={`mb-4 whitespace-pre-line ${
                      m.role === "user" ? "text-right" : "text-left"
                    }`}
                  >
                    <div
                      className={`inline-block rounded-lg px-4 py-2 ${
                        m.role === "user"
                          ? "bg-wsu-600/90 text-white"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      {m.content}
                    </div>
                  </div>
                );
              }
            })}
            <form onSubmit={handleSubmit} className="absolute bottom-0 w-full flex gap-2">
              <input
                className="w-full rounded border border-gray-300 p-2"
                value={input}
                placeholder="Your answer..."
                onChange={handleInputChange}
              />
              <Button type="submit" variant="outline">Send</Button>
            </form>
          </div>
        </div>
      </section>
      <aside className="order-1 col-span-6 pt-6 sm:order-2 sm:col-span-2">
        <div className="space-y-3">
          {questions.map((question) => (
            <div
              key={question.id}
              className="rounded-sm bg-rose-100 p-3 text-sm text-gray-700 border"
            >
              {/* Add a checkmark icon if the question is answered */}
              {/* Add a pencil icon if the question is being edited */}
              {question.order}. {question.questionText}
            </div>
          ))}
        </div>
      </aside>
    </main>
  );
};

export default MainChatSection;
