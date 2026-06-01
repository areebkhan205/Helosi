import { ArrowRight, Check } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { useTypewriter } from "./hooks/useTypewriter";

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const servicesList = ["Hydration", "Brightening", "Sensitivities", "Anti-Aging"];
  const videoRef = useRef(null);

  const handleToggleService = (service) => {
    setSelectedServices(prev =>
      prev.includes(service)
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let prevX = null;
    let targetTime = 0;
    let isSeeking = false;
    let pendingTime = null;

    const handleMouseMove = (e) => {
      if (window.innerWidth < 1024) { prevX = null; return; }
      const currentX = e.clientX;
      if (prevX === null) { prevX = currentX; return; }
      const delta = currentX - prevX;
      prevX = currentX;
      if (!video.duration || isNaN(video.duration)) return;
      const offset = (delta / window.innerWidth) * 0.8 * video.duration;
      targetTime = Math.max(0, Math.min(video.duration, targetTime + offset));
      if (!isSeeking) {
        isSeeking = true;
        video.currentTime = targetTime;
      } else {
        pendingTime = targetTime;
      }
    };

    const handleSeeked = () => {
      isSeeking = false;
      if (pendingTime !== null) {
        const nextTime = pendingTime;
        pendingTime = null;
        isSeeking = true;
        video.currentTime = nextTime;
      }
    };

    const handleLoadedMetadata = () => { targetTime = video.currentTime; };

    window.addEventListener('mousemove', handleMouseMove);
    video.addEventListener('seeked', handleSeeked);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    if (video.readyState >= 1) targetTime = video.currentTime;

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (video) {
        video.removeEventListener('seeked', handleSeeked);
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      }
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleVideoAutoplay = () => {
      if (window.innerWidth < 1024) {
        video.autoplay = true;
        video.currentTime = video.currentTime || 0;
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => console.log('Mobile video autoplay triggered asynchronously', err));
        }
      } else {
        video.pause();
      }
    };

    handleVideoAutoplay();
    window.addEventListener('resize', handleVideoAutoplay);
    return () => window.removeEventListener('resize', handleVideoAutoplay);
  }, []);

  const { displayed, done } = useTypewriter("custom formulations\nfor your unique skin.", 38, 600);

  return (
    <div className="relative bg-white text-neutral-900 font-sans selection:bg-[#EAECE9] selection:text-[#1C2E1E] antialiased overflow-x-hidden flex flex-col lg:block lg:min-h-screen">

      {/* Background Video */}
      <div className="order-last lg:order-none relative lg:absolute lg:inset-0 lg:z-0 overflow-hidden pointer-events-none w-full aspect-square md:aspect-video lg:aspect-auto lg:h-full bg-neutral-50 lg:bg-transparent">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          loop
          poster="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1024"
          className="w-full h-full object-cover object-right lg:object-right-bottom"
        >
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260601_110537_3a579fa0-7bbc-4d94-9d25-0e816c7840f5.mp4" type="video/mp4" />
          Your browser does not support HTML5 video playing.
        </video>
        <div className="absolute inset-0 video-overlay pointer-events-none" />
      </div>

      {/* Navbar */}
      <header className="fixed top-0 inset-x-0 z-50 px-5 sm:px-8 py-4 sm:py-5 lg:px-12 lg:py-6 flex flex-row justify-between items-center bg-transparent">
        <div className="flex flex-row items-center gap-3">
          <span className="text-[22px] sm:text-[28px] tracking-tight text-black font-serif italic select-none">Helioski&reg;</span>
          <span className="text-[25px] sm:text-[30px] text-black select-none tracking-[-0.02em] font-medium leading-none mb-1">&#10033;</span>
        </div>
        <nav className="hidden md:flex flex-row items-center text-[22px] text-black font-normal font-sans">
          <a href="#home" className="hover:opacity-60 transition-opacity">Home</a>
          <span className="opacity-40 select-none">&nbsp;,&nbsp;</span>
          <a href="#ai" className="hover:opacity-60 transition-opacity">AI</a>
          <span className="opacity-40 select-none">&nbsp;,&nbsp;</span>
          <a href="#contact" className="hover:opacity-60 transition-opacity">Contact</a>
          <span className="opacity-40 select-none">&nbsp;,&nbsp;</span>
          <a href="#guide" className="hover:opacity-60 transition-opacity">Guide</a>
        </nav>
        <div className="hidden sm:block">
          <a href="#contact" className="text-[20px] text-black underline underline-offset-4 hover:opacity-60 transition-opacity font-normal font-sans">Get in touch</a>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation menu"
          className="md:hidden z-50 flex flex-col justify-center items-center gap-[5px] w-8 h-8 focus:outline-none"
        >
          <span className={`w-6 h-[2px] bg-black transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`w-6 h-[2px] bg-black transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
          <span className={`w-6 h-[2px] bg-black transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`md:hidden fixed inset-0 z-45 bg-white transition-all duration-500 flex flex-col justify-between p-8 pt-28 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col gap-6 text-3xl font-medium tracking-tight text-neutral-900 font-sans">
          {["Home", "AI", "Contact", "Guide"].map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setIsMobileMenuOpen(false)} className="hover:text-emerald-700 transition-colors">{link}</a>
          ))}
          <div className="h-[1px] bg-neutral-150 my-2" />
          <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl underline underline-offset-4 hover:text-emerald-700 transition-colors font-serif italic">Get in touch</a>
        </div>
        <div className="text-neutral-400 text-sm font-sans">&copy; {new Date().getFullYear()} Helioski. All rights reserved.</div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col order-first lg:order-none w-full bg-white lg:bg-transparent pb-8 lg:pb-0 lg:min-h-screen">
        <main id="spade-hero" className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-12 pt-32 sm:pt-40 lg:pt-36 flex-1 flex flex-col justify-center gap-8">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-4xl">
              <h1 className="text-5xl md:text-6xl lg:text-[76px] font-serif font-light tracking-tight text-black leading-[1.08] mb-6 select-none w-full whitespace-pre-wrap italic">
                {displayed}
                {!done && <span className="inline-block w-[3px] h-[0.9em] bg-black align-middle ml-2 animate-blink" />}
              </h1>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="max-w-xl animate-fade">
              <p className="text-lg md:text-xl text-[#5A635A] leading-relaxed font-normal mb-12 font-sans">
                Whether you seek deep hydration, fine line reduction, or barrier support, our bespoke apothecary guides your natural glow.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="space-y-6">
              <div>
                <h2 className="text-2xl font-serif italic font-medium tracking-tight mb-1 text-black">What are your main skin concerns?</h2>
                <p className="text-[#738273] opacity-85 text-sm font-sans">Select all that apply</p>
              </div>
              <div className="flex flex-wrap gap-3">
                {servicesList.map((service) => {
                  const isSelected = selectedServices.includes(service);
                  return (
                    <motion.button
                      key={service}
                      onClick={() => handleToggleService(service)}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-sans font-medium transition-all cursor-pointer ${isSelected ? "bg-[#1C2E1E] text-white shadow-md shadow-emerald-900/10" : "bg-white text-[#1C2E1E] border border-[#F1F3F1] hover:bg-[#F1F3F1]/55"}`}
                    >
                      <AnimatePresence initial={false} mode="wait">
                        {isSelected && (
                          <motion.span initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </motion.span>
                        )}
                      </AnimatePresence>
                      <span>{service}</span>
                    </motion.button>
                  );
                })}
              </div>

              <div className="min-h-[80px] mt-8">
                <AnimatePresence mode="wait">
                  {selectedServices.length === 0 ? (
                    <motion.div key="empty-state" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 0.5, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="italic text-xs text-[#5A635A] font-sans">
                      Please select your skin concerns above to begin formulation.
                    </motion.div>
                  ) : (
                    <motion.div key="active-state" initial={{ opacity: 0, height: 0, y: 5 }} animate={{ opacity: 1, height: "auto", y: 0 }} exit={{ opacity: 0, height: 0, y: -5 }} transition={{ type: "spring", stiffness: 200, damping: 25 }} className="overflow-hidden">
                      <div className="flex items-center justify-between p-4 bg-[#FAFBF9] border border-[#F1F3F1] rounded-2xl max-w-lg">
                        <div className="flex flex-col font-sans">
                          <span className="text-[#738273] text-[10px] uppercase tracking-wider font-bold mb-1">Ready to formulate for:</span>
                          <span className="text-sm text-[#1C2E1E] font-semibold">{selectedServices.join(", ")}</span>
                        </div>
                        <motion.button whileHover={{ x: 4 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2 text-[#4D6D47] font-bold text-xs uppercase tracking-widest transition-transform cursor-pointer font-sans">
                          Craft My Solution <ArrowRight className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </main>
      </div>

      {/* Page indicator */}
      <div className="absolute bottom-8 right-8 z-20">
        <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center bg-white/90">
          <span className="text-xs font-bold font-sans text-neutral-800">01</span>
        </div>
      </div>
    </div>
  );
}