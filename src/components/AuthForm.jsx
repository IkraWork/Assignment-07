"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SocialButtons from "@/components/SocialButtons";
import { authClient } from "@/lib/auth-client";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AuthForm({ mode, redirectTo = "/", reason = "" }) {
  const router = useRouter();
  const isSignUp = mode === "signup";
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (reason === "protected") {
      toast.error("এই পাতা দেখতে আগে সাইন ইন করুন", { id: "protected-redirect" });
    }
  }, [reason]);

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  function validate() {
    if (isSignUp && form.name.trim().length < 2) return "নাম কমপক্ষে ২ অক্ষরের হতে হবে";
    if (!EMAIL_PATTERN.test(form.email)) return "সঠিক ইমেইল ঠিকানা দিন";
    if (form.password.length < 6) return "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে";
    return "";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const problem = validate();
    if (problem) {
      setError(problem);
      toast.error(problem);
      return;
    }
    setError("");
    setLoading(true);

    if (isSignUp) {
      const { error: err } = await authClient.signUp.email({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      });
      setLoading(false);
      if (err) {
        const message = err.message || "রেজিস্ট্রেশন করা যায়নি";
        setError(message);
        toast.error(message);
        return;
      }
      toast.success("রেজিস্ট্রেশন সফল হয়েছে, এখন সাইন ইন করুন");
      router.push("/signin");
      return;
    }

    const { error: err } = await authClient.signIn.email({
      email: form.email.trim(),
      password: form.password,
    });
    setLoading(false);
    if (err) {
      const message = err.message || "ইমেইল বা পাসওয়ার্ড সঠিক নয়";
      setError(message);
      toast.error(message);
      return;
    }
    toast.success("সফলভাবে সাইন ইন হয়েছে");
    router.push(redirectTo);
    router.refresh();
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-box border border-base-300 bg-base-100 p-6 shadow-sm sm:p-8">
      <h1 className="text-2xl font-bold">{isSignUp ? "নতুন অ্যাকাউন্ট খুলুন" : "সাইন ইন করুন"}</h1>
      <p className="mt-1 text-sm text-base-content/70">
        {isSignUp ? "বাজার দরে যোগ দিতে তথ্য দিন।" : "আপনার অ্যাকাউন্টে প্রবেশ করুন।"}
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
        {isSignUp ? (
          <label className="form-control block">
            <span className="mb-1 block text-sm font-medium">নাম</span>
            <input
              type="text"
              value={form.name}
              onChange={update("name")}
              placeholder="আপনার নাম"
              autoComplete="name"
              className="input input-bordered w-full"
            />
          </label>
        ) : null}
        <label className="form-control block">
          <span className="mb-1 block text-sm font-medium">ইমেইল</span>
          <input
            type="email"
            value={form.email}
            onChange={update("email")}
            placeholder="you@example.com"
            autoComplete="email"
            className="input input-bordered w-full"
          />
        </label>
        <label className="form-control block">
          <span className="mb-1 block text-sm font-medium">পাসওয়ার্ড</span>
          <input
            type="password"
            value={form.password}
            onChange={update("password")}
            placeholder="কমপক্ষে ৬ অক্ষর"
            autoComplete={isSignUp ? "new-password" : "current-password"}
            className="input input-bordered w-full"
          />
        </label>

        {error ? (
          <div role="alert" className="alert alert-error alert-soft py-2 text-sm">
            {error}
          </div>
        ) : null}

        <button type="submit" disabled={loading} className="btn btn-primary w-full">
          {loading ? <span className="loading loading-spinner loading-sm" /> : null}
          {isSignUp ? "রেজিস্টার করুন" : "সাইন ইন"}
        </button>
      </form>

      <div className="divider my-6 text-xs">অথবা</div>
      <SocialButtons callbackURL="/" />

      <p className="mt-6 text-center text-sm">
        {isSignUp ? (
          <>
            আগে থেকেই অ্যাকাউন্ট আছে?{" "}
            <Link href="/signin" className="font-semibold text-primary hover:underline">
              সাইন ইন
            </Link>
          </>
        ) : (
          <>
            নতুন ব্যবহারকারী?{" "}
            <Link href="/signup" className="font-semibold text-primary hover:underline">
              সাইন আপ
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
