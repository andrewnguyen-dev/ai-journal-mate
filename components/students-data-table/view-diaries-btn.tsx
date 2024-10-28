import React from "react";
import { Button } from "../ui/button";
import Link from 'next/link'

const ViewDiariesButton = ({userId} : {userId: string}) => {
  return (
    <Button asChild variant="link" size="sm" className="px-0">
      <Link href={`/supervisor/marking/${userId}`}>View</Link>
    </Button>
  );
};

export default ViewDiariesButton;
