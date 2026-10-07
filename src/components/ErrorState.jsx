import Link from "next/link";

export default function ErrorState({ title = "ডেটা লোড করা যায়নি", message = "অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।" }) {
  return (
    <div className="rounded-box border border-base-300 bg-base-100 p-10 text-center">
      <p className="text-5xl">⚠️</p>
      <h2 className="mt-3 text-xl font-semibold">{title}</h2>
      <p className="mt-1 text-base-content/70">{message}</p>
      <Link href="/" className="btn btn-primary mt-5">
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
