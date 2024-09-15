"use client";

import { defaultSystemMessage } from "@/lib/constants";
import { Message, Question } from "@prisma/client";
import { useChat } from "ai/react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { generateRandomId } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-area";
import {
  deleteConversationMessagesAction,
  saveDraftAction,
  submitDiaryAction,
} from "@/actions/conversation";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Forward } from "lucide-react";

// Generate a random ID for this instance of the component
const randomId = generateRandomId();

/**
 * MainChatSection Component
 *
 * This component handles the main chat interface, including message display,
 * user input, and navigation through a series of questions.
 *
 * @param {Object} props - Component props
 * @param {string} props.conversationId - Unique identifier for the current conversation
 * @param {Question[]} props.questions - Array of questions to be asked
 * @param {Message[] | null} props.draftMessages - Previously saved draft messages, if any
 */
const MainChatSection = ({
  conversationId,
  questions,
  draftMessages,
}: {
  conversationId: string;
  questions: Question[];
  draftMessages: Message[] | null;
}) => {
  // Use the Vercel AI SDK chat hook
  const { messages, input, handleInputChange, handleSubmit, setMessages } =
  useChat();
  console.log("🚀 ~ messages:", messages)
  
  const [currentQuestion, setCurrentQuestion] = useState(1); // State to keep track of the current question number
  const router = useRouter(); // Next.js router for navigation

  // Effect for initializing messages with system message
  useEffect(() => {
    setMessages([
      {
        id: `default-system-message-${randomId}`,
        role: "system",
        content: defaultSystemMessage,
        createdAt: new Date(),
      },
    ]);
  }, [setMessages]);

  // Effect for handling draft messages and setting up initial question
  useEffect(() => {
    if (draftMessages && draftMessages.length > 0) {
      // Transform draft messages to the format expected by the chat
      const transformedMessages = draftMessages.map((message) => ({
        id: message.id,
        content: message.messageText,
        role: message.sender,
        createdAt: message.createdAt,
      }));

      // Add transformed messages to the chat
      setMessages((prevMessages) => [...prevMessages, ...transformedMessages]);

      // Find the last question message to determine where to resume
      const lastQuestionMessage = [...transformedMessages]
        .reverse()
        .find(
          (msg) => msg.role === "assistant" && msg.id.startsWith("question-"),
        );

      if (lastQuestionMessage) {
        // Extract question number from the message ID
        const match = lastQuestionMessage.id.match(/question-(\d+)-/);
        if (match && match[1]) {
          setCurrentQuestion(parseInt(match[1], 10));
        }
      }
    } else {
      // If no draft messages, start from the first question
      setCurrentQuestion(1);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: `system-message-${randomId}`,
          role: "system",
          content: questions[0].systemMessage ?? "",
          createdAt: new Date(new Date().getTime() + 100),
        },
        {
          id: `question-1-${randomId}`,
          role: "assistant",
          content: questions[0].questionText,
          createdAt: new Date(new Date().getTime() + 200),
        },
      ]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draftMessages, questions]);

  /**
   * Handles progression to the next question
   */
  const handleNextQuestion = () => {
    if (currentQuestion < questions.length) {
      // Increment the current question number
      setCurrentQuestion((prev) => prev + 1);
      // Add the next question to the message list
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: `question-${currentQuestion + 1}-${randomId}`,
          role: "assistant",
          content: questions[currentQuestion].questionText,
          createdAt: new Date(),
        },
      ]);
    }
  };

  /**
   * Saves the current conversation as a draft
   */
  const handleSaveDraft = async () => {
    try {
      // Determine which messages are new and need to be saved
      const newMessages = draftMessages
        ? messages.filter(
            (message) =>
              !draftMessages.some((draft) => draft.id === message.id),
          )
        : messages;

      // Save the draft
      const savedDraft = await saveDraftAction(conversationId, newMessages);
      if (savedDraft) {
        toast.success("Draft saved successfully!");
      } else {
        toast.error("Failed to save draft!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to save draft!");
    }
  };

  /**
   * Deletes all messages in the current conversation
   */
  const handleDeleteConversationMessages = async () => {
    try {
      await deleteConversationMessagesAction(conversationId);
      toast.success("Conversation deleted successfully!");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete conversation!");
    }
  };

  const handleSubmitDiary = async () => {
    try {
      await submitDiaryAction(conversationId);
      toast.success("Diary submitted successfully!");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit diary!");
    }
  };

  return (
    <main className="grid grid-cols-6 space-x-4">
      {/* Main chat section */}
      <section className="order-2 col-span-6 pt-6 sm:order-1 sm:col-span-4">
        <div className="rounded-sm border border-gray-200 bg-white p-3">
          <ScrollArea className="stretch relative mx-auto flex h-[70vh] w-full max-w-2xl flex-col py-12 pr-4 md:pr-6">
            {/* Render chat messages */}
            {messages.map((m) =>
              m.role === "user" || m.role === "assistant" ? (
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
            {/* User input form */}
            <form
              onSubmit={handleSubmit}
              className="absolute bottom-0 flex w-full gap-2 pr-4 md:pr-6"
            >
              <input
                className="w-full rounded border border-gray-300 p-2"
                value={input}
                placeholder="Your answer..."
                onChange={handleInputChange}
              />
              <Button type="submit" variant="secondary" className="border border-gray-300">
                Send
              </Button>
            </form>
          </ScrollArea>
        </div>
      </section>
      {/* Sidebar section */}
      <aside className="order-1 col-span-6 flex flex-col justify-between pt-6 sm:order-2 sm:col-span-2">
        <div className="space-y-4">
          {/* Display questions */}
          <div className="space-y-3">
            {questions.map((question) => (
              <div
                key={question.id}
                className={`rounded-sm border bg-rose-100 p-3 text-sm text-gray-700 ${question.order <= currentQuestion ? "border-rose-400" : ""}`}
              >
                {question.order}. {question.questionText}
              </div>
            ))}
          </div>
          {/* Action buttons */}
          <div className="flex flex-col gap-3 md:flex-row">
            {currentQuestion < questions.length && (
              <Button onClick={handleNextQuestion}>Next Question</Button>
            )}
            <Button variant="outline" onClick={handleSaveDraft}>
              Save Draft
            </Button>
          </div>
          {/* Delete conversation button (for development purposes) */}
          <Button
            variant="destructive"
            onClick={handleDeleteConversationMessages}
          >
            Delete Conversation in DB (for dev purpose only)
          </Button>
        </div>
        <div>
          <Button className="group" onClick={handleSubmitDiary}>Submit Diary <Forward size={18} className="ml-2 group-hover:ml-3 transition-all"/></Button>
        </div>
      </aside>
    </main>
  );
};

export default MainChatSection;
