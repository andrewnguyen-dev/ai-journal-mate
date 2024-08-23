"use client";

import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { PropagateLoader } from 'react-spinners';

import { newVerification } from '@/actions/new-verification';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';

import FormFooter from './form-footer';
import FormTitle from './form-title';

const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (!token) {
      setError("Missing token");
      return;
    }
    
    newVerification(token)
      .then((res) => {
        setError(res?.error)
        setSuccess(res?.success)
      })
      .catch((err) => {
        setError("Something went wrong")
      })
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <>
      <FormTitle title="Verify your email address" />
      {!success && !error && (
        <div className="flex w-full items-center justify-center py-10 opacity-80">
          <PropagateLoader />
        </div>
      )}
      <div className="py-6">
        <FormSuccess message={success}/>
        <FormError message={error}/>
      </div>
      <FormFooter
        text="Back to "
        backBtnHref="/auth/login"
        backBtnLabel="Login"
      />
    </>
  );
};

export default NewVerificationForm;
