import React from "react";
import { Button } from "../ui/button";
import Link from 'next/link'

const ViewStudentDiaryButton = ({userId, conversationId} : {userId: string, conversationId: string}) => {
  return (
    <Button asChild variant="link" size="sm" className="px-0">
      <Link href={`/supervisor/marking/${userId}/${conversationId}`}>View</Link>
    </Button>
  );
};

export default ViewStudentDiaryButton;
