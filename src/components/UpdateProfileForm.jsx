"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfileForm({ initialName }) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const trimmed = name.trim();
    if (trimmed.length < 2) {
      toast.error("নাম কমপক্ষে ২ অক্ষরের হতে হবে");
      return;
    }
    setLoading(true);
    const { error } = await authClient.updateUser({ name: trimmed });
    setLoading(false);
    if (error) {
      toast.error(error.message || "তথ্য আপডেট করা যায়নি");
      return;
    }
    toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
    window.location.assign("/profile");
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-box border border-base-300 bg-base-100 p-6 shadow-sm sm:p-8">
      <h1 className="text-2xl font-bold">তথ্য আপডেট করুন</h1>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <label className="block">
          <span className="mb-1 block text-sm font-medium">নাম</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full"
            autoComplete="name"
          />
        </label>
        <button type="submit" disabled={loading} className="btn btn-primary w-full">
          {loading ? <span className="loading loading-spinner loading-sm" /> : null}
          তথ্য আপডেট করুন
        </button>
        <Link href="/profile" className="btn btn-ghost w-full">
          বাতিল করুন
        </Link>
      </form>
    </div>
  );
}
