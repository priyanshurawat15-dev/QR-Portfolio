import React, { useEffect, useState, useRef, useCallback } from "react";
import { Sparkles, Compass, Music, Code2, Coffee, Smartphone } from "lucide-react";

/**
 * CodingBuddy Component
 * An interactive, personal coding character modeled after the developer's
 * sketch portrait (Image 3) with voluminous wavy quiff hair, strong brows,
 * warm almond eyes, genuine smile, and dark overshirt over a white crewneck.
 *
 * Interactive Features:
 * - Tap head: Smiles, winks, speech bubble greeting
 * - Tap headphones: Adjusts headphones, music burst
 * - Tap laptop: Fast typing flurry, screen flash
 * - Tap coffee mug: Steam puff, caffeine quote
 * - Phone Tilt (DeviceOrientation): Leans with phone tilt, loses balance on heavy tilt, then recovers
 * - Desktop Mouse Track: Head and pupils smoothly follow cursor
 * - Idle / Sleepy: Periodic blinks, keystrokes, and sleepy z z Z after 24s inactivity
 * - Song Switch: Joyful nod and floating notes
 */
export default function CodingBuddy({
  trackChangeKey = 0,
  activeSongData = null,
  interactive = true,
  className = "",
}) {
  // Interaction and animation states:
  // "idle" | "smiling" | "typing" | "adjusting-headphones" | "coffee" | "losing-balance" | "recovering" | "sleepy" | "listening"
  const [characterState, setCharacterState] = useState("idle");
  const [speechBubble, setSpeechBubble] = useState(null);
  const [pointerOffset, setPointerOffset] = useState({ x: 0, y: 0 }); // -1 to 1 normalized
  const [isBlinking, setIsBlinking] = useState(false);
  const [motionActive, setMotionActive] = useState(false);
  const [tiltAngle, setTiltAngle] = useState(0); // degrees of lean
  const [hasOrientationSensor, setHasOrientationSensor] = useState(false);
  const [showTiltHint, setShowTiltHint] = useState(false);

  const containerRef = useRef(null);
  const bubbleTimerRef = useRef(null);
  const stateResetTimerRef = useRef(null);
  const idleTimerRef = useRef(0);
  const smoothedTiltRef = useRef(0);
  const balanceCooldownRef = useRef(false);

  // Helper to trigger interactive speech bubble
  const showBubble = useCallback((text, duration = 2400) => {
    if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current);
    setSpeechBubble(text);
    bubbleTimerRef.current = setTimeout(() => {
      setSpeechBubble(null);
    }, duration);
  }, []);

  // Helper to set transient character state
  const triggerState = useCallback(
    (newState, bubbleText, duration = 1800) => {
      if (characterState === "losing-balance" || characterState === "recovering") return;
      if (stateResetTimerRef.current) clearTimeout(stateResetTimerRef.current);

      setCharacterState(newState);
      if (bubbleText) showBubble(bubbleText, duration + 600);
      idleTimerRef.current = 0;

      stateResetTimerRef.current = setTimeout(() => {
        setCharacterState("idle");
      }, duration);
    },
    [characterState, showBubble]
  );

  // Trigger playful balance loss and recovery
  const triggerBalanceLoss = useCallback(
    (direction = -1) => {
      if (balanceCooldownRef.current || characterState === "losing-balance") return;
      balanceCooldownRef.current = true;

      setCharacterState("losing-balance");
      showBubble("Whoa!! Steady now! 🤸", 2000);

      // After 1.4s of wobbling, transition to recovery
      setTimeout(() => {
        setCharacterState("recovering");
        showBubble("Phew! Caught myself 😅", 2000);

        setTimeout(() => {
          setCharacterState("idle");
          balanceCooldownRef.current = false;
        }, 1500);
      }, 1400);
    },
    [characterState, showBubble]
  );

  // Reaction when song changes
  useEffect(() => {
    if (trackChangeKey > 0) {
      triggerState(
        "listening",
        activeSongData ? `Vibing to "${activeSongData.title}" 🎵` : "New track! ✨",
        2200
      );
    }
  }, [trackChangeKey, activeSongData, triggerState]);

  // Periodic natural blinking
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      if (characterState === "sleepy" || characterState === "losing-balance") return;
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 160);
    }, 4600);
    return () => clearInterval(blinkInterval);
  }, [characterState]);

  // Idle timer check: every second, increment idle. After 24s -> sleepy
  useEffect(() => {
    const timer = setInterval(() => {
      idleTimerRef.current += 1;
      if (idleTimerRef.current >= 24 && characterState === "idle") {
        setCharacterState("sleepy");
        showBubble("Getting a bit cozy... z z Z 🌙", 3000);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [characterState, showBubble]);

  // Wake up on user interaction
  const wakeUp = useCallback(() => {
    idleTimerRef.current = 0;
    if (characterState === "sleepy") {
      triggerState("smiling", "I'm awake and ready to code! 💻", 1800);
    }
  }, [characterState, triggerState]);

  // Desktop Pointer Tracking (Mouse move)
  const handleMouseMove = (e) => {
    wakeUp();
    if (!containerRef.current || characterState === "losing-balance") return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const normX = Math.max(-1, Math.min(1, (e.clientX - centerX) / (rect.width / 2)));
    const normY = Math.max(-1, Math.min(1, (e.clientY - centerY) / (rect.height / 2)));

    setPointerOffset({ x: normX, y: normY });
  };

  const handleMouseLeave = () => {
    setPointerOffset({ x: 0, y: 0 });
  };

  // DeviceOrientation Tilt Listener
  const enableMotionSensors = async () => {
    wakeUp();
    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      typeof DeviceOrientationEvent.requestPermission === "function"
    ) {
      try {
        const response = await DeviceOrientationEvent.requestPermission();
        if (response === "granted") {
          setMotionActive(true);
          setShowTiltHint(true);
          showBubble("Tilt active! Tilt your phone 📱✨", 2500);
        } else {
          showBubble("Motion permission denied 🚫", 2000);
        }
      } catch (err) {
        console.warn("DeviceOrientation error:", err);
        setMotionActive(true);
      }
    } else {
      // Standard Android or supported desktop sensor
      setMotionActive((prev) => {
        const next = !prev;
        if (next) {
          setShowTiltHint(true);
          showBubble("Motion active! Tilt phone to balance 📱", 2500);
        }
        return next;
      });
    }
  };

  useEffect(() => {
    if (!motionActive) {
      setTiltAngle(0);
      return;
    }

    const handleOrientation = (e) => {
      wakeUp();
      if (e.gamma !== null || e.beta !== null) {
        setHasOrientationSensor(true);
        const rawGamma = e.gamma || 0; // Left-to-right tilt in degrees (-90 to 90)

        // Exponential smoothing (low-pass filter)
        smoothedTiltRef.current =
          smoothedTiltRef.current + (rawGamma - smoothedTiltRef.current) * 0.22;

        const clampedTilt = Math.max(-40, Math.min(40, smoothedTiltRef.current));
        setTiltAngle(clampedTilt);

        // Heavy tilt triggers balance loss!
        if (Math.abs(clampedTilt) > 28 && !balanceCooldownRef.current) {
          triggerBalanceLoss(clampedTilt > 0 ? 1 : -1);
        }
      }
    };

    window.addEventListener("deviceorientation", handleOrientation);
    return () => window.removeEventListener("deviceorientation", handleOrientation);
  }, [motionActive, triggerBalanceLoss, wakeUp]);

  // Click Handlers for specific parts of the illustration
  const handleHeadClick = (e) => {
    e.stopPropagation();
    wakeUp();
    const greetings = [
      "Hey! Let's build something awesome! ✨",
      "Focused and coding! 🚀",
      "Loving this rhythm! (˶ᵔ ᵕ ᵔ˶)",
      "Always learning, always creating! ⚡",
    ];
    const pick = greetings[Math.floor(Math.random() * greetings.length)];
    triggerState("smiling", pick, 2000);
  };

  const handleHeadphonesClick = (e) => {
    e.stopPropagation();
    wakeUp();
    triggerState("adjusting-headphones", "Music keeps the code flowing! 🎧🎶", 2200);
  };

  const handleLaptopClick = (e) => {
    e.stopPropagation();
    wakeUp();
    const codeQuotes = [
      "git commit -m 'crafted with passion' 💻",
      "npm run build... 0 errors! ⚡",
      "Solving bugs before breakfast ☕✨",
      "Writing clean React components! 🎯",
    ];
    const pick = codeQuotes[Math.floor(Math.random() * codeQuotes.length)];
    triggerState("typing", pick, 2200);
  };

  const handleCoffeeClick = (e) => {
    e.stopPropagation();
    wakeUp();
    triggerState("coffee", "Coffee fuels the late-night sessions! ☕", 2000);
  };

  // Compute calculated transforms for dynamic head & pupil tracking
  const headRotate =
    characterState === "losing-balance"
      ? tiltAngle > 0
        ? 18
        : -18
      : tiltAngle !== 0
      ? tiltAngle * 0.4
      : pointerOffset.x * 5;

  const headTranslateX =
    characterState === "losing-balance"
      ? tiltAngle > 0
        ? 8
        : -8
      : tiltAngle !== 0
      ? tiltAngle * 0.3
      : pointerOffset.x * 6;

  const headTranslateY =
    characterState === "sleepy"
      ? 4
      : characterState === "losing-balance"
      ? -6
      : pointerOffset.y * 3;

  const pupilX = Math.max(-2.5, Math.min(2.5, pointerOffset.x * 2.2));
  const pupilY =
    characterState === "sleepy" ? 1.5 : Math.max(-1.8, Math.min(1.8, pointerOffset.y * 1.6));

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={wakeUp}
      className={`relative w-full max-w-[480px] mx-auto select-none ${className}`}
    >
      {/* Speech / Thought Bubble (Doodle style) */}
      {speechBubble && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
          <div className="buddy-speech-bubble px-3.5 py-1.5 rounded-2xl bg-[#1F1B18]/95 border border-[#C49B66] text-[#F6F3EE] text-xs font-mono shadow-2xl backdrop-blur-md flex items-center gap-1.5 whitespace-nowrap">
            <span className="text-[#C49B66]">✦</span>
            <span>{speechBubble}</span>
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#1F1B18] border-r border-b border-[#C49B66] rotate-45" />
          </div>
        </div>
      )}

      {/* Main Layered SVG */}
      <svg
        viewBox="0 0 500 420"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-auto drop-shadow-2xl ${
          characterState === "losing-balance" ? "buddy-wobble-active" : ""
        }`}
        role="img"
        aria-label="Interactive hand-drawn Coding Buddy modeled after Priyanshu"
      >
        <defs>
          {/* Gradients */}
          <radialGradient id="screenGlowGrad" cx="50%" cy="100%" r="80%" fx="50%" fy="100%">
            <stop offset="0%" stopColor="#C49B66" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#2E6F52" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#121110" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="hairTextureGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1A1512" />
            <stop offset="60%" stopColor="#120E0C" />
            <stop offset="100%" stopColor="#0A0807" />
          </linearGradient>

          <linearGradient id="skinToneGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#DFCAB5" />
            <stop offset="100%" stopColor="#D2B9A2" />
          </linearGradient>

          <linearGradient id="jacketGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2A2420" />
            <stop offset="100%" stopColor="#191513" />
          </linearGradient>

          <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3E8865" />
            <stop offset="100%" stopColor="#234E3B" />
          </linearGradient>
        </defs>

        {/* ===================================================================
            BACKGROUND DECOR: Wall Shelf, Potted Plant, Sticky Note, Star Doodles
            =================================================================== */}

        {/* Doodled Wall Stars & Sparkles */}
        <g stroke="#C49B66" strokeWidth="1.4" strokeLinecap="round" opacity="0.6">
          <path d="M 405 48 L 405 60 M 399 54 L 411 54" />
          <path d="M 270 38 L 270 46 M 266 42 L 274 42" opacity="0.4" />
          <circle cx="422" cy="70" r="1.5" fill="#C49B66" />
          <circle cx="25" cy="115" r="1.5" fill="#C49B66" />
          <circle cx="258" cy="110" r="1.2" fill="#C49B66" opacity="0.5" />
        </g>

        {/* Wall Shelf */}
        <g id="shelf">
          <path
            d="M 52 74 L 52 92 L 64 74"
            stroke="#DDD4C8"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.4"
          />
          <path
            d="M 196 74 L 196 92 L 208 74"
            stroke="#DDD4C8"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.4"
          />
          <rect
            x="24"
            y="68"
            width="200"
            height="7"
            rx="2"
            fill="#2A2420"
            stroke="#DDD4C8"
            strokeWidth="1.3"
          />
          <line x1="28" y1="71" x2="220" y2="71" stroke="#C49B66" strokeWidth="0.8" opacity="0.5" />
        </g>

        {/* Potted Plant with Trailing Vines */}
        <g id="plant">
          <polygon points="38,44 76,44 71,68 43,68" fill="#5A3A29" stroke="#DDD4C8" strokeWidth="1.4" />
          <rect x="36" y="41" width="42" height="5" rx="1.5" fill="#724B35" stroke="#DDD4C8" strokeWidth="1.3" />
          <line x1="41" y1="54" x2="69" y2="54" stroke="#C49B66" strokeWidth="1" opacity="0.7" />
          <ellipse cx="57" cy="43" rx="17" ry="2.5" fill="#201712" />

          {/* Vines */}
          <path
            d="M 50 48 Q 28 85 45 130 T 32 195 T 52 245 T 38 275"
            fill="none"
            stroke="#DDD4C8"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            d="M 64 48 Q 78 80 66 115 T 75 165 T 60 210"
            fill="none"
            stroke="#DDD4C8"
            strokeWidth="1"
            strokeLinecap="round"
          />

          {/* Leaves */}
          <path d="M 38 72 C 22 70 20 86 34 88 C 42 88 44 74 38 72 Z" fill="url(#leafGrad)" stroke="#DDD4C8" strokeWidth="1.1" />
          <path d="M 54 85 C 68 82 72 96 60 102 C 52 104 48 92 54 85 Z" fill="url(#leafGrad)" stroke="#DDD4C8" strokeWidth="1.1" />
          <path d="M 32 108 C 16 106 14 122 28 126 C 36 126 38 114 32 108 Z" fill="url(#leafGrad)" stroke="#DDD4C8" strokeWidth="1.1" />
          <path d="M 46 128 C 58 126 62 140 50 144 C 42 144 40 134 46 128 Z" fill="url(#leafGrad)" stroke="#DDD4C8" strokeWidth="1.1" />
          <path d="M 28 152 C 14 150 12 165 26 168 C 34 168 36 156 28 152 Z" fill="url(#leafGrad)" stroke="#DDD4C8" strokeWidth="1.1" />
          <path d="M 40 176 C 54 174 56 188 44 192 C 36 192 34 182 40 176 Z" fill="url(#leafGrad)" stroke="#DDD4C8" strokeWidth="1.1" />
          <path d="M 26 200 C 14 198 12 212 24 214 C 32 214 34 204 26 200 Z" fill="url(#leafGrad)" stroke="#DDD4C8" strokeWidth="1.1" />
          <path d="M 42 222 C 54 220 54 234 44 236 C 36 236 34 228 42 222 Z" fill="url(#leafGrad)" stroke="#DDD4C8" strokeWidth="1.1" />
          <path d="M 32 248 C 22 246 20 258 30 260 C 36 260 38 252 32 248 Z" fill="url(#leafGrad)" stroke="#DDD4C8" strokeWidth="1" />
          <path d="M 42 268 C 32 268 32 278 40 280 C 46 280 48 272 42 268 Z" fill="url(#leafGrad)" stroke="#DDD4C8" strokeWidth="1" />
        </g>

        {/* Shelf Books & Candle */}
        <g id="shelf-books">
          <rect x="110" y="38" width="12" height="30" rx="1.5" fill="#2D2824" stroke="#DDD4C8" strokeWidth="1.2" />
          <line x1="114" y1="44" x2="114" y2="62" stroke="#C49B66" strokeWidth="1" />
          <g transform="rotate(14 128 68)">
            <rect x="126" y="37" width="13" height="31" rx="1.5" fill="#22332A" stroke="#DDD4C8" strokeWidth="1.2" />
            <line x1="130" y1="43" x2="130" y2="61" stroke="#2E6F52" strokeWidth="1.2" />
          </g>
          {/* Candle */}
          <rect x="165" y="52" width="16" height="16" rx="2" fill="#322C27" stroke="#DDD4C8" strokeWidth="1.2" />
          <path d="M 173 45 Q 169 50 173 52 Q 177 50 173 45 Z" fill="#D4A373" stroke="#DDD4C8" strokeWidth="1" />
        </g>

        {/* Sticky Note on Wall with < / > */}
        <g id="sticky-note" transform="rotate(-4 315 85)">
          <rect x="292" y="62" width="46" height="46" rx="2" fill="#12100E" opacity="0.4" />
          <rect x="290" y="60" width="46" height="46" rx="2" fill="#2C2317" stroke="#C49B66" strokeWidth="1.4" />
          <circle cx="313" cy="65" r="3.2" fill="#C49B66" />
          <circle cx="313" cy="65" r="1.5" fill="#F6F3EE" />
          <path d="M 302 85 L 297 89 L 302 93" stroke="#C49B66" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="311" y1="95" x2="315" y2="83" stroke="#C49B66" strokeWidth="2" strokeLinecap="round" />
          <path d="M 324 85 L 329 89 L 324 93" stroke="#C49B66" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* ===================================================================
            DESK & PROPS: Desk, Study Books, Coffee Mug, Laptop
            =================================================================== */}

        {/* Wooden Desk Surface */}
        <g id="desk-surface">
          <rect x="15" y="354" width="470" height="8" fill="#0E0C0B" opacity="0.6" />
          <rect x="15" y="342" width="470" height="12" rx="3" fill="#221D1A" stroke="#DDD4C8" strokeWidth="1.5" />
          <line x1="18" y1="345" x2="482" y2="345" stroke="#C49B66" strokeWidth="0.8" opacity="0.5" />
        </g>

        {/* Books on Desk */}
        <g id="desk-books">
          <rect x="42" y="325" width="90" height="17" rx="2" fill="#28221D" stroke="#DDD4C8" strokeWidth="1.3" />
          <line x1="48" y1="333" x2="126" y2="333" stroke="#C49B66" strokeWidth="1" opacity="0.7" />
          <rect x="48" y="308" width="80" height="17" rx="2" fill="#1E2822" stroke="#DDD4C8" strokeWidth="1.3" />
          <line x1="54" y1="316" x2="122" y2="316" stroke="#2E6F52" strokeWidth="1.2" opacity="0.8" />
          <path d="M 112 325 L 115 338 L 118 325" fill="#C49B66" stroke="#C49B66" strokeWidth="0.8" />
        </g>

        {/* Interactive Ceramic Coffee Mug */}
        <g
          id="coffee-mug"
          onClick={handleCoffeeClick}
          className="cursor-pointer group"
          role="button"
          tabIndex={0}
          aria-label="Coffee Mug - Tap for caffeine boost"
        >
          <rect x="146" y="292" width="34" height="38" rx="4" fill="#251F1C" stroke="#DDD4C8" strokeWidth="1.5" />
          <ellipse cx="163" cy="293" rx="16" ry="4.5" fill="#3B261A" stroke="#DDD4C8" strokeWidth="1.3" />
          <ellipse cx="163" cy="294" rx="13.5" ry="3.5" fill="#20130C" />
          <path d="M 146 300 C 134 300 134 322 146 322" fill="none" stroke="#DDD4C8" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="150" y1="314" x2="176" y2="314" stroke="#C49B66" strokeWidth="1" opacity="0.6" />

          {/* Steam paths */}
          <g className="buddy-steam" opacity={characterState === "coffee" ? 1 : 0.75}>
            <path
              className="buddy-steam-path-1"
              d="M 157 284 C 151 268 165 252 155 234 C 149 220 161 206 153 192"
              fill="none"
              stroke="#DDD4C8"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              className="buddy-steam-path-2"
              d="M 167 284 C 173 266 159 248 169 230 C 177 216 165 202 171 188"
              fill="none"
              stroke="#DDD4C8"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </g>
        </g>

        {/* Chair Back */}
        <path
          d="M 90 205 C 90 155 130 145 146 145 C 155 190 148 260 142 342 L 102 342 Z"
          fill="#171412"
          stroke="#DDD4C8"
          strokeWidth="1.2"
          opacity="0.45"
        />

        {/* ===================================================================
            THE CHARACTER: Modeled after User's Sketch Portrait (Image 3)
            Voluminous textured quiff hair, masculine arched brows, warm eyes,
            genuine smile, dark overshirt with collar over white crewneck tee.
            =================================================================== */}

        {/* Torso & Clothing Group (Breathing & Leaning) */}
        <g
          id="buddy-torso"
          className="buddy-body"
          style={{
            transform: `rotate(${tiltAngle * 0.15}deg)`,
            transformOrigin: "160px 342px",
          }}
        >
          {/* Inner White Crewneck T-Shirt */}
          <path
            d="M 160 210 Q 186 218 205 210 L 208 265 Q 186 270 160 265 Z"
            fill="#EDE8E1"
            stroke="#DDD4C8"
            strokeWidth="1.4"
          />
          {/* Crewneck Collar Band */}
          <path
            d="M 168 208 Q 186 216 200 208"
            fill="none"
            stroke="#DDD4C8"
            strokeWidth="2.2"
            strokeLinecap="round"
          />

          {/* Dark Overshirt / Jacket (Matching Image 3) */}
          <path
            d="M 134 212 C 120 248 106 285 96 342 L 218 342 C 214 300 206 255 194 212 Z"
            fill="url(#jacketGrad)"
            stroke="#DDD4C8"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />

          {/* Left Lapel / Collar of overshirt */}
          <path
            d="M 152 208 L 164 242 L 150 246 Z"
            fill="#322B26"
            stroke="#DDD4C8"
            strokeWidth="1.4"
          />
          {/* Right Lapel / Collar of overshirt */}
          <path
            d="M 196 208 L 186 242 L 200 246 Z"
            fill="#322B26"
            stroke="#DDD4C8"
            strokeWidth="1.4"
          />

          {/* Left Breast Pocket with Flap (Distinctive detail from Image 3 portrait) */}
          <rect
            x="116"
            y="262"
            width="28"
            height="32"
            rx="2"
            fill="#231E1B"
            stroke="#DDD4C8"
            strokeWidth="1.2"
          />
          <path
            d="M 115 262 L 130 268 L 145 262"
            fill="#2F2823"
            stroke="#DDD4C8"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
          <circle cx="130" cy="274" r="1.5" fill="#C49B66" />

          {/* Center placket line and buttons */}
          <line x1="175" y1="246" x2="175" y2="340" stroke="#DDD4C8" strokeWidth="1" opacity="0.4" />
          <circle cx="175" cy="265" r="1.8" fill="#C49B66" />
          <circle cx="175" cy="295" r="1.8" fill="#C49B66" />
          <circle cx="175" cy="325" r="1.8" fill="#C49B66" />
        </g>

        {/* Head & Face Group (Follows Cursor & Phone Tilt) */}
        <g
          id="buddy-head"
          onClick={handleHeadClick}
          className="cursor-pointer group"
          role="button"
          tabIndex={0}
          aria-label="Coding Buddy Head - Tap to interact"
          style={{
            transform: `translate(${headTranslateX}px, ${headTranslateY}px) rotate(${headRotate}deg)`,
            transformOrigin: "185px 185px",
            transition:
              characterState === "losing-balance"
                ? "none"
                : "transform 0.15s cubic-bezier(0.2, 0.8, 0.4, 1)",
          }}
        >
          {/* Neck */}
          <path
            d="M 172 186 L 174 212 L 194 212 L 196 186 Z"
            fill="url(#skinToneGrad)"
            stroke="#DDD4C8"
            strokeWidth="1.4"
          />

          {/* Face Profile & Jawline (Modelled after Image 3 portrait) */}
          <path
            d="M 160 162 C 158 184 168 198 188 198 C 206 198 220 190 224 178 C 226 170 228 164 225 158 C 229 152 230 144 225 138 C 220 130 210 122 192 120 C 168 118 160 140 160 162 Z"
            fill="url(#skinToneGrad)"
            stroke="#DDD4C8"
            strokeWidth="1.6"
          />

          {/* Masculine Jawline, Chin, and Nose Bridge */}
          <path
            d="M 215 136 C 220 142 226 148 222 154 C 219 158 215 160 220 164 C 223 168 220 174 213 177 C 204 180 192 181 182 179"
            fill="none"
            stroke="#DDD4C8"
            strokeWidth="1.4"
            strokeLinecap="round"
          />

          {/* Chin groove definition */}
          <path
            d="M 190 188 Q 194 191 198 188"
            fill="none"
            stroke="#9A6B4E"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.6"
          />

          {/* Cheek Blush (Soft warmth) */}
          <ellipse cx="204" cy="162" rx="7" ry="3.5" fill="#C47366" opacity="0.3" />

          {/* Nose (Straight bridge & defined tip from Image 3) */}
          <g id="nose">
            <path
              d="M 197 138 L 199 154 Q 200 159 196 160 Q 192 159 193 156"
              fill="none"
              stroke="#8A5A3C"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </g>

          {/* Strong, Well-defined Eyebrows (Distinctive feature from Image 3) */}
          <g id="eyebrows">
            {characterState === "losing-balance" ? (
              // Raised high in surprise
              <path
                d="M 196 130 Q 208 122 220 128"
                fill="none"
                stroke="#1E140E"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
            ) : (
              // Masculine arched brows
              <>
                <path
                  d="M 196 137 Q 206 131 216 136"
                  fill="none"
                  stroke="#1E140E"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                />
                {/* Texture line */}
                <path
                  d="M 199 136 Q 207 132 214 136"
                  fill="none"
                  stroke="#3A281D"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </>
            )}
          </g>

          {/* Eyes (Tracking, Blinking, or Surprised) */}
          <g id="eyes">
            {characterState === "losing-balance" ? (
              // Surprised Wide Round Eye
              <g>
                <circle cx="206" cy="146" r="6" fill="#F6F3EE" stroke="#DDD4C8" strokeWidth="1.5" />
                <circle cx="206" cy="146" r="3" fill="#1C1410" />
                <circle cx="207.5" cy="144.5" r="1.2" fill="#FFFFFF" />
              </g>
            ) : isBlinking || characterState === "sleepy" ? (
              // Gentle closed smiling eyes
              <path
                d="M 198 147 Q 206 153 214 148"
                fill="none"
                stroke="#201814"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            ) : characterState === "smiling" ? (
              // Happy crinkle eyes (˶ᵔ ᵕ ᵔ˶)
              <path
                d="M 198 148 Q 206 142 214 148"
                fill="none"
                stroke="#201814"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
            ) : (
              // Almond warm eyes with pupil tracking cursor
              <g>
                {/* Upper eyelid contour */}
                <path
                  d="M 198 145 C 202 140, 210 140, 215 145"
                  fill="none"
                  stroke="#201814"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                {/* Lower eyelid soft line */}
                <path
                  d="M 199 148 C 203 151, 209 151, 214 147"
                  fill="none"
                  stroke="#8A5A3C"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
                {/* Pupil tracking */}
                <circle
                  cx={206 + pupilX}
                  cy={145 + pupilY}
                  r="2.8"
                  fill="#1C1410"
                />
                {/* Specular highlight dot */}
                <circle
                  cx={207.2 + pupilX}
                  cy={143.8 + pupilY}
                  r="0.9"
                  fill="#FFFFFF"
                />
              </g>
            )}
          </g>

          {/* Mouth (Smile, Grin, or Surprised "O") */}
          <g id="mouth">
            {characterState === "losing-balance" ? (
              // Surprised "O" mouth
              <ellipse cx="214" cy="172" rx="4.5" ry="6" fill="#1C1410" stroke="#DDD4C8" strokeWidth="1.4" />
            ) : characterState === "smiling" ? (
              // Broad warm smile showing teeth
              <g>
                <path
                  d="M 207 169 Q 214 179 221 169 Z"
                  fill="#FFFFFF"
                  stroke="#8A5A3C"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <line x1="208" y1="170" x2="220" y2="170" stroke="#DDD4C8" strokeWidth="0.8" />
              </g>
            ) : (
              // Gentle natural smile (from Image 3 portrait)
              <path
                d="M 208 170 Q 214 175 220 171"
                fill="none"
                stroke="#8A5A3C"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            )}
          </g>

          {/* =================================================================
              HAIR: Voluminous Textured Wavy Quiff / Pompadour (Image 3)
              ================================================================= */}
          <g id="quiff-hair">
            {/* Main Wavy Hair Volume Silhouette */}
            <path
              d="M 158 152 C 146 138 144 115 158 96 C 172 78 200 74 220 88 C 234 98 240 118 234 136 C 228 128 220 120 210 120 C 204 128 200 134 194 126 C 188 116 178 114 172 124 C 166 134 164 146 158 152 Z"
              fill="url(#hairTextureGrad)"
              stroke="#DDD4C8"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />

            {/* Quiff Front Volume & Waves (Sweeping Up and Back) */}
            <path
              d="M 190 108 Q 206 122 204 136 Q 198 120 190 112 Z"
              fill="url(#hairTextureGrad)"
              stroke="#DDD4C8"
              strokeWidth="1.4"
            />
            <path
              d="M 208 112 Q 220 124 216 138 Q 210 124 204 118 Z"
              fill="url(#hairTextureGrad)"
              stroke="#DDD4C8"
              strokeWidth="1.4"
            />
            <path
              d="M 222 118 Q 230 132 224 146 Q 222 134 216 126 Z"
              fill="url(#hairTextureGrad)"
              stroke="#DDD4C8"
              strokeWidth="1.4"
            />

            {/* Wavy Pompadour Crest Locks (Top volume curves) */}
            <path
              d="M 166 88 Q 180 74 196 78 Q 194 88 184 92 Z"
              fill="url(#hairTextureGrad)"
              stroke="#DDD4C8"
              strokeWidth="1.3"
            />
            <path
              d="M 194 76 Q 210 74 222 84 Q 214 92 204 90 Z"
              fill="url(#hairTextureGrad)"
              stroke="#DDD4C8"
              strokeWidth="1.3"
            />

            {/* Textured Wave Stroke Highlights (Cream & Muted Brass) */}
            <path
              d="M 168 104 C 182 92 206 90 220 102"
              fill="none"
              stroke="#C49B66"
              strokeWidth="1.6"
              strokeLinecap="round"
              opacity="0.85"
            />
            <path
              d="M 176 112 C 188 100 206 100 216 110"
              fill="none"
              stroke="#DDD4C8"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity="0.7"
            />
            <path
              d="M 186 94 Q 200 86 212 94"
              fill="none"
              stroke="#C49B66"
              strokeWidth="1.3"
              strokeLinecap="round"
              opacity="0.8"
            />
          </g>

          {/* =================================================================
              OVER-EAR STUDIO HEADPHONES (Tappable Interaction)
              ================================================================= */}
          <g
            id="headphones"
            onClick={handleHeadphonesClick}
            className="cursor-pointer"
            role="button"
            tabIndex={0}
            aria-label="Headphones - Tap to adjust"
          >
            {/* Thick Padded Headband Arching over Quiff */}
            <path
              d="M 148 142 C 144 104 160 84 188 84 C 208 84 222 98 224 114"
              fill="none"
              stroke="#DDD4C8"
              strokeWidth="4.2"
              strokeLinecap="round"
            />
            <path
              d="M 148 142 C 144 104 160 84 188 84 C 208 84 222 98 224 114"
              fill="none"
              stroke="#C49B66"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Gimbal / Hinge Bracket */}
            <rect
              x="147"
              y="136"
              width="6"
              height="8"
              rx="1.5"
              fill="#C49B66"
              stroke="#DDD4C8"
              strokeWidth="1"
            />

            {/* Earcup (With Brass Rings & Cushion) */}
            <g transform="rotate(16 156 156)">
              <ellipse
                cx="156"
                cy="156"
                rx="14"
                ry="22"
                fill="#1F1B18"
                stroke="#DDD4C8"
                strokeWidth="1.6"
              />
              <ellipse
                cx="156"
                cy="156"
                rx="10"
                ry="17"
                fill="#2E2824"
                stroke="#C49B66"
                strokeWidth="1.6"
              />
              <circle cx="156" cy="156" r="5.5" fill="#C49B66" stroke="#DDD4C8" strokeWidth="1.2" />
              <circle cx="156" cy="156" r="2" fill="#F6F3EE" />
            </g>
          </g>

          {/* Floating Sleepy "z z Z" Doodles (When inactive) */}
          {characterState === "sleepy" && (
            <g className="text-[#C49B66]" fill="#C49B66">
              <text x="215" y="90" fontSize="13" fontFamily="monospace" className="buddy-zzz-1">z</text>
              <text x="226" y="78" fontSize="16" fontFamily="monospace" className="buddy-zzz-2">z</text>
              <text x="238" y="64" fontSize="20" fontFamily="monospace" fontWeight="bold" className="buddy-zzz-3">Z</text>
            </g>
          )}

          {/* Floating Music Notes */}
          <g className="buddy-notes">
            <g className="buddy-note-1">
              <path
                d="M 226 100 L 226 84 C 226 84 235 84 238 90"
                fill="none"
                stroke="#C49B66"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <ellipse cx="223" cy="100" rx="3.5" ry="2.6" transform="rotate(-20 223 100)" fill="#C49B66" />
            </g>
            <g className="buddy-note-2">
              <line x1="138" y1="90" x2="138" y2="75" stroke="#DDD4C8" strokeWidth="1.6" strokeLinecap="round" />
              <line x1="148" y1="87" x2="148" y2="72" stroke="#DDD4C8" strokeWidth="1.6" strokeLinecap="round" />
              <line x1="137" y1="75" x2="149" y2="72" stroke="#DDD4C8" strokeWidth="2.4" strokeLinecap="round" />
              <ellipse cx="135" cy="90" rx="3" ry="2.2" transform="rotate(-20 135 90)" fill="#DDD4C8" />
              <ellipse cx="145" cy="87" rx="3" ry="2.2" transform="rotate(-20 145 87)" fill="#DDD4C8" />
            </g>
            <g className="buddy-note-3">
              <line x1="245" y1="115" x2="245" y2="98" stroke="#2E6F52" strokeWidth="1.8" strokeLinecap="round" />
              <ellipse cx="242" cy="115" rx="3.5" ry="2.5" transform="rotate(-20 242 115)" fill="#2E6F52" />
            </g>
          </g>
        </g>

        {/* Arms & Hands (Typing / Flailing / Adjusting) */}
        <g id="arms-and-hands">
          {/* Left Sleeve */}
          <path
            d="M 122 240 C 112 280 128 318 184 332 L 188 322 C 148 310 132 280 140 245 Z"
            fill="url(#jacketGrad)"
            stroke="#DDD4C8"
            strokeWidth="1.6"
          />

          {/* Left Hand */}
          <g
            className={
              characterState === "typing"
                ? "buddy-fast-type-left"
                : characterState === "losing-balance"
                ? ""
                : "buddy-left-hand"
            }
            style={{
              transform: characterState === "losing-balance" ? "translateY(-16px) rotate(-15deg)" : undefined,
              transformOrigin: "184px 326px",
              transition: "transform 0.2s ease-out",
            }}
          >
            <path
              d="M 184 326 C 192 324 204 326 210 330 C 208 335 194 336 186 333 Z"
              fill="url(#skinToneGrad)"
              stroke="#DDD4C8"
              strokeWidth="1.3"
            />
            <path
              d="M 205 329 C 212 328 220 331 222 334 M 202 332 C 210 332 216 335 218 337"
              fill="none"
              stroke="#DDD4C8"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </g>

          {/* Right Sleeve */}
          <path
            d="M 170 236 C 195 260 216 290 252 330 L 244 336 C 210 300 188 270 162 245 Z"
            fill="url(#jacketGrad)"
            stroke="#DDD4C8"
            strokeWidth="1.6"
          />

          {/* Right Hand */}
          <g
            className={
              characterState === "typing"
                ? "buddy-fast-type-right"
                : characterState === "losing-balance"
                ? ""
                : "buddy-right-hand"
            }
            style={{
              transform: characterState === "losing-balance" ? "translateY(-14px) rotate(18deg)" : undefined,
              transformOrigin: "248px 328px",
              transition: "transform 0.2s ease-out",
            }}
          >
            <path
              d="M 248 328 C 255 325 266 327 270 331 C 267 336 254 337 247 334 Z"
              fill="url(#skinToneGrad)"
              stroke="#DDD4C8"
              strokeWidth="1.3"
            />
            <path
              d="M 264 329 C 272 329 278 332 280 335 M 261 333 C 269 333 274 336 276 338"
              fill="none"
              stroke="#DDD4C8"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </g>
        </g>

        {/* Laptop (Tappable for fast typing burst) */}
        <g
          id="laptop"
          onClick={handleLaptopClick}
          className="cursor-pointer group"
          role="button"
          tabIndex={0}
          aria-label="Laptop - Tap to trigger typing flurry"
        >
          {/* Base */}
          <polygon points="206,340 336,340 348,348 196,348" fill="#27221E" stroke="#DDD4C8" strokeWidth="1.5" />
          <polygon points="252,342 292,342 294,346 250,346" fill="#1B1715" stroke="#DDD4C8" strokeWidth="0.9" opacity="0.6" />

          {/* Keys */}
          <g stroke="#C49B66" strokeWidth="1" opacity="0.6" strokeLinecap="round">
            <line x1="216" y1="334" x2="324" y2="334" />
            <line x1="220" y1="337" x2="320" y2="337" />
          </g>

          {/* Screen Display */}
          <polygon points="258,252 358,260 344,341 248,340" fill="#1C1815" stroke="#DDD4C8" strokeWidth="1.6" />
          <polygon points="262,257 353,264 340,336 253,335" fill="#151210" stroke="#DDD4C8" strokeWidth="0.9" />

          {/* Glowing Code Symbol </ > */}
          <g transform="rotate(4 300 295)">
            <path d="M 292 292 L 286 297 L 292 302" fill="none" stroke="#F6F3EE" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="300" y1="304" x2="304" y2="289" stroke="#C49B66" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M 312 292 L 318 297 L 312 302" fill="none" stroke="#F6F3EE" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </g>

          {/* Screen Glow */}
          <polygon
            points="260,256 354,264 390,348 185,348"
            fill="url(#screenGlowGrad)"
            className="buddy-screen-glow"
            style={{ mixBlendMode: "screen", pointerEvents: "none" }}
          />
        </g>
      </svg>

      {/* Interactive Controls Bar (Playful Mascot Actions) */}
      {interactive && (
        <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5 px-2">
          {/* Mobile Phone Tilt Motion Toggle */}
          <button
            onClick={enableMotionSensors}
            className={`px-3 py-1.5 rounded-full text-xs font-mono font-medium flex items-center gap-1.5 transition-all duration-200 border ${
              motionActive
                ? "bg-[#2E6F52] border-[#388563] text-[#F6F3EE] shadow-md shadow-[#2E6F52]/30"
                : "bg-[#1C1815] border-[#F0E6DA]/[0.1] text-[#A09689] hover:text-[#F6F3EE] hover:border-[#C49B66]/40"
            }`}
            title="Tilt your device left and right to balance the character"
            aria-label="Toggle Phone Tilt Motion"
          >
            <Smartphone size={13} className={motionActive ? "animate-pulse" : ""} />
            <span>{motionActive ? "Tilt Sensor: ON" : "📱 Tilt to Balance"}</span>
          </button>

          {/* Quick Interactive Actions */}
          <button
            onClick={handleHeadphonesClick}
            className="px-2.5 py-1.5 rounded-full text-xs font-mono bg-[#1C1815] hover:bg-[#25201C] text-[#C49B66] border border-[#F0E6DA]/[0.08] hover:border-[#C49B66]/40 flex items-center gap-1 transition"
            title="Listen / vibe to beats"
          >
            <Music size={12} />
            <span>Vibe</span>
          </button>

          <button
            onClick={handleLaptopClick}
            className="px-2.5 py-1.5 rounded-full text-xs font-mono bg-[#1C1815] hover:bg-[#25201C] text-[#DDD4C8] border border-[#F0E6DA]/[0.08] hover:border-[#C49B66]/40 flex items-center gap-1 transition"
            title="Typing flurry"
          >
            <Code2 size={12} />
            <span>Code</span>
          </button>

          <button
            onClick={handleCoffeeClick}
            className="px-2.5 py-1.5 rounded-full text-xs font-mono bg-[#1C1815] hover:bg-[#25201C] text-[#DDD4C8] border border-[#F0E6DA]/[0.08] hover:border-[#C49B66]/40 flex items-center gap-1 transition"
            title="Coffee sip"
          >
            <Coffee size={12} />
            <span>Sip</span>
          </button>

          <button
            onClick={() => triggerBalanceLoss(-1)}
            className="px-2.5 py-1.5 rounded-full text-xs font-mono bg-[#1C1815] hover:bg-[#2E1F1A] text-[#C47366] border border-[#F0E6DA]/[0.08] hover:border-[#C47366]/50 flex items-center gap-1 transition"
            title="Test balance loss and recovery"
          >
            <span>🤸 Balance</span>
          </button>
        </div>
      )}
    </div>
  );
}
