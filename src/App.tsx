import { HoverEffect } from "./components/ui/card-hover-effect";
import "./App.css";

function App() {
  return (
    <div className="flex justify-center h-screen">
      <div className="flex flex-col">
        <img
          className="h-2/3 w-full object-cover object-center"
          src="./background.png"
          alt="background image"
        />
        <div className=" px-16">
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
    logo: "./one.png",
    link: "embassy",
  },
  {
    title: "BTG",
    logo: "./two.png",
    link: "btg",
  },
  {
    title: "Pune 4,5 & 6",
    logo: "./three.png",
    link: "pune",
  },
  {
    title: "Pune 7th floor",
    logo: "./four.png",
    link: "7th",
  },
];
