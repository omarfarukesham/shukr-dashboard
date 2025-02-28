import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface StickyNote {
  id: number;
  title: string;
  content: string[];
  color: string;
  x: string;
  y: string;
  rotate: string;
}

const servicesData = [
  {
    title: "Web Applications",
    content: ["Custom & Ready Solutions", "LMS, CRM, AI Chatbot"]
  },
  {
    title: "E-commerce & Marketplace",
    content: [
      "Custom built solution",
      "Multi-vendor Marketplace",
      "Headless commerce solutions",
      "Deployment and maintenance"
    ]
  },
  {
    title: "Mobile App Development",
    content: [
      "Android & iOS",
      "API integrations",
      "Payment gateway integration",
      "Push notifications"
    ]
  },
  {
    title: "UI/UX Design",
    content: [
      "Web or mobile custom design",
      "Built in Solutions for fast delivery"
    ]
  },
  {
    title: "Bug Fixing/Support",
    content: [
      "Web or bug fixing",
      "Fast support",
      "Maintenance"
      
    ]
  },
  {
    title: "Digital Consultancy",
    content: [
      "Startup full digital consultance",
      "Unfinished products consultance",
      "Requirement Analysis",
      "Service refactor and AI driven Solutions"
    ]
  }
];

const PIN_COLORS = ["#D32F2F", "#1976D2", "#388E3C", "#FBC02D", "#7B1FA2"];

const generateRandomPosition = () => ({
  x: `${Math.random() * 60 + 10}%`,
  y: `${Math.random() * 60 + 10}%`,
  rotate: `${Math.random() * 10 - 5}deg`
});

const Pin = ({ color }: { color: string }) => (
  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
    <div 
      className="w-3 h-3 rounded-full shadow-md"
      style={{ backgroundColor: color }}
    />
    <div 
      className="w-1 h-4 absolute left-1 top-2 transform -rotate-15"
      style={{ backgroundColor: `${color}88` }}
    />
  </div>
);

const StickyNoteHero = () => {
  const [notes, setNotes] = useState<StickyNote[]>([]);

  useEffect(() => {
    const showRandomNotes = () => {
      const shuffled = [...servicesData]
        .sort(() => Math.random() - 0.5)
        .slice(0, 3) // Show only 3 notes
        .map((service, index) => ({
          id: index,
          title: service.title,
          content: service.content,
          color: `hsl(${Math.random() * 60 + 30}, 100%, 90%)`,
          ...generateRandomPosition()
        }));
      setNotes(shuffled);
    };

    showRandomNotes();
    const interval = setInterval(showRandomNotes, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-7xl mx-auto px-4">
      {/* Left side - Image */}
      <div className="flex items-center justify-center">
        <img 
          src="/path-to-your-image.svg" 
          alt="Hero illustration" 
          className="w-full max-w-md"
        />
      </div>

      {/* Right side - Notice Board */}
      <div className="relative w-full h-[500px] max-h-[500px] p-4"
        style={{
          backgroundColor: '#8B4513',
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(0,0,0,0.1) 2px, transparent 3px),
            repeating-linear-gradient(45deg, rgba(0,0,0,0.1) 0, rgba(0,0,0,0.1) 1px, transparent 1px, transparent 4px)
          `,
        }}>
        <div className="absolute inset-2 border-4 lg:border-8 border-[#A0522D] rounded-lg shadow-inner bg-[#DEB887] overflow-hidden">
          <div className="relative w-full h-full">
            <AnimatePresence>
              {notes.map((note) => (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  whileHover={{ scale: 1.05, zIndex: 10 }}
                  drag
                  dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
                  style={{
                    position: 'absolute',
                    left: note.x,
                    top: note.y,
                    rotate: note.rotate,
                    backgroundColor: note.color,
                  }}
                  className="w-48 lg:w-56 p-4 rounded shadow-lg cursor-move transform"
                >
                  <Pin color={PIN_COLORS[note.id % PIN_COLORS.length]} />
                  <div className="bg-gradient-to-b from-white/20 to-transparent absolute inset-0 rounded" />
                  <h3 className="text-base lg:text-lg font-bold mb-2 text-gray-800">{note.title}</h3>
                  <ul className="list-disc ml-4 space-y-1">
                    {note.content.slice(0, 3).map((item, idx) => (
                      <li key={idx} className="text-xs lg:text-sm text-gray-700">
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyNoteHero;