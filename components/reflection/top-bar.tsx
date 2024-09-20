"use client";

import { Week } from "@prisma/client";
import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";

const TopBar = () => {
  return (
    <header className="-mx-6 -mt-8 flex flex-row items-center bg-gray-100 shadow-md sm:-mx-12">
      <p className="ml-16 py-4 font-semibold text-gray-700">
        Reflection Report
      </p>
    </header>
  );
};

export default TopBar;
