import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  X,
  MapPin,
  Maximize2,
  Sparkles,
} from "lucide-react";

/**
 * Hand-drawn Camera Doodle Component
 * Matches the warm line-art doodle aesthetic of the Coding Buddy (Music section).
 * Features a shutter click animation, flash burst effect, and "Another moment captured" toast.
 */
function CameraDoodle() {
  const [isFlashing, setIsFlashing] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const toastTimeoutRef = useRef(null);

  const handleCameraClick = () => {
    setIsFlashing(true);
    setShowToast(true);

    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => {
      setShowToast(false);
    }, 2400);

    setTimeout(() => {
      setIsFlashing(false);
    }, 450);
  };

  return (
    <div className="relative inline-flex items-center">
      {/* Toast Message Bubble */}
      <AnimatePresence>
        {showToast && (
          <Motion.div
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute -top-10 left-1/2 -translate-x-1/2 z-30 pointer-events-none whitespace-nowrap px-3 py-1 rounded-full bg-[#1F1B18] border border-[#C49B66] text-[#F6F3EE] text-xs font-mono shadow-2xl backdrop-blur-md flex items-center gap-1.5"
          >
            <Sparkles size={12} className="text-[#C49B66]" />
            <span>Another moment captured. 📸</span>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#1F1B18] border-r border-b border-[#C49B66] rotate-45" />
          </Motion.div>
        )}
      </AnimatePresence>

      {/* Clickable Camera SVG */}
      <button
        type="button"
        onClick={handleCameraClick}
        className="relative group p-1.5 rounded-xl hover:bg-[#1A1715]/60 transition-colors focus:outline-none focus:ring-1 focus:ring-[#C49B66]"
        title="Capture a moment"
        aria-label="Interactive hand-drawn camera doodle"
      >
        {/* Flash Burst Flare */}
        {isFlashing && (
          <span
            className="absolute -top-1 right-2 w-8 h-8 rounded-full bg-[#FFF5E6] camera-flash-active pointer-events-none z-20 mix-blend-screen shadow-[0_0_24px_#FFF5E6]"
            aria-hidden="true"
          />
        )}

        <svg
          width="44"
          height="36"
          viewBox="0 0 44 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`text-[#C49B66] transition-transform ${
            isFlashing ? "camera-shutter-anim" : "group-hover:scale-105"
          }`}
          aria-hidden="true"
        >
          {/* Top Plate Step */}
          <path
            d="M 14 10 L 17 6 L 27 6 L 30 10 Z"
            fill="#231E1B"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          {/* Shutter Button */}
          <rect
            x="18"
            y="3"
            width="4"
            height="3"
            rx="1"
            fill={isFlashing ? "#FFF5E6" : "currentColor"}
            stroke="currentColor"
            strokeWidth="0.8"
          />
          {/* Flash Unit / Viewfinder */}
          <rect
            x="24"
            y="4"
            width="5"
            height="2.5"
            rx="0.8"
            fill="#1E2822"
            stroke="#2E6F52"
            strokeWidth="0.9"
          />

          {/* Camera Main Body */}
          <rect
            x="4"
            y="10"
            width="36"
            height="22"
            rx="4"
            fill="#1C1815"
            stroke="#DDD4C8"
            strokeWidth="1.8"
          />

          {/* Textured Leatherette Grip Line */}
          <rect
            x="6"
            y="13"
            width="32"
            height="8"
            rx="1"
            fill="#27211D"
            opacity="0.8"
          />
          <line
            x1="8"
            y1="17"
            x2="36"
            y2="17"
            stroke="#C49B66"
            strokeWidth="0.8"
            opacity="0.5"
          />

          {/* Camera Lens (Concentric Circles) */}
          <circle
            cx="22"
            cy="21"
            r="8"
            fill="#14110F"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <circle
            cx="22"
            cy="21"
            r="5"
            fill="#26201B"
            stroke="#DDD4C8"
            strokeWidth="1.1"
          />
          <circle
            cx="22"
            cy="21"
            r="2.5"
            fill="#2E6F52"
          />
          {/* Lens reflection arc */}
          <path
            d="M 19 18 Q 22 16 25 18"
            stroke="#F6F3EE"
            strokeWidth="0.9"
            strokeLinecap="round"
          />

          {/* Red/Brass Accent Dot */}
          <circle cx="34" cy="15" r="1.3" fill="#C49B66" />
        </svg>
      </button>
    </div>
  );
}

/**
 * MomentsSection Component
 * Horizontal scrolling photography journal with mouse-drag, keyboard,
 * trackpad, touch swipe, and an interactive full-fidelity lightbox.
 */
export default function MomentsSection({ moments = [] }) {
  const scrollRef = useRef(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Mouse Drag-to-Scroll State
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const [dragMoved, setDragMoved] = useState(false);

  // Touch swipe coordinates for lightbox
  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);

  // Check scroll boundary to enable/disable arrow buttons
  const checkScrollBounds = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  }, []);

  useEffect(() => {
    checkScrollBounds();
    const handleResize = () => checkScrollBounds();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [checkScrollBounds, moments]);

  // Scroll by step (Left / Right Buttons)
  const handleScroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = 340;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
    setTimeout(checkScrollBounds, 350);
  };

  // Mouse Drag handlers
  const handleMouseDown = (e) => {
    if (!scrollRef.current) return;
    setIsMouseDown(true);
    setDragMoved(false);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftState(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isMouseDown || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Drag speed multiplier
    if (Math.abs(walk) > 6) {
      setDragMoved(true);
    }
    scrollRef.current.scrollLeft = scrollLeftState - walk;
    checkScrollBounds();
  };

  const handleMouseUpOrLeave = () => {
    setIsMouseDown(false);
    setTimeout(() => setDragMoved(false), 50);
  };

  // Lightbox navigation
  const openLightbox = (index) => {
    if (dragMoved) return; // Prevent opening if user was dragging
    setActivePhotoIndex(index);
  };

  const closeLightbox = () => {
    setActivePhotoIndex(null);
  };

  const goToPrevPhoto = useCallback(
    (e) => {
      if (e) e.stopPropagation();
      setActivePhotoIndex((prev) =>
        prev === null ? null : prev === 0 ? moments.length - 1 : prev - 1
      );
    },
    [moments.length]
  );

  const goToNextPhoto = useCallback(
    (e) => {
      if (e) e.stopPropagation();
      setActivePhotoIndex((prev) =>
        prev === null ? null : (prev + 1) % moments.length
      );
    },
    [moments.length]
  );

  // Keyboard navigation for lightbox (Escape, ArrowLeft, ArrowRight)
  useEffect(() => {
    if (activePhotoIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowLeft") {
        goToPrevPhoto();
      } else if (e.key === "ArrowRight") {
        goToNextPhoto();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePhotoIndex, goToPrevPhoto, goToNextPhoto]);

  // Touch swipe inside lightbox modal
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartXRef.current - touchEndXRef.current;
    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        goToNextPhoto();
      } else {
        goToPrevPhoto();
      }
    }
    touchStartXRef.current = 0;
    touchEndXRef.current = 0;
  };

  const currentPhoto =
    activePhotoIndex !== null ? moments[activePhotoIndex] : null;

  return (
    <section
      id="moments"
      className="py-20 sm:py-24 px-4 sm:px-8 lg:px-12 border-t border-[#F0E6DA]/[0.08] bg-[#171513] relative overflow-hidden"
    >
      {/* Subtle ambient background glow */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#C49B66]/[0.025] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ===================================================================
            SECTION HEADER: Title, Camera Doodle, Navigation Arrows
            =================================================================== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#C49B66] font-medium">
                Moments
              </span>
              <span className="text-[#C49B66]/60 font-mono text-xs">•</span>
              <span className="text-xs font-mono text-[#A09689]">
                Photo Journal
              </span>
            </div>

            <div className="flex items-center gap-3.5 flex-wrap">
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F6F3EE]">
                Life beyond the screen
              </h2>

              {/* Hand-drawn Interactive Camera Doodle */}
              <CameraDoodle />
            </div>

            {/* Hand-drawn sketch underline */}
            <svg
              width="190"
              height="10"
              viewBox="0 0 190 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[#C49B66] mt-2 opacity-80"
              aria-hidden="true"
            >
              <path
                d="M 2 7 C 45 2, 115 3, 188 5 C 150 8, 75 9, 40 7"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Description & Scroll Navigation Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6">
            <p className="text-sm text-[#A09689] max-w-sm leading-relaxed">
              Some moments from college, trips, and everything in between.
            </p>

            {/* Navigation Arrows & Photo Counter */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-mono text-[#C49B66] px-2.5 py-1 rounded-full bg-[#1A1715] border border-[#F0E6DA]/[0.08] mr-1">
                01 — {moments.length < 10 ? `0${moments.length}` : moments.length}
              </span>

              <button
                type="button"
                onClick={() => handleScroll("left")}
                disabled={!canScrollLeft}
                className={`p-2.5 rounded-full bg-[#1A1715] text-[#DDD4C8] border border-[#F0E6DA]/[0.1] transition-all duration-200 ${
                  canScrollLeft
                    ? "hover:bg-[#25201C] hover:text-[#F6F3EE] hover:border-[#C49B66]/50 cursor-pointer shadow-sm active:scale-95"
                    : "opacity-30 cursor-not-allowed"
                }`}
                title="Scroll previous photos"
                aria-label="Scroll left"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                type="button"
                onClick={() => handleScroll("right")}
                disabled={!canScrollRight}
                className={`p-2.5 rounded-full bg-[#1A1715] text-[#DDD4C8] border border-[#F0E6DA]/[0.1] transition-all duration-200 ${
                  canScrollRight
                    ? "hover:bg-[#25201C] hover:text-[#F6F3EE] hover:border-[#C49B66]/50 cursor-pointer shadow-sm active:scale-95"
                    : "opacity-30 cursor-not-allowed"
                }`}
                title="Scroll next photos"
                aria-label="Scroll right"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* ===================================================================
            CONTINUOUS HORIZONTAL PHOTO JOURNAL STRIP
            - Desktop: Mouse drag-to-scroll, trackpad horizontal scroll, arrow navigation
            - Mobile: Native touch swipe, scroll-snap, compact height
            - Extensible: Supports any number of photos without expanding vertical height
            =================================================================== */}
        <div className="relative">
          {/* Subtle edge fade overlays for editorial feel */}
          {canScrollLeft && (
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#171513] to-transparent z-10 pointer-events-none" />
          )}
          {canScrollRight && (
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#171513] to-transparent z-10 pointer-events-none" />
          )}

          <div
            ref={scrollRef}
            onScroll={checkScrollBounds}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            className={`flex gap-5 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth py-3 px-1 snap-x snap-mandatory ${
              isMouseDown ? "cursor-grabbing select-none" : "cursor-grab"
            }`}
            style={{ WebkitOverflowScrolling: "touch" }}
            role="region"
            aria-label="Horizontal photo gallery"
          >
            {moments.map((item, index) => (
              <div
                key={item.id || index}
                onClick={() => openLightbox(index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openLightbox(index);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`View photo: ${item.caption || `Photo ${index + 1}`}`}
                className="group relative w-[260px] sm:w-[290px] md:w-[320px] aspect-[4/5] shrink-0 snap-start rounded-2xl overflow-hidden bg-[#1A1715] border border-[#F0E6DA]/[0.08] hover:border-[#C49B66]/40 transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#C49B66]"
              >
                {/* Photo Image */}
                <img
                  src={item.src}
                  alt={item.caption || `Moment ${index + 1}`}
                  loading="lazy"
                  draggable={false}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter contrast-[1.02]"
                />

                {/* Film Roll Index Number */}
                <div className="absolute top-3.5 left-3.5 z-10">
                  <span className="font-mono text-[10px] text-[#C49B66] bg-[#121110]/85 backdrop-blur-md px-2 py-0.5 rounded-md border border-[#F0E6DA]/[0.1]">
                    {index + 1 < 10 ? `0${index + 1}` : index + 1}
                  </span>
                </div>

                {/* Expand icon on hover */}
                <div className="absolute top-3.5 right-3.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="w-7 h-7 rounded-full bg-[#121110]/85 backdrop-blur-md border border-[#F0E6DA]/[0.1] text-[#F6F3EE] flex items-center justify-center">
                    <Maximize2 size={12} />
                  </span>
                </div>

                {/* Bottom Editorial Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#121110]/95 via-[#121110]/40 to-transparent p-4 sm:p-5 flex flex-col justify-end pointer-events-none">
                  {item.tag && (
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#C49B66] mb-1 font-medium">
                      {item.tag}
                    </span>
                  )}
                  <h4 className="font-display font-semibold text-sm sm:text-base text-[#F6F3EE] leading-snug line-clamp-2">
                    {item.caption}
                  </h4>
                  {item.location && (
                    <p className="text-[11px] font-mono text-[#A09689] flex items-center gap-1 mt-1 truncate">
                      <MapPin size={11} className="text-[#C49B66] shrink-0" />
                      <span className="truncate">{item.location}</span>
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===================================================================
          INTERACTIVE LIGHTBOX MODAL
          - Keyboard navigation (ArrowLeft, ArrowRight, Escape)
          - Touch swipe support on mobile
          - Previous / Next buttons
          - Position indicator (e.g. 3 / 6)
          - Clear, high-res presentation
          =================================================================== */}
      <AnimatePresence>
        {currentPhoto && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/92 backdrop-blur-md"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Photo Lightbox"
          >
            <Motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="relative max-w-4xl w-full surface-card rounded-2xl overflow-hidden bg-[#161412] border border-[#F0E6DA]/[0.1] shadow-2xl flex flex-col max-h-[92vh]"
            >
              {/* Modal Top Bar */}
              <div className="px-4 py-3 sm:px-6 sm:py-3.5 flex items-center justify-between border-b border-[#F0E6DA]/[0.08] bg-[#141210]">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[#C49B66] font-medium tracking-wider">
                    {activePhotoIndex + 1} / {moments.length}
                  </span>
                  {currentPhoto.tag && (
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#1F1B18] text-[#DDD4C8] border border-[#F0E6DA]/[0.08]">
                      {currentPhoto.tag}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={closeLightbox}
                  className="p-1.5 rounded-full text-[#A09689] hover:text-[#F6F3EE] hover:bg-[#25201C] transition cursor-pointer"
                  title="Close (Esc)"
                  aria-label="Close lightbox"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Main Image Viewing Area with Prev / Next Navigation */}
              <div className="relative flex-1 flex items-center justify-center bg-[#0E0C0B] p-2 sm:p-6 min-h-[300px] sm:min-h-[460px] max-h-[68vh] overflow-hidden">
                <img
                  key={currentPhoto.src}
                  src={currentPhoto.src}
                  alt={currentPhoto.caption}
                  className="max-h-[62vh] w-auto max-w-full object-contain mx-auto rounded-lg shadow-2xl transition-opacity duration-300"
                />

                {/* Previous Button */}
                <button
                  type="button"
                  onClick={goToPrevPhoto}
                  className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-[#161412]/80 hover:bg-[#25201C] text-[#F6F3EE] border border-[#F0E6DA]/[0.15] hover:border-[#C49B66] transition-all shadow-lg active:scale-95 cursor-pointer backdrop-blur-md"
                  title="Previous photo (Left arrow)"
                  aria-label="Previous photo"
                >
                  <ChevronLeft size={20} />
                </button>

                {/* Next Button */}
                <button
                  type="button"
                  onClick={goToNextPhoto}
                  className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-[#161412]/80 hover:bg-[#25201C] text-[#F6F3EE] border border-[#F0E6DA]/[0.15] hover:border-[#C49B66] transition-all shadow-lg active:scale-95 cursor-pointer backdrop-blur-md"
                  title="Next photo (Right arrow)"
                  aria-label="Next photo"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Modal Bottom Metadata */}
              <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-[#141210] border-t border-[#F0E6DA]/[0.08]">
                <div>
                  <h3 className="font-display font-bold text-base sm:text-lg text-[#F6F3EE]">
                    {currentPhoto.caption}
                  </h3>
                  {currentPhoto.location && (
                    <p className="text-xs font-mono text-[#A09689] flex items-center gap-1.5 mt-0.5">
                      <MapPin size={12} className="text-[#C49B66]" />
                      <span>{currentPhoto.location}</span>
                    </p>
                  )}
                </div>

                <div className="text-[11px] font-mono text-[#A09689]/80 hidden sm:block">
                  Tip: Use <kbd className="px-1.5 py-0.5 rounded bg-[#1F1B18] border border-[#F0E6DA]/[0.1] text-[#DDD4C8]">←</kbd> <kbd className="px-1.5 py-0.5 rounded bg-[#1F1B18] border border-[#F0E6DA]/[0.1] text-[#DDD4C8]">→</kbd> to navigate
                </div>
              </div>
            </Motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

