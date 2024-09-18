"use client";

import { useChat } from 'ai/react';
import { Forward } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';

import {
    deleteConversationMessagesAction, saveDraftAction, submitDiaryAction, unsubmitDiaryAction
} from '@/actions/conversation';
import { defaultSystemMessage } from '@/lib/constants';
import { generateRandomId } from '@/lib/utils';
import { Message, Question } from '@prisma/client';

import {
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
    AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger
} from '../ui/alert-dialog';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';

interface MainChatSectionProps {
  conversationId: string;
  isDiarySubmitted: boolean;
  questions: Question[];
  draftMessages: Message[] | null;
}

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
 * @param {boolean} props.isDiarySubmitted - Flag indicating whether the diary has been submitted
 * @param {Question[]} props.questions - Array of questions to be asked
 * @param {Message[] | null} props.draftMessages - Previously saved draft messages, if any
 */
const MainChatSection = ({
  conversationId,
  isDiarySubmitted,
  questions,
  draftMessages,
}: MainChatSectionProps) => {
  // Use the Vercel AI SDK chat hook
  const { messages, input, handleInputChange, handleSubmit, setMessages } =
    useChat();
  console.log("🚀 ~ messages:", messages);

  const [currentQuestion, setCurrentQuestion] = useState(1); // State to keep track of the current question number
  const router = useRouter(); // Next.js router for navigation

  // Transform draft messages to the format expected by the chat, memoized for performance
  const transformedMessages = useMemo(() => {
    if (!draftMessages || draftMessages.length === 0) return [];
  
    return draftMessages.map((message) => ({
      id: message.id,
      content: message.messageText,
      role: message.sender,
      createdAt: message.createdAt,
    }));
  }, [draftMessages]);

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
    if (transformedMessages.length > 0) {
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
  }, []);

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
      await handleSaveDraft();
      // TODO: Generate Summary
      await submitDiaryAction(conversationId);
      toast.success("Diary submitted successfully!");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit diary!");
    }
  };

  const handleUnsubmitDiary = async () => {
    try {
      await unsubmitDiaryAction(conversationId);
      toast.success("Diary unsubmitted successfully!");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to unsubmit diary!");
    }
  };

  return (
    <main className="grid grid-cols-6 space-x-4">
      {/* Main chat section */}
      <section className="order-2 col-span-6 pt-6 sm:order-1 sm:col-span-4">
        <div className="rounded-sm border border-gray-200 bg-white p-3">
          <div className="stretch relative mx-auto flex h-[70vh] w-full max-w-2xl flex-col">
            {/* Render chat messages */}
            <ScrollArea className="mb-24 mt-6 pr-4 md:pr-6">
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
            </ScrollArea>

            {/* User input form */}
            <form
              onSubmit={handleSubmit}
              className="absolute bottom-0 flex w-full gap-2 pr-4 md:pr-6"
            >
              <textarea
                className="h-24 w-full resize-none rounded border border-gray-300 p-2"
                value={input}
                placeholder="Your answer..."
                onChange={handleInputChange}
                disabled={isDiarySubmitted}
              />
              <Button
                type="submit"
                variant="secondary"
                className="h-24 border border-gray-300"
                disabled={isDiarySubmitted}
              >
                Send
              </Button>
            </form>
          </div>
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
            {!isDiarySubmitted && (
              <Button variant="outline" onClick={handleSaveDraft}>
                Save Draft
              </Button>
            )}
          </div>
          {/* Delete conversation button (for development purposes) */}
          <Button
            variant="destructive"
            onClick={handleDeleteConversationMessages}
          >
            Delete Conversation in DB (dev only)
          </Button>
        </div>
        <div>
          {!isDiarySubmitted && currentQuestion === questions.length && (
            <AlertDialog>
              <AlertDialogTrigger>
                <Button className="group">
                  Submit Diary{" "}
                  <Forward
                    size={18}
                    className="ml-2 transition-all group-hover:ml-3"
                  />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleSubmitDiary}>
                    Submit
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
          {isDiarySubmitted && (
            <Button className="group" onClick={handleUnsubmitDiary}>
              Unsubmitted Diary (dev only)
            </Button>
          )}
        </div>
      </aside>
    </main>
  );
};

export default MainChatSection;
