import Hero from "@/ui/sections/Hero";
import Services from "@/ui/sections/Services";

function Home() {
  return (
    <main className="relative font-[family-name:var(--font-league-spartan)]">
      <div className="h-[100vh] sticky top-0" style={{ zIndex: 1 }}>
        <Hero />
      </div>
      <div className="h-[100vh] -mt-screen">
        <Services />
      </div>
    </main>
  );
}
export default Home;