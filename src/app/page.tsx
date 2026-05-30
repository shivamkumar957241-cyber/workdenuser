import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-violet-100 via-indigo-50 to-cyan-100 p-4">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Welcome to WorkDen</h1>
      <nav className="flex flex-col space-y-4 text-lg">
        <Link href="/pricing" className="text-blue-600 hover:underline">Pricing</Link>
        <Link href="/index.html" className="text-blue-600 hover:underline">Home (static)</Link>
        <Link href="/plans.html" className="text-blue-600 hover:underline">Plans</Link>
        <Link href="/refund.html" className="text-blue-600 hover:underline">Refund Policy</Link>
        <Link href="/privacy.html" className="text-blue-600 hover:underline">Privacy</Link>
      </nav>
    </main>
  );
}
