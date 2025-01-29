import Hero from "@/ui/sections/Hero";
import Services from "@/ui/sections/Services";

function Home() {
  return (
    <main className="relative font-[family-name:var(--font-league-spartan)]">
      <div className="h-screen">
        <Hero />
      </div>
      <div className="relative">
        <Services />
      </div>
    </main>
  );
}
export default Home;