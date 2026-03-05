import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ParticlesBackground from "./components/ParticlesBackground.jsx";

import photo1 from "./assets/photos/photo1.jpg";
import photo2 from "./assets/photos/photo2.jpg";
import photo3 from "./assets/photos/photo3.jpg";
import photo4 from "./assets/photos/photo4.jpg";
import photo5 from "./assets/photos/photo5.jpg";
import photo6 from "./assets/photos/photo6.jpg";

import song1 from "./assets/songs/song1.png";
import song2 from "./assets/songs/song2.png";
import song3 from "./assets/songs/song3.png";
import song4 from "./assets/songs/song4.png";
import song5 from "./assets/songs/song5.png";
import song6 from "./assets/songs/song6.png";

import portfolioImg from "./assets/projects/portfolio.png";
import vehicleImg from "./assets/projects/vehicleqr.png";
import slotImg from "./assets/projects/slotfinder.png";

import emailjs from "emailjs-com";

import { 
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaInstagram,
  FaDiscord
} from "react-icons/fa";

import { 
  FaHtml5,
  FaCss3Alt,
  FaJsSquare, 
  FaReact, 
  FaGitAlt,
  FaJava
} from "react-icons/fa";

import { 
  SiC,
  SiCplusplus,
  SiPython 
} from "react-icons/si";

