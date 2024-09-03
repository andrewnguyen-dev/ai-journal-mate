"use client";

import { Week } from "@prisma/client";

const TopBar = ({ conversationWeek }: { conversationWeek: Week }) => {
  return (
    <header className="-mx-6 -mt-8 bg-gray-100 shadow-md sm:-mx-12">
      <p className="px-8 py-4 text-gray-700">
        {conversationWeek?.title}: {conversationWeek?.description}
      </p>
    </header>
  );
};

export default TopBar;
