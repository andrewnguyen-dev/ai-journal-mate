import { useState, useEffect } from "react";
import { Week } from "@prisma/client";

export const useCurrentWeek = () => {
  const [currentWeek, setCurrentWeek] = useState<Week | null>(null);

  useEffect(() => {
    const fetchWeeksData = async () => {
      try {
        const response = await fetch("/api/weeks");
        if (!response.ok) {
          throw new Error("Failed to fetch weeks");
        }

        const weeksData = await response.json();

        const today = new Date();
        const foundCurrentWeek = weeksData.find((week: Week) => {
          const fromDate = new Date(week.fromDate);
          const toDate = new Date(week.toDate);
          return today >= fromDate && today <= toDate;
        });

        setCurrentWeek(foundCurrentWeek || null);
      } catch (error) {
        console.error("Error fetching current week:", error);
        setCurrentWeek(null);
      }
    };

    fetchWeeksData();
  }, []);

  return currentWeek;
};
