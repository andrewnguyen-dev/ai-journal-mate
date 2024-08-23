import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  // const confirmLink = `${process.env.NEXT_PUBLIC_VERCEL_URL}/auth/verify-email?token=${token}`;
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "WSU NoReply <onboarding@resend.dev>",
    to: email,
    subject: "Verify your email address",
    html: `
      <h1>Verify your email address</h1>
      <p>Click the link below to verify your email address:</p>
      <a href="${confirmLink}">${confirmLink}</a>
    `,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  // const resetLink = `${process.env.NEXT_PUBLIC_VERCEL_URL}/auth/verify-email?token=${token}`;
  const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "WSU NoReply <onboarding@resend.dev>",
    to: email,
    subject: "Reset your password",
    html: `
      <h1>Reset your password</h1>
      <p>Click the link below to reset your password:</p>
      <a href="${resetLink}">${resetLink}</a>
    `,
  });
};
