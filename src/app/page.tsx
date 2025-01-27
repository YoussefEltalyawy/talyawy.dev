import Hero from "@/ui/sections/Hero";
import Services from "@/ui/sections/Services";

function Home() {
  return (
    <main className="relative font-[family-name:var(--font-league-spartan)]">
      <div className="relative" style={{ zIndex: 1 }}>
        <Hero />
      </div>
      <div className="relative" style={{ height: "200vh" }}>
        <Services />
      </div>
      <h1>hi</h1>
    </main>
  );
}
export default Home;