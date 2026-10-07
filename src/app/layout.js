import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import Ticker from "@/components/Ticker";
import { getCategories, getProducts } from "@/lib/api";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে",
  description: "চাল, ডাল, সবজি, মাছ ও মাংসসহ প্রয়োজনীয় পণ্যের আজকের বাজার দর।",
};

export default async function RootLayout({ children }) {
  const [categories, { products }] = await Promise.all([getCategories(), getProducts()]);

  return (
    <html lang="bn" data-theme="bazar">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <Providers>
          <Navbar categories={categories} />
          <Ticker products={products} />
          <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
