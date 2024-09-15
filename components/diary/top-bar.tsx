"use client";

import { Week } from "@prisma/client";
import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";

const TopBar = ({ conversationWeek }: { conversationWeek: Week }) => {
  return (
    <header className="-mx-6 -mt-8 bg-gray-100 shadow-md sm:-mx-12 flex flex-row items-center">
      <a href="/diary" className="ml-8">
        <Button variant="ghost" size="icon"><ChevronLeft size={18} /></Button>
      </a>
      <p className=" py-4 text-gray-700">
        {conversationWeek?.title}: {conversationWeek?.description}
      </p>
    </header>
  );
};

export default TopBar;
