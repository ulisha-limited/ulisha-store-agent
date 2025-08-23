"use client";

import { ReactNode, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="flex">
      <div
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-neutral-900 transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:static lg:translate-x-0
        `}
      >
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      </div>

      <div className="flex flex-col flex-1 min-h-screen bg-black-400">
        <Navbar toggleSidebar={toggleSidebar} />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
