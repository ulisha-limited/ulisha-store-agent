/**
 * Copyright 2025 Ulisha Limited
 * Licensed under the Apache License, Version 2.0
 * See LICENSE file in the project root for full license information.
 */

export default function ComingSoon() {
  return (
    <div
      className="relative flex min-h-screen bg-black text-white bg-cover bg-center"
      style={{ backgroundImage: "url('/images/background-cover.png')" }}
    >
      <div className="flex flex-col items-center justify-center w-full h-full p-4 md:absolute md:bottom-12 md:left-12 md:items-start md:justify-end">
        <h1 className="text-4xl font-bold">Ulisha Agent</h1>
        <p className="text-lg text-center md:text-left">
          Your personal, private and secret AI assistant
        </p>
        <h4 className="mt-2">Coming soon to your desktop.</h4>
      </div>
    </div>
  );
}
