import { HoverEffect } from "./components/ui/card-hover-effect";
import "./App.css";

function App() {
  return (
    <div className="relative flex justify-center h-screen">
      <div className="absolute top-0 w-full bg-black p-8 z-10">
        <img
          className=" w-24 h-auto object-cover mx-auto"
          src="./mb-logo.png"
          alt="mb logo image"
        />
      </div>
      <img
        className=" w-full object-cover "
        src="./background.jpg"
        alt="background image"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="absolute bottom-0 flex w-full  bg-black px-16 ">
        <HoverEffect items={projects} />
      </div>
      <div className="absolute bottom-0 right-0">
        <img
          className=" w-24 h-auto object-cover "
          src="./io-logo.png"
          alt="io logo image"
        />
      </div>
    </div>
  );
}

export default App;

export const projects = [
  {
    title: "Embassy Crest",
    logo: "./icon.png",
    link: "embassy",
  },
  {
    title: "BTG",
    logo: "./icon.png",
    link: "btg",
  },
  {
    title: "Pune 4,5 & 6",
    logo: "./icon.png",
    link: "pune",
  },
  {
    title: "Pune 7th floor",
    logo: "./icon.png",
    link: "7th",
  },
];
