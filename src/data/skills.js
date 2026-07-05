// Yeh file meri skills ko store karti hai
// Frontend, Backend aur Tools categories mein divide kiya hai

export const skills = {
  // Frontend skills - Jo website ke front par kaam karte hain
  frontend: [
    { name: "React", level: 90, icon: "⚛️" }, // Skill ka naam, percentage aur icon
    { name: "Tailwind CSS", level: 95, icon: "🎨" },
    { name: "TypeScript", level: 80, icon: "📘" },
    { name: "JavaScript", level: 92, icon: "💛" }
  ],
  
  // Backend skills - Jo server-side par kaam karte hain
  backend: [
    { name: "Python", level: 75, icon: "🐍" },
    { name: "MongoDB", level: 80, icon: "🍃" },
     { name: "ML", level: 80, icon: "🍃" },
    { name: "Firebase", level: 85, icon: "🔥" }
  ],
  
  // Tools - Jo development mein use karte hain
  tools: [
    { name: "Git & Github", level: 90, icon: "🔀" },
    { name: "AWS", level: 65, icon: "☁️" },
    { name: "Figma", level: 75, icon: "🎯" },
    { name: "VS Code", level: 95, icon: "💻" }
  ]
};