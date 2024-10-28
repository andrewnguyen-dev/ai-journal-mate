"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

export default function UploadCSVButton() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload-csv", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setMessage("Data uploaded successfully!");
      } else {
        const error = await response.json();
        setMessage(`Error: ${error.message}`);
      }
    } catch (err) {
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-4">
      <div className="grid w-full max-w-sm items-center gap-2">
        <Label htmlFor="student-csv">Import Students (CSV file)</Label>
        <Input id="student-csv" type="file" accept=".csv" onChange={handleFileChange} />
      </div>
      <Button variant="secondary" onClick={handleUpload} className="btn btn-primary">
        Upload CSV
      </Button>

      </div>
      {message && <p className="text-red-600 text-sm">{message}</p>}
    </div>
  );
}