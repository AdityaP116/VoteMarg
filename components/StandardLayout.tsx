"use client";

import React from "react";

interface StandardLayoutProps {
  children: React.ReactNode;
  headerContent?: React.ReactNode;
  footerContent?: React.ReactNode;
}

export default function StandardLayout({ 
  children, 
  headerContent, 
  footerContent 
}: StandardLayoutProps) {
  return (
    <div className="min-h-screen bg-[var(--surface)] py-4 sm:py-8 px-4 flex flex-col items-center">
      <div className="w-full max-w-md bg-[var(--surface-container-lowest)] border border-[var(--outline-variant)] rounded-2xl shadow-sm flex flex-col">
        {/* Header Section */}
        <header className="px-5 py-4 border-b border-[var(--outline-variant)] flex items-center justify-between">
          <h1 className="text-2xl font-black tracking-tight text-[var(--primary)]">
            VoteMarg
          </h1>
          {headerContent}
        </header>

        {/* Main Content Section */}
        <main className="p-5 flex-1">
          {children}
        </main>

        {/* Footer Section */}
        {footerContent && (
          <footer className="p-5 border-t border-[var(--outline-variant)]">
            {footerContent}
          </footer>
        )}
      </div>
      
      {/* Optional helper text below card if needed */}
    </div>
  );
}
