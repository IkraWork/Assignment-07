"use client";

export default function Error({ reset }) {
  return (
    <div className="rounded-box border border-base-300 bg-base-100 px-6 py-16 text-center">
      <p className="text-5xl">⚠️</p>
      <h1 className="mt-4 text-2xl font-bold">কিছু একটা ভুল হয়েছে</h1>
      <p className="mt-2 text-base-content/70">অনুগ্রহ করে আবার চেষ্টা করুন।</p>
      <button onClick={() => reset()} className="btn btn-primary mt-6">
        আবার চেষ্টা করুন
      </button>
    </div>
  );
}
