"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { bnDate } from "@/lib/format";

export default function Navbar({ categories }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(bnDate());
  }, []);

  async function handleSignOut() {
    const { error } = await authClient.signOut();
    if (error) {
      toast.error("সাইন আউট করা যায়নি, আবার চেষ্টা করুন");
      return;
    }
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  }

  const user = session?.user;
  const linkClass = (active) =>
    `whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition ${
      active ? "bg-primary text-primary-content shadow-sm" : "text-base-content/80 hover:bg-base-200"
    }`;

  return (
    <header className="border-b border-base-300 bg-base-100">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex flex-col leading-tight">
          <span className="text-xl font-bold text-primary sm:text-2xl">🛒 বাজার দর</span>
          <span className="min-h-4 text-xs text-base-content/60">{date}</span>
        </Link>

        <div className="flex items-center gap-2">
          {isPending ? (
            <div className="skeleton h-9 w-28 rounded-full" />
          ) : user ? (
            <div className="dropdown dropdown-end">
              <button tabIndex={0} className="btn btn-ghost btn-sm gap-2 rounded-full sm:btn-md">
                <span className="avatar avatar-placeholder">
                  <span className="w-8 rounded-full bg-primary text-primary-content">
                    {user.image ? <img src={user.image} alt="" /> : <span>{(user.name || "U").charAt(0).toUpperCase()}</span>}
                  </span>
                </span>
                <span className="hidden max-w-28 truncate sm:inline">{user.name}</span>
              </button>
              <ul tabIndex={0} className="menu dropdown-content z-30 mt-2 w-48 rounded-box border border-base-300 bg-base-100 p-2 shadow-lg">
                <li>
                  <Link href="/profile">আমার প্রোফাইল</Link>
                </li>
                <li>
                  <button onClick={handleSignOut}>সাইন আউট</button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link href="/signin" className="btn btn-outline btn-primary btn-sm sm:btn-md">
                সাইন ইন
              </Link>
              <Link href="/signup" className="btn btn-primary btn-sm sm:btn-md">
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      </div>

      <nav className="border-t border-base-200" aria-label="পণ্যের বিভাগ">
        <div className="no-scrollbar mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-2">
          <Link href="/" className={linkClass(pathname === "/")}>
            সব পণ্য
          </Link>
          {categories.map((c) => (
            <Link key={c.slug} href={`/category/${c.slug}`} className={linkClass(pathname === `/category/${c.slug}`)}>
              {c.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
