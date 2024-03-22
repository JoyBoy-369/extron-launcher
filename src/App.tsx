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
    title: "Embassy Crest",
    logo: "./react.svg",
    link: "embassy",
  },
  {
    title: "BTG",
    logo: "./vite.svg",
    link: "btg",
  },
  {
    title: "Pune 4,5 & 6",
    logo: "./react.svg",
    link: "pune",
  },
  {
    title: "Pune 7th floor",
    logo: "./vite.svg",
    link: "7th",
  },
];
