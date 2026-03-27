/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Play, Info, Clock, Calendar, Search, Command } from 'lucide-react';

// 5 Cinematic Movie Recommendations
const MOVIES = [
  {
    id: 1,
    title: "Interstellar",
    genre: "Sci-Fi • Adventure • Drama",
    year: "2014",
    rating: 4.9,
    duration: "2h 49m",
    poster: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?auto=format&fit=crop&q=80&w=600&h=900",
    backdrop: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=1920&h=1080",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival as Earth's resources are rapidly depleting.",
    match: "98% Match"
  },
  {
    id: 2,
    title: "Blade Runner 2049",
    genre: "Sci-Fi • Action • Mystery",
    year: "2017",
    rating: 4.8,
    duration: "2h 44m",
    poster: "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?auto=format&fit=crop&q=80&w=600&h=900",
    backdrop: "https://images.unsplash.com/photo-1515630278258-407f66498911?auto=format&fit=crop&q=80&w=1920&h=1080",
    description: "Young Blade Runner K's discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard, who's been missing for thirty years.",
    match: "95% Match"
  },
  {
    id: 3,
    title: "Dune: Part One",
    genre: "Sci-Fi • Adventure • Epic",
    year: "2021",
    rating: 4.7,
    duration: "2h 35m",
    poster: "https://images.unsplash.com/photo-1547333590-bc738324f11e?auto=format&fit=crop&q=80&w=600&h=900",
    backdrop: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&q=80&w=1920&h=1080",
    description: "Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe.",
    match: "92% Match"
  },
  {
    id: 4,
    title: "The Batman",
    genre: "Action • Crime • Drama",
    year: "2022",
    rating: 4.6,
    duration: "2h 56m",
    poster: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?auto=format&fit=crop&q=80&w=600&h=900",
    backdrop: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=1920&h=1080",
    description: "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption and question his family's involvement.",
    match: "89% Match"
  },
  {
    id: 5,
    title: "Avatar: The Way of Water",
    genre: "Sci-Fi • Action • Fantasy",
    year: "2022",
    rating: 4.5,
    duration: "3h 12m",
    poster: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=600&h=900",
    backdrop: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&q=80&w=1920&h=1080",
    description: "Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns, Jake must work with Neytiri and the army of the Na'vi race to protect their home.",
    match: "85% Match"
  }
];

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const activeMovie = MOVIES[activeIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050505] text-white overflow-hidden font-sans selection:bg-white/30">
      {/* MacBook Styled Spotlight Search */}
      <AnimatePresence>
        {isSearchOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSearchOpen(false)}
              className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed top-[15%] left-1/2 -translate-x-1/2 w-full max-w-2xl z-[101] px-4"
            >
              <div className="bg-[#1c1c1e]/90 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
                <div className="flex items-center px-4 py-4 border-b border-white/10">
                  <Search className="w-6 h-6 text-white/50 mr-3" />
                  <input
                    type="text"
                    autoFocus
                    placeholder="Search movies, genres, directors..."
                    className="flex-1 bg-transparent text-white text-xl outline-none placeholder:text-white/30"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <div className="flex items-center gap-1 px-2 py-1 rounded bg-white/10 text-white/50 text-xs font-medium border border-white/10">
                    ESC
                  </div>
                </div>
                
                {/* Mock Results Area */}
                <div className="p-2 max-h-[60vh] overflow-y-auto no-scrollbar">
                  {searchQuery ? (
                    <div className="p-8 text-center text-white/50 text-sm">
                      Searching for "{searchQuery}"...
                    </div>
                  ) : (
                    <div className="p-2">
                      <div className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-2 px-2">Quick Links</div>
                      {['Action & Adventure', 'Sci-Fi Masterpieces', 'New Releases', 'My Watchlist'].map((item) => (
                        <button key={item} className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/10 text-white/80 hover:text-white transition-colors flex items-center gap-3">
                          <Search className="w-4 h-4 text-white/40" />
                          {item}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {/* Dynamic Background Backdrop */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <img
            src={activeMovie.backdrop}
            alt={activeMovie.title}
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient Overlays for readability */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent w-full md:w-3/4" />

      {/* Main Content Container */}
      <main className="relative z-10 flex flex-col min-h-screen px-6 md:px-16 lg:px-24 pt-24 pb-12 justify-between">
        
        {/* Top Header */}
        <header className="absolute top-0 left-0 w-full p-6 md:px-16 lg:px-24 flex items-center justify-between z-20">
          <div className="text-2xl font-bold tracking-tighter flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center">
              <Play className="w-4 h-4 ml-1" fill="currentColor" />
            </div>
            CINE<span className="text-white/50">STREAM</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
            <a href="#" className="text-white hover:text-white transition-colors">Home</a>
            <a href="#" className="hover:text-white transition-colors">Movies</a>
            <a href="#" className="hover:text-white transition-colors">Series</a>
            <a href="#" className="hover:text-white transition-colors">My List</a>
          </nav>
          <div className="flex items-center gap-6">
            <div 
              onClick={() => setIsSearchOpen(true)}
              className="hidden md:flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors px-4 py-2 rounded-full cursor-pointer text-white/50 text-sm"
            >
              <Search className="w-4 h-4" />
              <span>Search...</span>
              <div className="flex items-center gap-0.5 ml-4 opacity-60">
                <Command className="w-3 h-3" />
                <span>K</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 backdrop-blur-md overflow-hidden shrink-0">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        {/* Hero Section (Active Movie Details) */}
        <div className="flex-1 flex flex-col justify-center max-w-3xl mt-12 md:mt-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2.5 py-1 rounded-md bg-green-500/20 text-green-400 text-xs font-bold tracking-wide uppercase border border-green-500/30">
                  {activeMovie.match}
                </span>
                <span className="flex items-center gap-1 text-yellow-500 text-sm font-semibold">
                  <Star className="w-4 h-4 fill-current" />
                  {activeMovie.rating}
                </span>
                <span className="text-white/50 text-sm">•</span>
                <span className="flex items-center gap-1 text-white/70 text-sm">
                  <Calendar className="w-4 h-4" />
                  {activeMovie.year}
                </span>
                <span className="text-white/50 text-sm">•</span>
                <span className="flex items-center gap-1 text-white/70 text-sm">
                  <Clock className="w-4 h-4" />
                  {activeMovie.duration}
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-4 leading-[1.1]">
                {activeMovie.title}
              </h1>
              
              <p className="text-lg md:text-xl text-white/60 font-medium mb-6">
                {activeMovie.genre}
              </p>

              <p className="text-base md:text-lg text-white/80 leading-relaxed max-w-2xl mb-10 line-clamp-3 md:line-clamp-none">
                {activeMovie.description}
              </p>

              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-white/90 transition-transform hover:scale-105 active:scale-95">
                  <Play className="w-5 h-5" fill="currentColor" />
                  Watch Now
                </button>
                <button className="flex items-center gap-2 bg-white/10 text-white border border-white/20 backdrop-blur-md px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-transform hover:scale-105 active:scale-95">
                  <Info className="w-5 h-5" />
                  More Info
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Movie Selection Carousel */}
        <div className="mt-12 relative z-20">
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
            Top Picks For You
            <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent ml-4" />
          </h3>
          
          <div className="flex gap-4 md:gap-6 overflow-x-auto pb-12 pt-6 no-scrollbar snap-x snap-mandatory">
            {MOVIES.map((movie, index) => {
              const isActive = index === activeIndex;
              return (
                <motion.div
                  key={movie.id}
                  className={`relative shrink-0 snap-start cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 ease-out origin-center
                    ${isActive ? 'w-[240px] md:w-[280px] ring-2 ring-white ring-offset-2 ring-offset-[#050505] z-10' : 'w-[160px] md:w-[200px] opacity-60 hover:opacity-100 hover:scale-[1.15] hover:z-50 hover:shadow-2xl'}`}
                  onClick={() => setActiveIndex(index)}
                  layout
                >
                  <div className="aspect-[2/3] w-full relative">
                    <img 
                      src={movie.poster} 
                      alt={movie.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    
                    {/* Number indicator */}
                    <div className="absolute -left-4 -bottom-6 text-[100px] md:text-[120px] font-black text-white/20 leading-none tracking-tighter select-none pointer-events-none" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.4)' }}>
                      {index + 1}
                    </div>
                    
                    {/* Title on non-active cards */}
                    <div className={`absolute bottom-4 left-4 right-4 transition-opacity duration-300 ${isActive ? 'opacity-0' : 'opacity-100'}`}>
                      <p className="text-sm font-bold truncate">{movie.title}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
        
      </main>
    </div>
  );
}
