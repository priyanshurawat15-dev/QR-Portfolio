import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-black/40 backdrop-blur-md text-white">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        
        <h1 className="text-2xl font-bold text-purple-500">
          P.Rawat
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#gallery">Gallery</a></li>
          <li><a href="#songs">Songs</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

        {/* Mobile Icon */}
        <div className="md:hidden">
          {isOpen ? (
            <X size={28} onClick={() => setIsOpen(false)} />
          ) : (
            <Menu size={28} onClick={() => setIsOpen(true)} />
          )}
        </div>
      </div>

      {/* Overlay */}
      
      {isOpen && (
       
<div
 className="fixed inset-0 bg-black/80 z-40"

  onClick={() => setIsOpen(false)}
/>
      )}


      {/* Right Side Drawer */}
      <div
      className={`fixed top-0 right-0 h-full w-35 z-50
bg-[#0f172a]
border-l border-purple-500/20
shadow-2xl
transition-transform duration-300
${isOpen ? "translate-x-0" : "translate-x-full"}
md:hidden`}
      >


        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-purple-400">Menu</h2>
          <X size={24} onClick={() => setIsOpen(false)} />
        </div>

        <div className="flex flex-col mt-6 space-y-6 px-6 text-lg">
          <a href="#home" onClick={() => setIsOpen(false)}>Home</a>
          <a href="#about" onClick={() => setIsOpen(false)}>About</a>
          <a href="#projects" onClick={() => setIsOpen(false)}>Projects</a>
          <a href="#gallery" onClick={() => setIsOpen(false)}>Gallery</a>
          <a href="#songs" onClick={() => setIsOpen(false)}>Songs</a>
          <a href="#contact" onClick={() => setIsOpen(false)}>Contact</a>
        </div>
      </div>
    </nav>
  );
}

// {/* Navbar */}
// <nav className="fixed top-0 w-full bg-white/5 backdrop-blur-lg border-b border-white/10 py-4 px-10 flex justify-between items-center z-50">
//   <h1 className="text-xl font-bold text-purple-500">P.Rawat 🌋</h1>
//   <div className="space-x-6 text-gray-300">
//     <a href="#home" className="hover:text-purple-400">Home</a>
//     <a href="#about" className="hover:text-purple-400">About</a>
//     <a href="#projects" className="hover:text-purple-400">Projects</a>
//     <a href="#contact" className="hover:text-purple-400">Contact</a>
//     <a href="#gallery" className="hover:text-purple-400">Gallery</a>
//     <a href="#songs" className="hover:text-purple-400">Songs</a>
//   </div>
// </nav>