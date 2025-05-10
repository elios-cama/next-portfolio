import React from "react";
import Link from "next/link";

export default function Backpack() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-neutral-300">
      <h1 className="text-2xl font-mono mb-8">BACKPACK</h1>
      <p className="mb-8">Coming soon...</p>
      <Link href="/" className="font-mono underline">
        Back to home
      </Link>
    </main>
  );
} 