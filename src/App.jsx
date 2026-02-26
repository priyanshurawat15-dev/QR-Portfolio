import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import photo1 from "./assets/photos/photo1.jpg";
import photo2 from "./assets/photos/photo2.jpg";
import photo3 from "./assets/photos/photo3.jpg";
import photo4 from "./assets/photos/photo4.jpg";

import song1 from "./assets/songs/song1.png";
import song2 from "./assets/songs/song2.png";
import song3 from "./assets/songs/song3.png";
import song4 from "./assets/songs/song4.png";
import song5 from "./assets/songs/song5.png";
import song6 from "./assets/songs/song6.png";

function App() {
  const roles = ["Full Stack Developer", "Problem Solver", "Building Cool Things"];
  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const photos = [photo1, photo2, photo3, photo4];

  const songs = [
  {
    title: "Finding Her",
    artist: "Kushagra ",
    image: song1,
    link: "https://open.spotify.com/track/5ThyDv6aRVU8AH4vXQNldF?si=e60699c27c1c4b4e"
  },
  {
    title: "Arz Kiya Hai",
    artist: "Anuv Jain",
    image: song2,
    link: "https://open.spotify.com/track/1bMkimTb47umgNP6xCi4A1?si=f1c73d104f474954"
  },
  {
    title: "For A Reason",
    artist: "Karan Ahuja",
    image: song3,
    link: "https://open.spotify.com/track/0cYohCh24y1aMjJmcS9RBl?si=1bfb2864ee4d4c8c"
  },
  {
    title: "Dooron Dooron",
    artist: "Paresh Pahuja",
    image: song4,
    link: "https://open.spotify.com/track/0q5e5KtUOhYQujmhLP0pKd?si=2d5e4be01a2d405b"
  },
  {
    title: "Faqeeran",
    artist: "Rashmeet Kaur",
    image: song5,
    link: "https://open.spotify.com/track/7DlNgLpxX3gPh3tzqrY7tL?si=d62701de326b4162"
  },
  {
    title: "Sahiba",
    artist: "Aditya Rakhira",
    image: song6,
    link: "https://open.spotify.com/track/0eLtIxPRNJfsmehITZ1qaJ?si=7c4013dd33534c1e"
  },
];
const [active, setActive] = useState(0);
useEffect(() => {
  const interval = setInterval(() => {
    setActive((prev) => (prev + 1) % songs.length);
  }, 3000);

  return () => clearInterval(interval);
}, [songs.length]);


  useEffect(() => {
    const timeout = setTimeout(() => {
      if (charIndex < roles[roleIndex].length) {
        setText((prev) => prev + roles[roleIndex][charIndex]);
        setCharIndex(charIndex + 1);
      } else {
        setTimeout(() => {
          setText("");
          setCharIndex(0);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }, 1500);
      }
    }, 80);

    return () => clearTimeout(timeout);
  }, [charIndex, roleIndex]);

  const sectionVariant = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div className="bg-[#0B0F19] text-white scroll-smooth">

      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-black/40 backdrop-blur-md py-4 px-10 flex justify-between items-center z-50">
        <h1 className="text-xl font-bold text-purple-500">PR</h1>
        <div className="space-x-6 text-gray-300">
          <a href="#home" className="hover:text-purple-400">Home</a>
          <a href="#about" className="hover:text-purple-400">About</a>
          <a href="#projects" className="hover:text-purple-400">Projects</a>
          <a href="#contact" className="hover:text-purple-400">Contact</a>
          <a href="#gallery" className="hover:text-purple-400">Gallery</a>
          <a href="#songs" className="hover:text-purple-400">Songs</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center text-center px-6">
        <div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            I’m <span className="text-purple-500">Priyanshu Rawat</span>
          </h1>

          <h2 className="text-xl md:text-2xl text-gray-400 h-10">
            {text}
            <span className="animate-pulse">|</span>
          </h2>

          <div className="mt-10">
            <button className="px-6 py-3 border border-purple-500 text-purple-400 rounded-full hover:bg-purple-600 hover:text-white transition duration-300">
              Download Resume
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <motion.section
        id="about"
        className="min-h-screen flex items-center justify-center px-6"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-3xl text-center">
          <h2 className="text-4xl font-bold mb-6 text-purple-500">About Me</h2>
          <p className="text-gray-400 text-lg">
            I am a BTech CSE student passionate about building real-world projects.
            I enjoy working with React, backend systems, and solving complex problems.
          </p>
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section
        id="projects"
        className="min-h-screen flex items-center justify-center px-6"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-10 text-purple-500">Projects</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 border border-purple-500 rounded-xl hover:scale-105 transition">
              <h3 className="text-2xl font-semibold mb-3">Smart Vehicle QR</h3>
              <p className="text-gray-400">QR-based vehicle emergency assistance system.</p>
            </div>

            <div className="p-6 border border-purple-500 rounded-xl hover:scale-105 transition">
              <h3 className="text-2xl font-semibold mb-3">Slot Finder</h3>
              <p className="text-gray-400">Find free classroom slots and teacher availability.</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* About Section */}
