import { ArrowRight, X } from 'lucide-react';
import { useState } from 'react';

const BlogSection = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);

  // Array of articles to easily map over them
  const articles = [
    {
      id: 1,
      title: "The Ultimate Guide to a Balanced Skincare Routine",
      excerpt: "Discover the simple, essential steps for morning and evening routines. Learn how to layer products effectively for maximum results.",
      content: `Building an effective skincare routine doesn't require a 10-step process or expensive products. The secret to a glowing, resilient complexion lies in consistency and understanding your skin's fundamental needs.

Here is a simple, dermatologist-approved framework that is easy to follow:

☀️ MORNING ROUTINE (Focus: Protection)
• 1. Cleanser: Start fresh. Wash away overnight sweat and excess oil with a gentle, non-stripping gel or cream cleanser.
• 2. Antioxidant Serum: A Vitamin C serum acts as an invisible shield. It neutralizes skin-damaging free radicals from pollution and UV rays.
• 3. Moisturizer: Hydration is essential, even if you have oily skin. It locks in water and fortifies your skin barrier.
• 4. Sunscreen (SPF 30+): The absolute most critical step. Apply generously every single day to prevent premature aging and dark spots.

🌙 EVENING ROUTINE (Focus: Repair)
• 1. Double Cleanse: First, use a cleansing balm or oil to dissolve makeup and sunscreen. Follow up with your gentle water-based cleanser from the morning.
• 2. Treatment (Optional): This is the time for active ingredients. Use a retinol for anti-aging, or an exfoliating acid (AHA/BHA) to unclog pores.
• 3. Night Cream: A slightly richer moisturizer to support your skin's natural repair process while you sleep.

Remember: Whenever you introduce a new product, always patch-test it first on your jawline to ensure you don't have an adverse reaction.`,
      category: "Routines",
      date: "June 6, 2026",
      readTime: "5 min read",
      imageUrl: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Understanding & Treating Adult Acne Gently",
      excerpt: "A clear, easy-to-understand guide on the root causes of breakouts and how to heal them without destroying your moisture barrier.",
      content: `Adult acne is incredibly common, yet incredibly frustrating. When breakouts occur, our instinct is often to attack them with harsh scrubs and drying ingredients. However, modern skincare science shows that treating your skin gently yields much better, long-lasting results.

Why Does Adult Acne Happen?
• Hormonal Fluctuations: Often tied to menstrual cycles or stress hormones (cortisol).
• Compromised Skin Barrier: If your skin is stripped of its natural oils, it produces even more oil to compensate, leading to clogged pores.
• Wrong Products: Using heavy, comedogenic (pore-clogging) makeup or moisturizers.

A Gentle Approach to Healing:
• Stop Scrubbing: Physical scrubs can tear the skin and spread acne-causing bacteria. Switch to a liquid chemical exfoliant instead.
• Use Salicylic Acid (BHA): This brilliant ingredient is oil-soluble, meaning it can dive deep into your pores to dissolve the "glue" holding dead skin cells and oil together. Use it 2-3 times a week.
• Hydrate to Regulate: Stripping your skin of moisture makes acne worse. Use a lightweight, oil-free moisturizer to keep your barrier strong.
• Target Spots Carefully: Apply a spot treatment (like a pimple patch) directly on the active breakout, rather than smearing harsh treatments all over your face.
    
Patience is a virtue in skincare. It takes about 28 days for your skin cells to completely turn over, so give a new routine at least a month before deciding if it works!`,
      category: "Concerns",
      date: "May 28, 2026",
      readTime: "7 min read",
      imageUrl: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "The Brightening Power: Benefits of Vitamin C",
      excerpt: "Explore why this powerful antioxidant is a must-have for brightening dull skin, fading dark spots, and boosting collagen.",
      content: `Vitamin C is one of the most rigorously researched and proven ingredients in the skincare world. If you want a brighter, firmer, and more even complexion, this is the ingredient to reach for.

The Three Major Benefits:
1. It's a Potent Antioxidant: Throughout the day, your skin is bombarded by "free radicals" from UV rays and pollution. These cause premature aging. Vitamin C acts like a bodyguard, neutralizing these free radicals before they can cause harm.
2. Fades Dark Spots: Vitamin C actively inhibits the enzyme responsible for producing melanin. This means it helps fade existing hyperpigmentation, sun spots, and acne scars while preventing new ones from forming.
3. Boosts Collagen Production: Collagen is the protein that keeps our skin firm and bouncy. Vitamin C is an essential co-factor in collagen synthesis, helping to smooth out fine lines over time.

How to Use It Effectively:
• Timing: Apply it in the morning to take advantage of its environmental protection properties.
• Order: Apply immediately after cleansing, before your moisturizer and sunscreen.
• Storage Warning: Pure Vitamin C is notoriously unstable and sensitive to light and air. Keep your serum tightly closed and away from direct sunlight. If the serum turns dark orange or brown, it has oxidized and lost its effectiveness.`,
      category: "Ingredients",
      date: "May 15, 2026",
      readTime: "4 min read",
      imageUrl: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "Transitioning Your Skincare for Summer Weather",
      excerpt: "As temperatures rise, your skin's needs change. Learn how to swap heavy winter creams for lightweight hydration and prioritize UV defense.",
      content: `Just as you swap heavy coats for t-shirts when summer arrives, your skincare routine requires a seasonal wardrobe change. Heat and humidity drastically alter how your skin behaves.

The heavy creams that saved your skin from winter winds can trap sweat and oil during the summer, leading to congestion and breakouts. 

Key Summer Skincare Swaps:
• Lighten Up Your Hydration: Put away thick moisturizing creams. Swap them for lightweight, water-based gel moisturizers. Look for ingredients like Hyaluronic Acid or Glycerin, which pull water into the skin without adding oiliness.
• Adjust Your Cleanser: You naturally sweat more in the summer and produce more sebum. You might want to switch from a creamy, non-foaming cleanser to a gentle foaming cleanser to ensure a thorough wash—but it should never leave your skin feeling "squeaky" or tight.
• Double Down on SPF Protection: Sunscreen is non-negotiable all year round, but the UV index is significantly higher in summer. Ensure you are applying enough (two finger lengths for the face and neck) and reapplying every two hours if you are outdoors. 
• Incorporate Antioxidants: Stronger UV rays mean more free radical damage. Applying a Vitamin C serum under your sunscreen provides an extra layer of defense against sun damage.
• Keep Things Cool: For a refreshing treat on a hot day, store your hydrating toners, sheet masks, or even your gel moisturizer in the refrigerator.`,
      category: "Seasonal",
      date: "April 30, 2026",
      readTime: "6 min read",
      imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop"
    }
  ];

  return (
    <section className="w-full py-20 px-6 lg:px-16" style={{ backgroundColor: '#F5F5F3', color: '#222222' }}>
      
      {/* Custom Styles for Smooth Modal Animations */}
      <style>{`
        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalSlideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-modal-bg {
          animation: modalFadeIn 0.3s ease-out forwards;
        }
        .animate-modal-card {
          animation: modalSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-12 max-w-2xl">
          <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-6 italic" style={{ fontFamily: '"Playfair Display", serif' }}>
            Education Center
          </h2>
          <p className="text-lg font-light leading-relaxed text-gray-600" style={{ fontFamily: '"Inter", sans-serif' }}>
            Explore our expert-curated articles to understand your skin better. From building the perfect routine to understanding active ingredients, we guide your journey to a natural glow.
          </p>
        </div>

        {/* Filters/Tags */}
        <div className="flex flex-wrap gap-3 mb-12">
          {['All Articles', 'Routines', 'Ingredients', 'Concerns'].map((filter, index) => (
            <button 
              key={index}
              className={`px-5 py-2 rounded-full border border-gray-300 text-sm transition-all duration-300
                ${index === 0 ? 'bg-gray-800 text-white border-gray-800' : 'hover:border-gray-800 hover:bg-gray-800 hover:text-white bg-transparent text-gray-800'}`}
              style={{ fontFamily: '"Inter", sans-serif' }}
            >
              {filter}
            </button>
          ))}
        </div>

        {}
        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {articles.map((article) => (
            <article 
              key={article.id} 
              className="group cursor-pointer flex flex-col shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden bg-white"
              onClick={() => setSelectedArticle(article)}
            >
              <div className="h-64 w-full bg-gray-100 overflow-hidden relative">
                {}
                <img 
                  src={article.imageUrl} 
                  alt={article.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-semibold tracking-widest uppercase shadow-sm text-gray-800" style={{ fontFamily: '"Inter", sans-serif' }}>
                  {article.category}
                </div>
              </div>
              
              {/* Article Content */}
              <div className="p-8 flex flex-col flex-grow bg-white">
                {}
                <span className="text-xs text-gray-400 mb-4 block tracking-wide uppercase" style={{ fontFamily: '"Inter", sans-serif' }}>
                  {article.date} • {article.readTime}
                </span>
                
                <h3 className="text-2xl mb-4 text-gray-900 group-hover:text-gray-500 transition-colors duration-300" style={{ fontFamily: '"Playfair Display", serif' }}>
                  {article.title}
                </h3>
                
                <p className="text-gray-500 font-light text-sm leading-relaxed mb-8 flex-grow" style={{ fontFamily: '"Inter", sans-serif' }}>
                  {article.excerpt}
                </p>
                
                <button 
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click if they click the button directly
                    setSelectedArticle(article);
                  }}
                  className="inline-flex items-center text-sm font-semibold uppercase tracking-wider text-gray-900 mt-auto hover:text-gray-500 transition-colors" 
                  style={{ fontFamily: '"Inter", sans-serif' }}
                >
                  Read Article 
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-2" />
                </button>
              </div>
            </article>
          ))}
        </div>

      </div>

      {}
      {selectedArticle && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-modal-bg" 
          onClick={() => setSelectedArticle(null)}
        >
          <div 
            className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto flex flex-col animate-modal-card"
            onClick={(e) => e.stopPropagation()} // Prevent clicking inside modal from closing it
          >
            {/* Modal Header Image */}
            <div className="h-64 sm:h-80 w-full relative">
              <img 
                src={selectedArticle.imageUrl} 
                alt={selectedArticle.title} 
                className="w-full h-full object-cover"
              />
              <button 
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 bg-white/50 hover:bg-white/90 backdrop-blur-md p-2 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-900" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8 sm:p-12">
              <span className="text-xs text-gray-500 tracking-wide uppercase font-semibold block mb-2" style={{ fontFamily: '"Inter", sans-serif' }}>
                {selectedArticle.category} • {selectedArticle.date} • {selectedArticle.readTime}
              </span>
              
              <h2 className="text-3xl sm:text-4xl mb-6 text-gray-900 leading-tight" style={{ fontFamily: '"Playfair Display", serif' }}>
                {selectedArticle.title}
              </h2>
              
              <div 
                className="prose prose-gray max-w-none font-light text-gray-700 leading-relaxed whitespace-pre-wrap"
                style={{ fontFamily: '"Inter", sans-serif' }}
              >
                {selectedArticle.content}
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default BlogSection;