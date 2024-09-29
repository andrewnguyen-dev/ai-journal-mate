"use client";

import { useChat, useCompletion } from "ai/react";
import { Forward, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";

import {
  deleteConversationMessagesAction,
  saveDraftAction,
  submitDiaryAction,
  unsubmitDiaryAction,
} from "@/actions/conversation";
import { defaultSystemMessageForDiary, defaultSystemMessageForReflectionReport } from "@/lib/constants";
import { generateRandomId } from "@/lib/utils";
import { Message, Question } from "@prisma/client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";

interface MainChatSectionProps {
  conversationId: string;
  isDiarySubmitted: boolean;
  questions: Question[];
  draftMessages: Message[] | null;
  type: 'DIARY' | 'REFLECTION_REPORT';
  conversationSummaries?: string;
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
  type,
  conversationSummaries
}: MainChatSectionProps) => {
  // Use the Vercel AI SDK chat hook
  const { messages, input, handleInputChange, handleSubmit, setMessages, append } =
    useChat();
  console.log("🚀 ~ messages:", messages);

  const [currentQuestion, setCurrentQuestion] = useState(1); // State to keep track of the current question number
  const router = useRouter(); // Next.js router for navigation
  const messagesEndRef = useRef<HTMLDivElement | null>(null); // Ref for auto-scrolling to the last message
  const defaultSystemMessage = type === 'DIARY' ? defaultSystemMessageForDiary : defaultSystemMessageForReflectionReport;

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
  }, [defaultSystemMessage, setMessages]);

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

  // Effect for scrolling to the last message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
        toast.success("Conversation messages saved successfully!");
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

  /**
   * Generates a summary of the diary entries
   * @returns {Promise<string|null>} The generated summary or null if an error occurs
   */
  const generateDiarySummary = async () => {
    const joinedMessages = messages
      .slice(1)
      .map((m) => m.content)
      .join("\n");

    try {
      const response = await fetch("/api/summarize-diary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: joinedMessages,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.text;
    } catch (error) {
      console.error("Error generating diary summary:", error);
      return null;
    }
  };

  /**
   * Handles the submission of the diary
   * Saves the draft, generates a summary, and submits the diary
   */
  const handleSubmitDiary = async () => {
    try {
      // Save conversation messages
      await handleSaveDraft();

      const submittingToast = toast.loading("Submitting diary...");
      // Call API to Vercel AI SDK to generate summary and insert it into DB
      const summary = await generateDiarySummary();
      if (summary) {
        // Submit diary
        await submitDiaryAction(conversationId, summary);
      }
      toast.dismiss(submittingToast);
      toast.success("Diary submitted successfully!");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit diary!");
    }
  };

  /**
   * Handles unsubmitting a previously submitted diary
   */
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

  const handleEvaluateReflection = async () => {
    append({
      id: `system-evaluate-message-${randomId}`,
      role: "system",
      content: `Based on the previous discusson....
You're an insightful assistant guiding students in developing their reflective practice by evaluating previous diary entries, and comparing it to their answers to the following questions:

- Your personal reflection and description of how the project went
- What have you learned yb carrying out project activities
- Things that you could have done differently to achieve a better outcome. 

When comparing their diary entries against these questions identify possible gaps, and encourage the student to explore why they were not part of their answers to these three questions. 
      Use the summaries of the previous conversations below to guide your evaluation: ${conversationSummaries}
      `,
      createdAt: new Date(),
    })
  }

  /**
   * Renders the main chat interface and sidebar
   */
  return (
    <main className="grid grid-cols-6 space-x-4">
      {/* Main chat section */}
      <section className="order-2 col-span-6 pt-6 sm:order-1 sm:col-span-4">
        <div className="rounded-sm border border-gray-200 bg-white p-3">
          <div className="stretch relative mx-auto flex h-[70vh] w-full max-w-2xl flex-col">
            {/* Render chat messages */}
            <ScrollArea className="mb-24 mt-6 pr-4 md:pr-6">
              {messages.map((m) =>
                (m.role === "user" || m.role === "assistant") && !m.id.startsWith('system-evaluate-message') ? (
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
              <div ref={messagesEndRef} />
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
            <p className="text-[0.8rem] italic text-gray-700">
              Students are advised to answer around 3 questions before clicking
              the &apos;Next Question&apos; button.
            </p>
          </div>
          {/* Action buttons */}
          <div className="flex flex-col gap-3 md:flex-row">
            {currentQuestion < questions.length && (
              <Button onClick={handleNextQuestion}>Next Question</Button>
            )}
            {currentQuestion === questions.length && type === 'REFLECTION_REPORT' && (
              <Button onClick={handleEvaluateReflection}>
                <Sparkles className="mr-2 h-4 w-4"/> Evaluate my Reflection
              </Button>
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
          {/* Submit diary button with confirmation dialog */}
          {!isDiarySubmitted && currentQuestion === questions.length && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="group">
                  Submit{" "}
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
          {/* Unsubmit diary button (for development purposes) */}
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
