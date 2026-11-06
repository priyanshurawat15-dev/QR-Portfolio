import React, { useState } from "react";
import { FaSpotify } from "react-icons/fa";
import { ArrowUpRight, Play } from "lucide-react";
import CodingBuddy from "./CodingBuddy";

export default function SoundtrackSection({ songs = [], activeSong = 0, setActiveSong }) {
  const currentSong = songs[activeSong] || songs[0];
  const [reactionTrigger, setReactionTrigger] = useState(0);

  const handleSelectSong = (index) => {
    if (index !== activeSong) {
      setActiveSong(index);
      setReactionTrigger((prev) => prev + 1);
    }
  };

  // 18 equalizer bars with varying animation delays and durations for a realistic rhythm
  const eqBars = [
    { delay: "0.1s", dur: "1.1s" },
    { delay: "0.35s", dur: "0.85s" },
    { delay: "0.05s", dur: "1.3s" },
    { delay: "0.5s", dur: "0.75s" },
    { delay: "0.2s", dur: "1.0s" },
    { delay: "0.4s", dur: "1.25s" },
    { delay: "0.15s", dur: "0.9s" },
    { delay: "0.6s", dur: "1.15s" },
    { delay: "0.25s", dur: "0.8s" },
    { delay: "0.45s", dur: "1.2s" },
    { delay: "0.1s", dur: "0.95s" },
    { delay: "0.3s", dur: "1.05s" },
    { delay: "0.55s", dur: "0.7s" },
    { delay: "0.05s", dur: "1.35s" },
    { delay: "0.4s", dur: "0.85s" },
    { delay: "0.2s", dur: "1.1s" },
    { delay: "0.5s", dur: "0.9s" },
    { delay: "0.15s", dur: "1.2s" },
  ];

  return (
    <section
      id="soundtrack"
      className="py-20 sm:py-24 px-4 sm:px-8 lg:px-12 border-t border-[#F0E6DA]/[0.08] bg-[#121110] relative overflow-hidden"
    >
      {/* Subtle ambient background glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C49B66]/[0.03] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#2E6F52]/[0.04] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ===================================================================
            SECTION HEADER: Title, Headphones Doodle, Waveform
            =================================================================== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#C49B66] mb-2 block font-medium">
              Soundtrack
            </span>

            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F6F3EE]">
                Music I code to
              </h2>

              {/* Hand-drawn Headphones Doodle with Sound Arcs */}
              <svg
                width="38"
                height="34"
                viewBox="0 0 38 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-[#C49B66] shrink-0"
                aria-hidden="true"
              >
                {/* Headband */}
                <path
                  d="M 9 18 C 9 11, 14 6, 19 6 C 24 6, 29 11, 29 18"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                {/* Left earpad */}
                <rect
                  x="6"
                  y="17"
                  width="5.5"
                  height="11"
                  rx="2.5"
                  fill="currentColor"
                  opacity="0.9"
                />
                {/* Right earpad */}
                <rect
                  x="26.5"
                  y="17"
                  width="5.5"
                  height="11"
                  rx="2.5"
                  fill="currentColor"
                  opacity="0.9"
                />
                {/* Left sound vibration arcs */}
                <path
                  d="M 3 15 C 1 18, 1 24, 3 27"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                {/* Right sound vibration arcs */}
                <path
                  d="M 35 15 C 37 18, 37 24, 35 27"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Hand-drawn underline curl */}
            <svg
              width="180"
              height="10"
              viewBox="0 0 180 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[#C49B66] mt-1.5 opacity-80"
              aria-hidden="true"
            >
              <path
                d="M 2 7 C 45 2, 110 3, 178 5 C 145 8, 70 9, 38 7"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Description & Soundwave Doodle */}
          <div className="flex items-center gap-4 max-w-md">
            <p className="text-sm sm:text-base text-[#A09689] leading-relaxed">
              A few favorite tracks that keep me focused during study and late-night coding sessions.
            </p>

            {/* Soundwave Bars Icon */}
            <div className="flex items-center gap-1 h-8 shrink-0 text-[#C49B66] px-2 py-1 rounded-lg bg-[#1A1715] border border-[#F0E6DA]/[0.08]">
              <span className="w-0.5 bg-[#C49B66] rounded-full h-3" />
              <span className="w-0.5 bg-[#C49B66] rounded-full h-6 animate-pulse" />
              <span className="w-0.5 bg-[#C49B66] rounded-full h-4" />
              <span className="w-0.5 bg-[#C49B66] rounded-full h-7 animate-pulse" />
              <span className="w-0.5 bg-[#C49B66] rounded-full h-3" />
            </div>
          </div>
        </div>

        {/* ===================================================================
            MAIN CONTAINER: 3 Visual Areas (Left, Center, Right)
            =================================================================== */}
        <div className="surface-card rounded-3xl p-6 sm:p-8 lg:p-10 bg-[#161412] border border-[#F0E6DA]/[0.08] shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
            {/* -------------------------------------------------------------
                LEFT COLUMN: Animated Coding Character Illustration
                ------------------------------------------------------------- */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <CodingBuddy
                trackChangeKey={reactionTrigger}
                activeSongData={currentSong}
                interactive={true}
              />
            </div>

            {/* -------------------------------------------------------------
                CENTER COLUMN: Featured Track, Annotation, Equalizer, Spotify
                ------------------------------------------------------------- */}
            <div className="lg:col-span-3 flex flex-col items-center text-center">
              {/* Handwritten annotation bubble: "currently on repeat ♡" */}
              <div className="relative mb-3 flex flex-col items-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#C49B66]/60 bg-[#221B14] text-[#C49B66] text-xs font-mono tracking-tight shadow-sm">
                  <span>currently on repeat</span>
                  <span className="text-[#C47366] text-sm">♡</span>
                </div>

                {/* Hand-drawn curved arrow pointing to album cover */}
                <svg
                  width="44"
                  height="26"
                  viewBox="0 0 44 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-[#C49B66] mt-0.5"
                  aria-hidden="true"
                >
                  <path
                    d="M 16 2 C 16 12, 28 14, 28 22"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  {/* Arrowhead */}
                  <path
                    d="M 23 18 L 28 23 L 33 18"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Radiant ray accents above album art */}
              <div className="flex justify-center gap-1.5 mb-2 text-[#C49B66] opacity-75">
                <span className="text-xs transform -rotate-20 inline-block font-mono">/</span>
                <span className="text-xs font-mono">|</span>
                <span className="text-xs transform rotate-20 inline-block font-mono">\</span>
              </div>

              {/* Featured Album Artwork */}
              <div className="relative aspect-square w-48 sm:w-56 md:w-60 rounded-2xl overflow-hidden shadow-2xl border border-[#F0E6DA]/[0.12] group bg-[#1B1715]">
                <img
                  key={currentSong.title}
                  src={currentSong.image}
                  alt={currentSong.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121110]/70 via-transparent to-transparent pointer-events-none" />

                {/* Genre Tag Pill on cover */}
                {currentSong.tag && (
                  <div className="absolute bottom-3 right-3">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#141210]/90 backdrop-blur-md text-[#DDD4C8] border border-[#F0E6DA]/[0.1]">
                      {currentSong.tag}
                    </span>
                  </div>
                )}
              </div>

              {/* Song Title and Artist */}
              <div className="mt-4 mb-2 space-y-1">
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#F6F3EE] tracking-tight">
                  {currentSong.title}
                </h3>
                <p className="text-[#A09689] text-xs sm:text-sm font-medium">
                  {currentSong.artist}
                </p>
              </div>

              {/* Animated Equalizer Waveform Bars */}
              <div
                className="flex items-end justify-center gap-1 h-6 my-2 px-4"
                aria-hidden="true"
              >
                {eqBars.map((bar, i) => (
                  <span
                    key={i}
                    className="w-1 bg-[#2E6F52] rounded-full eq-bar"
                    style={{
                      animationDelay: bar.delay,
                      animationDuration: bar.dur,
                    }}
                  />
                ))}
              </div>

              {/* Spotify Button */}
              <a
                href={currentSong.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full max-w-[240px] mt-2 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-[#2E6F52] hover:bg-[#388563] text-[#F6F3EE] font-medium text-xs sm:text-sm transition-all duration-300 shadow-lg shadow-[#2E6F52]/25 hover:shadow-[#2E6F52]/40 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#388563]"
                aria-label={`Listen to ${currentSong.title} by ${currentSong.artist} on Spotify`}
              >
                <FaSpotify size={18} className="text-[#F6F3EE]" />
                <span>Listen on Spotify</span>
                <ArrowUpRight size={14} className="opacity-90" />
              </a>
            </div>

            {/* -------------------------------------------------------------
                RIGHT COLUMN: Playlist (All 6 Songs)
                ------------------------------------------------------------- */}
            <div className="lg:col-span-4">
              <div className="rounded-2xl p-4 sm:p-5 bg-[#171513] border border-[#F0E6DA]/[0.08]">
                {/* Playlist Header */}
                <div className="px-2 pb-3 mb-2 flex items-center justify-between text-xs font-mono text-[#A09689] border-b border-[#F0E6DA]/[0.06]">
                  <span className="tracking-wider">PLAYLIST // 06 SONGS</span>
                  <span className="text-[11px] text-[#C49B66]/80 font-medium">SELECT TO SWITCH</span>
                </div>

                {/* Song Rows */}
                <div className="space-y-2">
                  {songs.map((song, index) => {
                    const isActive = index === activeSong;
                    return (
                      <div
                        key={song.title}
                        onClick={() => handleSelectSong(index)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            handleSelectSong(index);
                          }
                        }}
                        role="button"
                        tabIndex={0}
                        aria-pressed={isActive}
                        aria-label={`Select track ${index + 1}: ${song.title} by ${song.artist}`}
                        className={`w-full text-left p-3 rounded-xl flex items-center justify-between transition-all duration-200 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#C49B66] ${
                          isActive
                            ? "bg-[#1C2820] border border-[#2E6F52]/60 text-[#F6F3EE] shadow-sm"
                            : "hover:bg-[#1F1B18] text-[#DDD4C8] border border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {/* Track number / active play indicator */}
                          <div className="w-5 text-center shrink-0">
                            {isActive ? (
                              <Play size={13} className="text-[#388563] fill-[#388563] mx-auto" />
                            ) : (
                              <span className="font-mono text-xs text-[#C49B66]/90 font-medium">
                                0{index + 1}
                              </span>
                            )}
                          </div>

                          {/* Album Thumbnail */}
                          <img
                            src={song.image}
                            alt={song.title}
                            className="w-10 h-10 rounded-lg object-cover shrink-0 border border-[#F0E6DA]/[0.08]"
                          />

                          {/* Title & Artist */}
                          <div className="min-w-0 truncate">
                            <div
                              className={`text-sm font-semibold truncate ${
                                isActive ? "text-[#F6F3EE]" : "text-[#E6DFD5]"
                              }`}
                            >
                              {song.title}
                            </div>
                            <div className="text-xs text-[#A09689] truncate">
                              {song.artist}
                            </div>
                          </div>
                        </div>

                        {/* Active soundwave animation OR direct Spotify link */}
                        <div className="flex items-center gap-2 shrink-0 ml-2">
                          {isActive ? (
                            <div
                              className="flex items-end gap-0.5 h-4 px-1"
                              aria-label="Active track equalizer"
                            >
                              <span className="w-0.5 bg-[#388563] rounded-full bar-1" />
                              <span className="w-0.5 bg-[#388563] rounded-full bar-2" />
                              <span className="w-0.5 bg-[#388563] rounded-full bar-3" />
                              <span className="w-0.5 bg-[#388563] rounded-full bar-4" />
                            </div>
                          ) : (
                            <a
                              href={song.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="p-1.5 rounded-lg text-[#A09689] hover:text-[#2E6F52] hover:bg-[#2E6F52]/10 transition"
                              title={`Open ${song.title} on Spotify`}
                              aria-label={`Open ${song.title} on Spotify`}
                            >
                              <FaSpotify size={15} />
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

