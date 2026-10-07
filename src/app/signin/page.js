import AuthForm from "@/components/AuthForm";

export const metadata = { title: "সাইন ইন — বাজার দর" };

export default async function SignInPage({ searchParams }) {
  const params = await searchParams;
  const redirectTo = typeof params.redirect === "string" && params.redirect.startsWith("/") && !params.redirect.startsWith("//") ? params.redirect : "/";
  const reason = typeof params.reason === "string" ? params.reason : "";
  return <AuthForm mode="signin" redirectTo={redirectTo} reason={reason} />;
}
