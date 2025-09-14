export default function MediaLogos() {
  const mediaOutlets = [
    { name: "TechCrunch", style: "font-bold text-2xl" },
    { name: "Product Hunt", style: "font-bold text-2xl" },
    { name: "Hacker News", style: "font-mono text-xl" },
    { name: "The Verge", style: "font-bold text-2xl italic" },
    { name: "Wired", style: "font-bold text-2xl tracking-wider" },
    { name: "Forbes", style: "font-serif text-2xl" }
  ];

  return (
    <div className="py-8">
      <div className="text-center mb-6">
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Featured In
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
        {mediaOutlets.map((outlet, index) => (
          <div
            key={index}
            className="opacity-40 hover:opacity-70 transition-opacity duration-300 grayscale hover:grayscale-0"
          >
            <span className={`${outlet.style} text-slate-600 dark:text-slate-400`}>
              {outlet.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}