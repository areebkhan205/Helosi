import { Activity, Bell, Camera, Check, Droplets, Leaf, Plus, Send, Sparkles, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

// --- API Configuration ---
const apiKey = import.meta.env.VITE_API_KEY;
// --- Helper: Exponential Backoff for API Calls ---
async function fetchWithRetry(url, options, retries = 5) {
  const delays = [1000, 2000, 4000, 8000, 16000];
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, delays[i]));
    }
  }
}

export default function skinai() {
  const [activeTab, setActiveTab] = useState('scan');
  const [scanResult, setScanResult] = useState(null);

  return (
    <div className="relative bg-[#FAFBF9] text-neutral-900 font-sans selection:bg-[#EAECE9] selection:text-[#1C2E1E] antialiased min-h-screen flex flex-col overflow-hidden">
      
      {/* Abstract Background Elements for Luxury Feel */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#E8EFE9] rounded-full blur-[120px] pointer-events-none opacity-60"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-[#E2EBE4] rounded-full blur-[100px] pointer-events-none opacity-60"></div>

      {/* Navbar */}
      <header className="fixed top-0 inset-x-0 z-50 px-6 sm:px-10 py-5 flex flex-row justify-between items-center bg-white/60 backdrop-blur-xl border-b border-white/40 shadow-[0_4px_30px_rgba(0,0,0,0.02)] transition-all">
        <div className="flex flex-row items-center gap-3">
          <span className="text-[24px] sm:text-[28px] tracking-tight text-[#1C2E1E] font-serif italic select-none">Helioski&reg;</span>
          <span className="text-[26px] sm:text-[30px] text-[#4D6D47] select-none tracking-[-0.02em] font-medium leading-none mb-1">&#10033;</span>
        </div>
        <nav className="hidden md:flex flex-row items-center bg-white/80 p-1.5 rounded-full border border-white/60 shadow-sm">
          <TabButton active={activeTab === 'scan'} onClick={() => setActiveTab('scan')} icon={<Camera className="w-4 h-4" />} label="Analysis" />
          <TabButton active={activeTab === 'chat'} onClick={() => setActiveTab('chat')} icon={<Sparkles className="w-4 h-4" />} label="Consultation" />
          <TabButton active={activeTab === 'reminders'} onClick={() => setActiveTab('reminders')} icon={<Bell className="w-4 h-4" />} label="Rituals" />
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 pt-24 lg:pt-32 px-4 sm:px-8 lg:px-12 max-w-[1400px] mx-auto w-full flex flex-col md:flex-row gap-6 lg:gap-8 pb-8">
        
        {/* Left Column: Scanner */}
        <div className={`w-full md:w-5/12 lg:w-1/2 flex flex-col gap-6 ${activeTab !== 'scan' ? 'hidden md:flex' : 'flex'}`}>
          <div className="flex flex-col gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-900/5 text-emerald-800 text-xs font-semibold uppercase tracking-widest w-max border border-emerald-900/10">
              <Activity className="w-3 h-3" /> Step 1: AI Vision
            </div>
            <h1 className="text-4xl lg:text-[54px] leading-tight font-serif font-light tracking-tight text-[#1C2E1E] italic">
              Discover your skin's <br className="hidden lg:block"/>true nature.
            </h1>
            <p className="text-[#5A635A] font-sans text-lg max-w-md leading-relaxed">
              Allow our vision model to map your skin profile, instantly drafting a bespoke botanical regimen.
            </p>
          </div>
          
          <div className="flex-1 min-h-[400px] relative">
             <Scanner onScanComplete={(res) => { setScanResult(res); setActiveTab('chat'); }} />
          </div>
        </div>

        {/* Right Column: Chat or Reminders */}
        <div className={`w-full md:w-7/12 lg:w-1/2 flex flex-col flex-1 min-h-[600px] md:min-h-[500px] ${activeTab === 'scan' ? 'hidden md:flex' : 'flex'}`}>
          
          {/* Mobile Tabs */}
          <div className="md:hidden flex p-1.5 bg-white/80 backdrop-blur-md rounded-2xl border border-white/60 mb-4 shadow-sm">
            <TabButton active={activeTab === 'chat'} onClick={() => setActiveTab('chat')} icon={<Sparkles className="w-4 h-4" />} label="Consultation" />
            <TabButton active={activeTab === 'reminders'} onClick={() => setActiveTab('reminders')} icon={<Bell className="w-4 h-4" />} label="Rituals" />
          </div>

          <div className="flex-1 bg-white/80 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[32px] overflow-hidden flex flex-col relative min-h-0">
            {(activeTab === 'chat' || (activeTab === 'scan' && window.innerWidth >= 768)) && (
              <ChatInterface scanResult={scanResult} />
            )}
            {activeTab === 'reminders' && (
              <RemindersView />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }) {
  return (
    <button 
      onClick={onClick} 
      className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ease-out flex-1 md:flex-none ${
        active 
        ? 'bg-[#1C2E1E] text-white shadow-md transform scale-100' 
        : 'text-[#738273] hover:text-[#1C2E1E] hover:bg-black/5 transform scale-95'
      }`}
    >
      {icon} {label}
    </button>
  );
}

// --- Scanner Component with Real AI Vision ---
function Scanner({ onScanComplete }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isScanning, setIsScanning] = useState(false);
  const [streamActive, setStreamActive] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setStreamActive(true);
        setErrorMsg("");
      }
    } catch (err) {
      console.error("Camera access denied or unavailable", err);
      setErrorMsg("Camera access is required for analysis.");
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
  };

  const captureAndAnalyze = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    setIsScanning(true);
    
    // 1. Capture Frame to Canvas
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // 2. Extract Base64 Image
    const base64Data = canvas.toDataURL('image/jpeg', 0.8).split(',')[1];

    // 3. Send to Gemini Vision Model
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
      const payload = {
        contents: [{
          role: "user",
          parts: [
            { text: "Analyze this face for skin health as a high-end botanical apothecary. Identify 2-3 main visual concerns (e.g., texture, redness, dullness). Output ONLY a raw JSON object matching this schema: {\"concerns\": [\"string\"], \"hydrationLevel\": \"string percentage\", \"recommended\": [\"string botanical ingredient\"]} Do not include markdown formatting or backticks." },
            { inlineData: { mimeType: "image/jpeg", data: base64Data } }
          ]
        }]
      };

      const result = await fetchWithRetry(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      let rawText = result.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
      
      // Clean up markdown if the model hallucinates it despite instructions
      rawText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
      
      const parsedResult = JSON.parse(rawText);
      
      // Validate schema minimally
      if (!parsedResult.concerns) parsedResult.concerns = ["General Balancing"];
      if (!parsedResult.hydrationLevel) parsedResult.hydrationLevel = "Unknown";
      if (!parsedResult.recommended) parsedResult.recommended = ["Aloe Vera", "Rose Water"];

      onScanComplete(parsedResult);
    } catch (error) {
      console.error("AI Analysis failed:", error);
      // Fallback if API fails
      onScanComplete({
        concerns: ["Environmental Stress", "Mild Dehydration"],
        hydrationLevel: "Sub-optimal",
        recommended: ["Green Tea Extract", "Jojoba Oil"]
      });
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full relative group">
      <div className="absolute inset-0 bg-[#E2EBE4] rounded-[32px] overflow-hidden border-2 border-white shadow-inner">
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          muted 
          className="w-full h-full object-cover transform -scale-x-100" // Mirror effect
        />
        <canvas ref={canvasRef} className="hidden" />
        
        {/* Decorative Scanner UI */}
        <div className="absolute inset-8 border border-white/30 rounded-2xl pointer-events-none transition-all duration-500">
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white rounded-tl-2xl"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white rounded-tr-2xl"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white rounded-bl-2xl"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white rounded-br-2xl"></div>
        </div>

        {/* Scanning Animation */}
        {isScanning && (
          <div className="absolute inset-0 pointer-events-none bg-[#1C2E1E]/20 backdrop-blur-[2px] transition-all">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_20px_rgba(52,211,153,1)] animate-[scan_2.5s_ease-in-out_infinite]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-[#1C2E1E]/80 text-white px-6 py-3 rounded-full backdrop-blur-md flex items-center gap-3 shadow-2xl border border-white/10">
                <Activity className="w-5 h-5 animate-pulse text-emerald-400" /> 
                <span className="font-serif italic tracking-wide text-lg">Synthesizing Profile...</span>
              </div>
            </div>
          </div>
        )}

        {!streamActive && !isScanning && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral-500 bg-[#FAFBF9] p-8 text-center font-sans gap-4">
            <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-400">
              <Camera className="w-8 h-8" />
            </div>
            <p className="text-sm">{errorMsg || "Awaiting camera initialization..."}</p>
            {errorMsg && (
              <button onClick={startCamera} className="px-6 py-2 bg-[#1C2E1E] text-white rounded-full text-sm">Retry Access</button>
            )}
          </div>
        )}
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[80%] max-w-[300px]">
        <button
          onClick={captureAndAnalyze}
          disabled={!streamActive || isScanning}
          className={`w-full py-4 rounded-full font-medium tracking-wide transition-all duration-300 ease-out flex items-center justify-center gap-2 ${
            isScanning || !streamActive
            ? 'bg-white/50 text-[#738273] backdrop-blur-md cursor-not-allowed border border-white' 
            : 'bg-[#1C2E1E] text-white hover:bg-black hover:shadow-xl hover:-translate-y-1'
          }`}
        >
          {isScanning ? 'Processing...' : <><Camera className="w-4 h-4"/> Initiate Scan</>}
        </button>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}} />
    </div>
  );
}

// --- Chat Component ---
function ChatInterface({ scanResult }) {
  const [messages, setMessages] = useState([
    { role: 'model', text: 'Welcome to the Helioski Apothecary. I am your personal AI formulator. Shall we begin with a scan, or do you have a specific skin concern today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const initializedContext = useRef(false);

  // Trigger initial AI message when scan completes
  useEffect(() => {
    if (scanResult && !initializedContext.current) {
      initializedContext.current = true;
      const contextMsg = `My face scan results indicate: Concerns - ${scanResult.concerns.join(", ")}. Hydration - ${scanResult.hydrationLevel}. Suggested Botanicals - ${scanResult.recommended.join(", ")}. Please recommend a specific daily ritual based on this data.`;
      
      // We add a visual "Card" message to the UI to show the user the scan data elegantly
      setMessages(prev => [
        ...prev, 
        { role: 'system_scan', data: scanResult },
        { role: 'user', text: "Please recommend a ritual based on these insights." }
      ]);
      
      triggerAIResponse(contextMsg);
    }
  }, [scanResult]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const triggerAIResponse = async (userPrompt) => {
    setIsTyping(true);
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
      
      // Filter out system UI messages for the API call
      const chatHistory = messages
        .filter(m => m.role === 'model' || m.role === 'user')
        .map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        }));
      
      chatHistory.push({ role: 'user', parts: [{ text: userPrompt }] });

      const payload = {
        contents: chatHistory,
        systemInstruction: {
          parts: [{ text: "You are Helioski, an elegant, luxury AI skincare apothecary. Speak in a soothing, sophisticated, and slightly poetic tone. Focus heavily on natural remedies, botanical ingredients, and holistic skin health. Recommend simple, natural DIY remedies. Keep responses concise (2-3 paragraphs max). Format with clear line breaks. Do not use Markdown asterisks for bolding; use HTML <strong> tags if you must emphasize." }]
        }
      };

      const result = await fetchWithRetry(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const aiResponse = result.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, the connection to our formulation room seems disrupted.";
      
      setMessages(prev => [...prev, { role: 'model', text: aiResponse }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "I apologize, but I am unable to craft a formulation at this moment. Please check your connection and try again." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userText = input;
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setInput('');
    triggerAIResponse(userText);
  };

  return (
    <div className="flex flex-col flex-1 bg-transparent overflow-hidden h-full">
      {/* Chat Header */}
      <div className="px-6 py-5 lg:px-8 lg:py-6 border-b border-[#F1F3F1]/60 bg-white/40 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-[#1C2E1E] flex items-center justify-center text-white shadow-sm shrink-0">
            <Leaf className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-serif italic text-2xl text-[#1C2E1E] leading-none">Apothecary AI</h2>
            <p className="text-sm text-[#738273] mt-1">Bespoke guidance for your skin</p>
          </div>
        </div>
      </div>
      
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-6 lg:space-y-8">
        {messages.map((msg, idx) => {
          if (msg.role === 'system_scan') {
            return (
              <div key={idx} className="w-full flex justify-center my-6">
                <div className="bg-white/60 backdrop-blur-sm border border-emerald-900/10 rounded-2xl p-6 shadow-sm max-w-sm w-full">
                  <div className="flex items-center gap-2 text-emerald-800 font-semibold mb-4 text-sm uppercase tracking-widest">
                    <Check className="w-4 h-4" /> Profile Generated
                  </div>
                  <div className="space-y-4">
                    <div>
                      <span className="text-[10px] uppercase text-neutral-400 font-bold tracking-wider">Hydration Level</span>
                      <p className="text-lg font-serif italic text-neutral-900">{msg.data.hydrationLevel}</p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-neutral-400 font-bold tracking-wider">Primary Concerns</span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {msg.data.concerns.map((c, i) => (
                          <span key={i} className="px-2.5 py-1 bg-[#1C2E1E]/5 text-[#1C2E1E] text-xs rounded-md">{c}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-neutral-400 font-bold tracking-wider">Botanical Matches</span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {msg.data.recommended.map((c, i) => (
                          <span key={i} className="px-2.5 py-1 bg-[#4D6D47]/10 text-[#4D6D47] text-xs font-medium rounded-md">{c}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          const isUser = msg.role === 'user';
          return (
            <div key={idx} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
              <div className={`max-w-[85%] p-5 rounded-3xl text-[15px] leading-relaxed shadow-sm ${
                isUser 
                  ? 'bg-[#1C2E1E] text-white rounded-br-sm' 
                  : 'bg-white border border-[#F1F3F1] text-neutral-800 rounded-bl-sm'
              }`}>
                {isUser ? msg.text : <div dangerouslySetInnerHTML={{__html: msg.text.replace(/\n/g, '<br/>')}} />}
              </div>
            </div>
          );
        })}
        
        {isTyping && (
          <div className="flex items-start">
             <div className="bg-white border border-[#F1F3F1] rounded-3xl rounded-bl-sm p-5 shadow-sm flex gap-1.5 items-center h-[52px]">
              <span className="w-2 h-2 bg-neutral-300 rounded-full animate-[bounce_1.4s_infinite_ease-in-out_both] delay-0"/>
              <span className="w-2 h-2 bg-neutral-300 rounded-full animate-[bounce_1.4s_infinite_ease-in-out_both] delay-[0.2s]"/>
              <span className="w-2 h-2 bg-neutral-300 rounded-full animate-[bounce_1.4s_infinite_ease-in-out_both] delay-[0.4s]"/>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} className="h-4 shrink-0" />
      </div>

      {/* Input Area */}
      <div className="p-4 lg:p-6 bg-white/60 border-t border-[#F1F3F1]/60 shrink-0">
        <div className="relative flex items-center bg-white border border-neutral-200 rounded-full p-1.5 shadow-sm focus-within:border-emerald-600/30 focus-within:ring-4 focus-within:ring-emerald-900/5 transition-all">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about ingredients, routines, or remedies..."
            className="w-full bg-transparent py-3 pl-5 pr-12 text-[15px] text-neutral-800 focus:outline-none placeholder-neutral-400"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="w-10 h-10 shrink-0 bg-[#1C2E1E] text-white rounded-full flex items-center justify-center hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4 ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Reminders Component ---
function RemindersView() {
  const [reminders, setReminders] = useState([
    { id: 1, text: "Apply Aloe & Manuka Honey Mask", time: "18:00", active: true, frequency: "Mon, Wed, Fri", icon: <Leaf className="w-4 h-4" /> },
    { id: 2, text: "Drink 2L Mineral Water", time: "09:00", active: true, frequency: "Daily", icon: <Droplets className="w-4 h-4" /> },
    { id: 3, text: "Rosehip Oil Lymphatic Massage", time: "21:30", active: false, frequency: "Daily", icon: <Sparkles className="w-4 h-4" /> }
  ]);
  const [newText, setNewText] = useState("");
  const [newTime, setNewTime] = useState("");

  const toggleReminder = (id) => {
    setReminders(reminders.map(r => r.id === id ? { ...r, active: !r.active } : r));
  };

  const addReminder = () => {
    if (!newText || !newTime) return;
    setReminders([...reminders, { id: Date.now(), text: newText, time: newTime, active: true, frequency: "Daily", icon: <Bell className="w-4 h-4" /> }]);
    setNewText("");
    setNewTime("");
  };

  const deleteReminder = (id) => {
    setReminders(reminders.filter(r => r.id !== id));
  };

  return (
    <div className="flex flex-col flex-1 bg-transparent overflow-hidden h-full">
      {/* Header */}
      <div className="px-6 py-5 lg:px-8 lg:py-6 border-b border-[#F1F3F1]/60 bg-white/40 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-[#FAFBF9] border border-neutral-200 flex items-center justify-center text-[#4D6D47] shadow-sm shrink-0">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-serif italic text-2xl text-[#1C2E1E] leading-none">Ritual Reminders</h2>
            <p className="text-sm text-[#738273] mt-1">Cultivate your botanical consistency</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-4">
        
        {reminders.map(reminder => (
          <div key={reminder.id} className={`group relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl border transition-all duration-300 ${reminder.active ? 'bg-white border-[#F1F3F1] shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transform hover:-translate-y-0.5' : 'bg-neutral-50/50 border-neutral-100 opacity-60'}`}>
            <div className="flex items-start sm:items-center gap-4">
              <button 
                onClick={() => toggleReminder(reminder.id)}
                className={`w-7 h-7 rounded-full flex items-center justify-center border transition-all duration-300 shadow-sm shrink-0 ${reminder.active ? 'bg-emerald-800 border-emerald-800 text-white scale-100' : 'bg-white border-neutral-300 text-transparent scale-95'}`}
              >
                <Check className="w-3.5 h-3.5" />
              </button>
              <div className="flex flex-col gap-1 mt-0.5 sm:mt-0">
                <span className={`text-[15px] sm:text-[16px] font-medium transition-colors leading-tight ${reminder.active ? 'text-neutral-900' : 'text-neutral-500 line-through'}`}>{reminder.text}</span>
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#738273] font-medium mt-1 sm:mt-0">
                  <span className="bg-[#FAFBF9] border border-neutral-100 px-2 py-0.5 rounded-md flex items-center gap-1 shrink-0">
                    {reminder.icon} {reminder.time}
                  </span>
                  <span className="hidden sm:inline">&bull;</span>
                  <span className="shrink-0">{reminder.frequency}</span>
                </div>
              </div>
            </div>
            <button onClick={() => deleteReminder(reminder.id)} className="absolute top-4 right-4 sm:relative sm:top-auto sm:right-auto w-8 h-8 rounded-full flex items-center justify-center text-neutral-300 hover:bg-red-50 hover:text-red-500 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-all shrink-0">
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}

        {/* Add New Box */}
        <div className="mt-8 lg:mt-10 bg-gradient-to-br from-emerald-50/50 to-white border border-emerald-100 rounded-3xl p-5 lg:p-6 shadow-sm shrink-0">
          <div className="flex items-center gap-2 mb-4 text-emerald-900">
            <Plus className="w-5 h-5" />
            <h3 className="font-serif italic text-lg font-medium">Add New Ritual</h3>
          </div>
          <div className="flex flex-col gap-4">
            <input 
              type="text" 
              placeholder="e.g., Cold Compress, Chamomile Steam..."
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              className="w-full bg-white border border-emerald-200/60 rounded-xl py-3 px-4 text-[14px] lg:text-[15px] focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all shadow-sm placeholder-emerald-900/30"
            />
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="time" 
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="w-full sm:flex-1 bg-white border border-emerald-200/60 rounded-xl py-3 px-4 text-[14px] lg:text-[15px] focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all shadow-sm text-emerald-900"
              />
              <button 
                onClick={addReminder}
                disabled={!newText || !newTime}
                className="w-full sm:w-auto px-6 py-3 bg-emerald-800 text-white text-[14px] lg:text-[15px] font-medium rounded-xl hover:bg-emerald-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md shrink-0"
              >
                Create
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}