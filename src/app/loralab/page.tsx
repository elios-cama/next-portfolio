import React from "react";
import Link from "next/link";

export default function Loralab() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-[#c9c9c9]">
      <h1 className="text-2xl font-mono mb-8">LORALAB</h1>
      <p className="mb-8 font-mono">Coming soon...</p>
      <Link href="/" className="font-mono underline">
        Back to home
      </Link>
    </main>
  );
} 