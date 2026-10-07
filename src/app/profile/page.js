import Link from "next/link";
import { requireSession } from "@/lib/session";

export const metadata = { title: "আমার প্রোফাইল — বাজার দর" };

export default async function ProfilePage() {
  const { user } = await requireSession("/profile");

  return (
    <div className="mx-auto w-full max-w-lg rounded-box border border-base-300 bg-base-100 p-6 text-center shadow-sm sm:p-8">
      <div className="avatar avatar-placeholder">
        <div className="w-20 rounded-full bg-primary text-3xl text-primary-content">
          {user.image ? <img src={user.image} alt="" /> : <span>{(user.name || "U").charAt(0).toUpperCase()}</span>}
        </div>
      </div>
      <h1 className="mt-4 text-2xl font-bold">{user.name}</h1>
      <p className="text-base-content/70">{user.email}</p>
      <Link href="/profile/update" className="btn btn-primary mt-6">
        তথ্য আপডেট করুন
      </Link>
    </div>
  );
}