<motion.section
  id="about"
  className="min-h-screen flex items-center justify-center px-6"
  variants={sectionVariant}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
  <div className="max-w-4xl text-center">
    <h2 className="text-4xl font-bold mb-6 text-purple-500">
      About Me
    </h2>

    <p className="text-gray-300 leading-relaxed text-lg">
      I'm a BTech CSE student passionate about building modern web
      applications and experimenting with UI animations.
      I love creating clean digital experiences and exploring
      new technologies.
    </p>

    <p className="text-gray-400 mt-6">
      Currently exploring React, UI/UX design, and creative
      front-end interactions.
    </p>
  </div>
</motion.section>

{/* Skills Section */}
<motion.section
  id="skills"
  className="min-h-screen flex flex-col items-center justify-center px-6"
  variants={sectionVariant}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
  <h2 className="text-4xl font-bold mb-10 text-purple-500">
    Skills
  </h2>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
    {["HTML", "CSS", "JavaScript", "React", "Tailwind", "Node.js", "Git", "UI/UX"].map(
      (skill, index) => (
        <div
          key={index}
          className="bg-[#111827] px-6 py-4 rounded-xl border border-purple-500/30 hover:scale-110 transition duration-300"
        >
          {skill}
        </div>
      )
    )}
  </div>
</motion.section>
      
      {/* Gallery Section */}
      <motion.section
        id="gallery"
        className="min-h-screen flex items-center justify-center px-6"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl w-full text-center">
          <h2 className="text-4xl font-bold mb-10 text-purple-500">
            My Moments 📸
          </h2>
      
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {photos.map((photo, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-xl border border-purple-500/30 hover:scale-105 transition duration-500"
              >
                <img
                  src={photo}
                  alt="gallery"
                  className="w-96 full h-64 object-cover hover:scale-110 transition duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </motion.section>



      {/* Songs Section */}
{/* 3D Songs Carousel */}

{/* Premium 3D Songs Carousel */}
<motion.section
  id="songs"
  className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden"
  variants={sectionVariant}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
  {/* Blur Background */}
  <div
    className="absolute inset-0 transition-all duration-700"
    style={{
      backgroundImage: `url(${songs[active].image})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      filter: "blur(80px)",
      opacity: 0.25,
    }}
  />

  <div className="relative max-w-6xl w-full text-center">
    <h2 className="text-4xl font-bold mb-12 text-purple-500">
      My Favorite Tracks 🎵
    </h2>

    <div className="flex items-center justify-center gap-10 perspective-1000">
      {songs.map((song, index) => {
        const offset = index - active;
        const isActive = index === active;

        return (
          <motion.a
            key={index}
            href={song.link}
            target="_blank"
            rel="noopener noreferrer"
            animate={{
              scale: isActive ? 1.2 : 0.85,
              rotateY: offset * 25,
              opacity: Math.abs(offset) > 2 ? 0 : 1,
            }}
            transition={{ duration: 0.6 }}
            className={`w-64 bg-[#111827] p-4 rounded-xl border ${
              isActive
                ? "border-purple-500 shadow-[0_0_40px_rgba(168,85,247,0.7)]"
                : "border-purple-500/30"
            }`}
            style={{ transformStyle: "preserve-3d" }}
          >
            <img
              src={song.image}
              alt={song.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-semibold">{song.title}</h3>
            <p className="text-gray-400 text-sm">{song.artist}</p>
          </motion.a>
        );
      })}
    </div>
  </div>
</motion.section>



      {/* Contact Section */}
      <motion.section
        id="contact"
        className="min-h-screen flex items-center justify-center px-6"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-6 text-purple-500">Contact Me</h2>
          <p className="text-gray-400">Email: yourmail@example.com</p>
        </div>
      </motion.section>

    </div>
  );
}

export default App;