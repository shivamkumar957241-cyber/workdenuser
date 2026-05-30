import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-5xl font-bold mb-4 text-red-600">404 – Page Not Found</h1>
      <p className="mb-6 text-lg text-gray-700">The page you are looking for does not exist.</p>
      <nav className="flex flex-col space-y-3 text-center">
        <Link href="/" className="text-blue-600 hover:underline">Home</Link>
        <Link href="/pricing" className="text-blue-600 hover:underline">Pricing</Link>
        <Link href="/index.html" className="text-blue-600 hover:underline">Static Home</Link>
        <Link href="/plans.html" className="text-blue-600 hover:underline">Plans</Link>
        <Link href="/refund.html" className="text-blue-600 hover:underline">Refund Policy</Link>
        <Link href="/privacy.html" className="text-blue-600 hover:underline">Privacy</Link>
      </nav>
    </main>
  );
}
