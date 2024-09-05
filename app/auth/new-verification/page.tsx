import NewVerificationForm from "@/components/auth/new-verification-form";
import { Suspense } from "react";

const NewVerification = () => {
  return (
    <div className="auth-card-wrapper">
      <Suspense>
        <NewVerificationForm />
      </Suspense>
    </div>
  );
};

export default NewVerification;
