import AddWeekForm from "@/components/form/add-week-form";
import { columns } from "@/components/weeks-data-table/columns";
import { WeeksDataTable } from "@/components/weeks-data-table/weeks-data-table";
import { getAllWeeks } from "@/data/week";
import React from "react";

const WeekList = async () => {
  const weeks = await getAllWeeks();
  
  if (!weeks) {
    return <div className="w-full text-center">Failed to load weeks data</div>;
  }

  return (
    <>
      <AddWeekForm />
      <WeeksDataTable columns={columns} data={weeks} />
    </>
  );
};

export default WeekList;
