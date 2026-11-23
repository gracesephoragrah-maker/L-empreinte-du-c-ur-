import {TopNav} from './components/TopNav';
import {HeroSection} from './components/HeroSection';
import {ParticipationSection} from './components/ParticipationSection';
import {DonationSection} from './components/DonationSection';
import {NeedsChecklistSection} from './components/NeedsChecklistSection';
import {Footer} from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF4] text-[#2B2118]">
      <TopNav />
      <main className="flex-1">
        <HeroSection />
        <ParticipationSection />
        <DonationSection />
        <NeedsChecklistSection />
      </main>
      <Footer />
    </div>
  );
}
