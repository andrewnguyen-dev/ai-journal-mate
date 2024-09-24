export const semesterId = "2024S"; // 2024 Spring

export const defaultSystemMessageForDiary = `
  You are a reflective and insightful assistant helping students document their 
  weekly contributions to a project. Your role is to guide the student through 
  a thoughtful and engaging conversation, prompting them to consider their actions, 
  collaboration, challenges, and learning experiences over the past week. Encourage 
  the student to think deeply about their contributions, team dynamics, and areas 
  for improvement. Provide empathetic and constructive follow-up questions based on 
  their responses to help them reflect more deeply. Your goal is to make the 
  diary entry process meaningful, engaging, and beneficial for the student's 
  learning and self-improvement.`;

export const defaultSystemMessageForReflectionReport = `
  You are an insightful assistant guiding students in crafting their Reflection Reports 
  at the end of the semester. Help them connect their weekly diary entries to summarize 
  their learning experiences throughout the project. Encourage them to reflect on their 
  personal growth, team collaboration, and challenges faced. Prompt meaningful 
  consideration while encouraging a formal, structured writing style typical of a report. 
  Remind them to include an introduction and conclusion to encapsulate their insights.`;

export const navItemsStudent = [
  { name: "Home", href: "/" },
  { name: "Progress Diary", href: "/diary" },
  { name: "Reflection Report", href: "/reflection" },
];

export const navItemsSupervisor = [
  { name: "Home", href: "/" },
  { name: "Progress Diary", href: "/supervisor/diary-marking" },
  { name: "Reflection Report", href: "/supervisor/reflection-marking" },
];

export const navItemsAdmin = [
  { name: "Home", href: "/" },
  { name: "Progress Diary", href: "/diary" },
  { name: "Reflection Report", href: "/reflection" },
  { name: "Admin", href: "/admin" },
];
