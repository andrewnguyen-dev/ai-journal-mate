import { NextResponse } from "next/server";
import { parse } from "csv-parse/sync";
import prisma from "@/lib/prisma";
import { currentSemesterId } from "@/lib/constants";

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const file = data.get("file") as File;

    if (!file) {
      return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
    }

    const fileContent = await file.text();
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
    });

    // Insert into Prisma User model
    const users = records.map((record: any) => ({
      firstName: record['First Name'],
      lastName: record['Last Name'],
      studentId: record['Student ID'],
      email: record['Username'] + '@student.westernsydney.edu.au', // Adjust the logic for email later
      password: "default_password", // Replace this logic appropriately for real applications
      // semesterId: currentSemesterId
    }));

    await prisma.user.createMany({
      data: users,
      skipDuplicates: true, // Avoid inserting duplicate email records
    });

    return NextResponse.json({ message: "Data uploaded successfully!" });
  } catch (error) {
    console.error("Error processing CSV upload:", error);
    return NextResponse.json({ message: "Failed to process CSV" }, { status: 500 });
  }
}
