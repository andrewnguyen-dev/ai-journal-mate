import Link from "next/link";
import React from "react";

type FormFooterProps = {
  text: string;
  backBtnHref: string;
  backBtnLabel: string;
};

const FormFooter = ({ text, backBtnHref, backBtnLabel }: FormFooterProps) => {
  return (
    <div className="text-center text-sm text-muted-foreground">
      {text}{" "}
      <Link
        href={backBtnHref}
        className="font-medium underline underline-offset-4"
        prefetch={false}
      >
        {backBtnLabel}
      </Link>
    </div>
  );
};

export default FormFooter;
