import Image from "next/image";

export default function Maintenance() {
  return (
    <main>
      <section className="flex flex-col md:flex-row min-h-screen items-center justify-center bg-gray-100 px-6 py-10">
        <div className="mt-8 md:mt-0 md:ml-10 text-center md:text-left text-gray-800">
          <h1 className="text-9xl font-bold text-blue-600">500</h1>
          <p className="mt-4 text-lg text-gray-600">
            We&apos;re currently doing a scheduled routine maintenance.
          </p>
          <p className="mt-4 text-sm text-gray-500">
            If you believe this is an error, please contact our support team.
          </p>
        </div>
      </section>
    </main>
  );
}
