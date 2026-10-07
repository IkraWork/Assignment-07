import UpdateProfileForm from "@/components/UpdateProfileForm";
import { requireSession } from "@/lib/session";

export const metadata = { title: "তথ্য আপডেট — বাজার দর" };

export default async function UpdateProfilePage() {
  const { user } = await requireSession("/profile/update");
  return <UpdateProfileForm initialName={user.name || ""} />;
}
