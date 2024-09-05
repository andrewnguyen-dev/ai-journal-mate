"use client";
import { defaultSystemMessage } from "@/lib/constants";
import { Question } from "@prisma/client";
import { useChat } from "ai/react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { generateRandomId } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-area";

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

  const [currentQuestion, setCurrentQuestion] = useState(1);

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

  const handleQuestionClick = () => {
    if (currentQuestion <= questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      // Add the question to the chat history
      setMessages([
        ...messages,
        {
          id: generateRandomId(),
          role: "assistant",
          content: questions[currentQuestion].questionText,
        },
      ]);
    }
  };

  return (
    <main className="grid grid-cols-6 space-x-4">
      <section className="order-2 col-span-6 pt-6 sm:order-1 sm:col-span-4">
        <div className="rounded-sm border border-gray-200 bg-white p-3">
          <ScrollArea className="stretch relative mx-auto flex h-[70vh] w-full max-w-2xl flex-col py-12 pr-4">
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
            <form
              onSubmit={handleSubmit}
              className="absolute bottom-0 flex w-full gap-2 pr-4"
            >
              <input
                className="w-full rounded border border-gray-300 p-2"
                value={input}
                placeholder="Your answer..."
                onChange={handleInputChange}
              />
              <Button type="submit" variant="outline">
                Send
              </Button>
            </form>
          </ScrollArea>
        </div>
      </section>
      <aside className="order-1 col-span-6 space-y-4 pt-6 sm:order-2 sm:col-span-2">
        <div className="space-y-3">
          {questions.map((question) => (
            <div
              key={question.id}
              className={`rounded-sm border bg-rose-100 p-3 text-sm text-gray-700 ${question.order <= currentQuestion ? "border-rose-400" : ""}`}
            >
              {/* Add a checkmark icon if the question is answered */}
              {/* Add a pencil icon if the question is being edited */}
              {question.order}. {question.questionText}
            </div>
          ))}
        </div>
        <div className="flex gap-3">
          {currentQuestion <= questions.length - 1 && (
            <Button onClick={handleQuestionClick}>Next Question</Button>
          )}
          <Button variant="outline">Save Draft</Button>
        </div>
      </aside>
    </main>
  );
};

export default MainChatSection;