function App() {


  const handleSubmit = (e) => {
  e.preventDefault();

  emailjs.sendForm(
    "service_9rbl0as",
    "template_903rym9",
    e.target,
    "YEv44TDZJ3ekcZ1la"
  ).then(
    (result) => {
      alert(" ✅ Message sent successfully!");
    },
    (error) => {
      alert("Shitt !! ❌  Failed to send message.");
    }
  );

  e.target.reset();
};



  const roles = ["Full Stack Developer", "Problem Solver", "Building Cool Things"];
  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const photos = [photo1, photo2, photo3, photo4, photo5, photo6];

  const songs = [
    { title: "Finding Her", artist: "Kushagra", image: song1, link: "https://open.spotify.com/track/5ThyDv6aRVU8AH4vXQNldF" },
    { title: "Arz Kiya Hai", artist: "Anuv Jain", image: song2, link: "https://open.spotify.com/track/1bMkimTb47umgNP6xCi4A1" },
    { title: "For A Reason", artist: "Karan Ahuja", image: song3, link: "https://open.spotify.com/track/0cYohCh24y1aMjJmcS9RBl" },
    { title: "Dooron Dooron", artist: "Paresh Pahuja", image: song4, link: "https://open.spotify.com/track/0q5e5KtUOhYQujmhLP0pKd" },
    { title: "Faqeeran", artist: "Rashmeet Kaur", image: song5, link: "https://open.spotify.com/track/7DlNgLpxX3gPh3tzqrY7tL" },
    { title: "Sahiba", artist: "Aditya Rakhira", image: song6, link: "https://open.spotify.com/track/0eLtIxPRNJfsmehITZ1qaJ" },
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
    <div className="bg-[#111827] text-white scroll-smooth">


  <Navbar />


      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center px-10 relative overflow-hidden"
      >
        <ParticlesBackground />

        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center max-w-7xl w-full">

          <div>
            <h2 className="text-3xl text-gray-400 mb-2">Hello !!</h2>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              I’m <span className="text-purple-500">Priyanshu Rawat</span>
            </h1>

            <h3 className="text-xl text-gray-400 h-8 mb-6">
              {text}
              <span className="animate-pulse">|</span>
            </h3>

            <a href="#about"
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-full shadow-lg transition duration-300 inline-block">
              About Me ↓
            </a>


          <div className="flex gap-6 mt-8">
  
  <a href="https://linkedin.com" target="_blank"
 className="w-14 h-14 flex items-center justify-center rounded-full bg-[#0f172a] text-cyan-400 hover:scale-110 hover:shadow-[0_0_15px_#22d3ee] transition-all duration-300">
    <FaLinkedin className="text-3xl" />
  </a>

  <a href="https://github.com" target="_blank"
 className="w-14 h-14 flex items-center justify-center rounded-full bg-[#0f172a] text-cyan-400 hover:scale-110 hover:shadow-[0_0_15px_#22d3ee] transition-all duration-300">
    <FaGithub className="text-3xl" />
  </a>

  <a href="https://twitter.com" target="_blank"
 className="w-14 h-14 flex items-center justify-center rounded-full bg-[#0f172a] text-cyan-400 hover:scale-110 hover:shadow-[0_0_15px_#22d3ee] transition-all duration-300">
    <FaTwitter className="text-3xl" />
  </a>

  <a href="https://instagram.com" target="_blank"
  className="w-14 h-14 flex items-center justify-center rounded-full bg-[#0f172a] text-cyan-400 hover:scale-110 hover:shadow-[0_0_15px_#22d3ee] transition-all duration-300">
    <FaInstagram className="text-3xl" />
  </a>

    <a href="https://discord.com" target="_blank"
    className="w-14 h-14 flex items-center justify-center rounded-full bg-[#0f172a] text-cyan-400 hover:scale-110 hover:shadow-[0_0_15px_#22d3ee] transition-all duration-300">
    <FaDiscord className="text-3xl"/>
  </a>

</div>
</div>
          <motion.div
            className="flex justify-center items-center"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <div className="relative">
              <div className="absolute w-112.5 h-112.5 bg-purple-600 blur-[180px] opacity-40 rounded-full"></div>
              <img
                src={photo1}
                alt="profile"
                className="relative w-72 h-72 object-cover rounded-full border-4 border-purple-500 shadow-2xl"
              />
            </div>
          </motion.div>

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

<div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-12">

  {/* Left Side - Photo */}
  <div className="shrink-0">
    <img
      src={photo6}   // tum already photo1 import kar rahe ho upar
      alt="Priyanshu Rawat"
      className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-2xl border-4 border-purple-400 shadow-xl"
    />
  </div>

  {/* Right Side - Text */}
  <div className="text-center md:text-left">

    <h2 className="text-6xl font-bold mb-16 text-purple-500">
      👤About Me
    </h2>

    <h3 className="text-3xl md:text-4xl font-bold text-white mb-8">
      Priyanshu Rawat🧑‍🎓
    </h3>
    
   <p className="text-gray-300 text-lg leading-relaxed mb-2">
      Hello Sir 😊 !
    </p>
    
    <p className="text-gray-300 text-lg leading-relaxed mb-4">
      I'm Priyanshu Rawat, a Computer Science & Engineering student who loves turning ideas
      into real, working applications. I enjoy building practical projects that solve real-world
      problems while combining creativity with functionality.
    </p>

    <p className="text-gray-300 text-lg leading-relaxed mb-4">
      I may not be at a big position yet & still in the learning phase of my journey, but I am learning,
      improving, and pushing myself to grow every day.
      Every project I build helps me improve my skills and understand technology more deeply.
    </p>

    <p  className="text-gray-400 mt-4 leading-relaxed mb-4">
     Whether I’m working on a web project or contributing to something meaningful, 
     I always focus on learning and improving my skills. 
     My goal is to continue growing as a developer and make a positive impact through technology.
     </p>

     <p className="text-gray-400 mt-4 leading-relaxed mb-4">
       Currently exploring React, UI/UX design, and creative
      front-end interactions.
      </p>

    <div className="mt-6 text-gray-400 space-y-2">
      <p>
     📧 <span className="text-blue-400 font-medium">Email :</span> priyanshurawat087@gmail.com
      </p>

      <p>
      📍 <span className="text-blue-400 font-medium">From :</span> Uttarakhand, India
      </p>
    </div>

  </div>

</div>


</motion.section>




      {/* Skills Section */}
{/* Skills Section */}
<motion.section
  id="skills"
  className="min-h-screen flex flex-col items-center justify-center px-6"
  variants={sectionVariant}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
  <h2 className="text-4xl font-bold mb-4 bg-linear-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
    ⏻ Skills & Technologies
  </h2>

  <p className="text-gray-400 mb-12 text-center max-w-xl">
    Technologies and programming languages I use to build efficient and modern applications.
  </p>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
    {[
      { name: "HTML", icon: <FaHtml5 />, color: "text-orange-500" },
      { name: "CSS", icon: <FaCss3Alt />, color: "text-blue-400" },
      { name: "C", icon: <SiC />, color: "text-blue-400" },
      { name: "C++", icon: <SiCplusplus />, color: "text-blue-500" },
      { name: "Java", icon: <FaJava />, color: "text-red-500" },
      { name: "Python", icon: <SiPython />, color: "text-yellow-400" },
      { name: "JavaScript", icon: <FaJsSquare />, color: "text-yellow-500" },
      { name: "React", icon: <FaReact />, color: "text-cyan-400" },
      { name: "Git", icon: <FaGitAlt />, color: "text-orange-500" },
    ].map((skill, index) => (
      <motion.div
        key={index}
        whileHover={{ y: -8 }}
        className="bg-white/5 backdrop-blur-lg px-8 py-6 rounded-2xl 
        border border-purple-500/20 text-center 
        transition-all duration-300 cursor-pointer 
        hover:shadow-[0_0_25px_rgba(168,85,247,0.4)]"
      >
        <div className={`text-4xl mb-4 ${skill.color}`}>
          {skill.icon}
        </div>

        <h3 className="text-lg font-semibold text-white">
          {skill.name}
        </h3>
      </motion.div>
    ))}
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
            <div className="grid md:grid-cols-3 gap-12 mt-10">

            <div className="p-6 rounded-xl bg-[#0f172a] border border-purple-500/40 hover:border-purple-500 hover:scale-105 hover:shadow-xl transition duration-300">
            
            <img
              src={portfolioImg}
              className="rounded-lg mb-4 w-full h-40 object-cover transition duration-300 hover:scale-105"
            />

            
            <h3 className="text-2xl font-bold mb-3">
              Personal Portfolio Website</h3>
           <p className="text-gray-400 text-sm leading-relaxed mb-5">
            Responsive personal portfolio website that showcase my all details.
            </p>
            <div className="flex gap-3">
           <a
            href="https://github.com/yourproject"
            target="_blank"
            className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700"
            >
            GitHub
            </a>

            <a
            href="#"
            className="px-4 py-2 border border-purple-500 rounded-lg hover:bg-purple-500"
            >
            Live Demo
            </a>

            </div>
            </div>

            <div className="p-6 rounded-xl bg-[#0f172a] border border-purple-500/40 hover:border-purple-500 hover:scale-105 hover:shadow-xl transition duration-300">
            
            <img
              src={vehicleImg}
              className="rounded-lg mb-4 w-full h-40 object-cover transition duration-300 hover:scale-105"
            />

            
            <h3 className="text-2xl font-bold mb-3">
              Smart Vehicle QR System
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
            A smart QR-based vehicle system that provides emergency assistance and vehicle information instantly by scanning a QR code.
            </p>
            <div className="flex gap-3">

            <a
            href="https://github.com/yourproject"
            target="_blank"
            className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700"
            >
            GitHub
            </a>

            <a
            href="#"
            className="px-4 py-2 border border-purple-500 rounded-lg hover:bg-purple-500"
            >
            Live Demo
            </a>
            </div>
            </div>

            <div className="p-6 rounded-xl bg-[#0f172a] border border-purple-500/40 hover:border-purple-500 hover:scale-105 hover:shadow-xl transition duration-300">
           
            <img
              src={slotImg}
              className="rounded-lg mb-4 w-full h-40 object-cover transition duration-300 hover:scale-105"
            
            />
           
            <h3 className="text-2xl font-bold mb-3">
              Free Slot Finder Portal </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
            A portal that helps students find available classrooms and check teacher availability in real time.
            </p>
            <div className="flex gap-3">
           
            <a
            href="https://github.com/yourproject"
            target="_blank"
            className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700"
            >
            GitHub
            </a>
            <a
            href="#"
            className="px-4 py-2 border border-purple-500 rounded-lg hover:bg-purple-500"
            >
            Live Demo
            </a>
            
            </div>

          </div>
          </div>
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
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen flex flex-col items-center justify-center px-6 bg-[#0f172a]"
      >
        <h2 className="text-4xl font-bold text-purple-500 mb-6">
          Get In Touch
        </h2>
      
        <p className="text-gray-400 text-center max-w-xl mb-8">
          I'm always open to collaborations, internships, and exciting tech opportunities. Feel free to reach out !! 🚀
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">

<input
name="name"
type="text"
placeholder="Your Name"
className="w-full px-4 py-3 bg-[#0f172a] border border-purple-500/40 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
/>

<input
name="email"
type="email"
placeholder="Your Email"
className="w-full px-4 py-3 bg-[#0f172a] border border-purple-500/40 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
/>

<textarea
name="message"
placeholder="Your Message"
rows="4"
className="w-full px-4 py-3 bg-[#0f172a] border border-purple-500/40 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
/>

<button
type="submit"
className="w-full py-3 bg-linear-to-r from-purple-600 to-purple-800 rounded-lg hover:opacity-90 transition"
>
Send Message
</button>

</form>
    
          <div className="grid grid-cols-2 gap-4 mt-8 justify-center">
          
          <a
            href="mailto:priyanshurwt28@gmail.com"
            className="bg-[#111827] px-6 py-3 border border-purple-500 rounded-lg hover:bg-purple-600 hover:text-white transition duration-300"
          >
            📧 Email Me
          </a>
      
          <a
            href="https://github.com/priyanshurawat15-dev"
            target="_blank"
            className="bg-[#111827] px-6 py-3 border border-purple-500 rounded-lg hover:bg-purple-600 hover:text-white transition duration-300"
          >
            💻 GitHub
          </a>

          
          <a
            href="https://instagram.com/priyanshurawat_15"
            target="_blank"
            className="bg-[#111827] px-6 py-3 border border-purple-500 rounded-lg hover:bg-purple-600 hover:text-white transition duration-300"
          >
            📱 Instagram
          </a>
      
          <a
            href="https://linkedin.com/in/priyanshurawat15/"
            target="_blank"
            
            className="bg-[#111827] px-6 py-3 border border-purple-500 rounded-lg hover:bg-purple-600 hover:text-white transition duration-300"
          >
            🔗 LinkedIn
          </a>
      
        </div>
      </motion.section>


      {/* Footer */}
<footer className="bg-[#020617] text-gray-300 px-10 py-14">
  <div className="grid md:grid-cols-3 gap-10">

    <div>
      <p className="text-lg leading-relaxed">
        Thank you for visiting my personal portfolio website.
        Connect with me over socials.
      </p>
    </div>

    <div>
      <h3 className="text-2xl font-semibold text-white mb-4">
        Quick Links
      </h3>
      <ul className="space-y-2">
        <li><a href="#home" className="hover:text-purple-400">Home</a></li>
        <li><a href="#about" className="hover:text-purple-400">About</a></li>
        <li><a href="#projects" className="hover:text-purple-400">Projects</a></li>
        <li><a href="#gallery" className="hover:text-purple-400">Gallery</a></li>
        <li><a href="#songs" className="hover:text-purple-400">Songs</a></li>
        <li><a href="#contact" className="hover:text-purple-400">Contact</a></li>
      </ul>
    </div>

    <div>
      <h3 className="text-2xl font-semibold text-white mb-4">
        Contact Info
      </h3>
      <ul className="space-y-3">
        <li>☎️ +91 9634511431</li>
        <li>📧 priyanshurwt28@gmail.com</li>
        <li>🗺️ Uttarakhand, India</li>
      </ul>

      <div className="flex gap-4 mt-6">
        <a href="https://instagram.com/priyanshurawat_15" target="_blank" className="bg-white text-black px-3 py-2 rounded-full hover:bg-purple-500 hover:text-white transition">
          IG
          </a>


        <a href="https://linkedin.com/in/priyanshurawat15/" target="_blank" className="bg-white text-black px-3 py-2 rounded-full hover:bg-purple-500 hover:text-white transition">
          in
        </a>
        <a href="https://github.com/priyanshurawat15-dev" target="_blank" className="bg-white text-black px-3 py-2 rounded-full hover:bg-purple-500 hover:text-white transition">
          GH
        </a>
      </div>
    </div>

  </div>
  
  <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm">
  © {new Date().getFullYear()} All Rights Reserved  
  <br />
  <span className="font-bold">Designed by Priyanshu Rawat</span> | March 2026
</div>


</footer>


    </div>
  );
}

export default App;