import Link from "next/link";

export default function NotFoundView({ title = "পাতাটি খুঁজে পাওয়া যায়নি", message = "আপনি যে পাতাটি খুঁজছেন তা নেই বা সরিয়ে নেওয়া হয়েছে।" }) {
  return (
    <div className="rounded-box border border-base-300 bg-base-100 px-6 py-16 text-center">
      <p className="text-6xl font-bold text-primary">৪০৪</p>
      <p className="mt-2 text-4xl">🛒</p>
      <h1 className="mt-4 text-2xl font-bold">{title}</h1>
      <p className="mx-auto mt-2 max-w-md text-base-content/70">{message}</p>
      <Link href="/" className="btn btn-primary mt-6">
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
