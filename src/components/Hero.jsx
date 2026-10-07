export default function Hero() {
  return (
    <section className="grid items-center gap-8 rounded-box bg-base-100 p-6 shadow-sm md:grid-cols-2 md:p-10">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">আজকের বাজার দর</p>
        <h1 className="mt-2 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
          প্রয়োজনীয় পণ্যের দাম <span className="text-primary">এক নজরে</span>
        </h1>
        <p className="mt-4 max-w-md text-base-content/70">
          চাল, ডাল, সবজি, মাছ ও মাংসসহ নিত্যপ্রয়োজনীয় পণ্যের আজকের দাম এবং দামের উঠানামা দেখুন এক জায়গায়।
        </p>
        <a href="#সব-পণ্য" className="btn btn-primary mt-6 btn-sm sm:btn-md">
          সব পণ্য দেখুন
        </a>
      </div>
      <div className="flex justify-center md:justify-end">
        <img src="/bazar-hero.png" alt="বাজারের পণ্যের ঝুড়ি" width={315} height={263} className="h-auto w-full max-w-xs md:max-w-sm" />
      </div>
    </section>
  );
}
