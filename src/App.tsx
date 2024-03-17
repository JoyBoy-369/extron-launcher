import { HoverEffect } from "./components/ui/card-hover-effect";
import "./App.css";

function App() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center">
        <div className="max-w-3xl mx-auto px-16">
          <HoverEffect items={projects} />
        </div>
      </div>
    </div>
  );
}

export default App;

export const projects = [
  {
    title: "App 1",
    logo: "./react.svg",
    link: "react",
    rooms: ["EC 1 & 2", "Pune Congo 5th,6th floor"],
  },
  {
    title: "App 2",
    logo: "./vite.svg",
    link: "vite",
    rooms: ["BTG", "Pune Congo 7th floor"],
  },
];
