import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 flex flex-col items-center justify-center text-white">
      <Loader2 className="w-16 h-16 animate-spin mb-4" />
      <h1 className="text-2xl font-bold">Loading Your Digital Drive...</h1>
      <p className="text-blue-200">Please wait a moment.</p>
    </div>
  );
}
