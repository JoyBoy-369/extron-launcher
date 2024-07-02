import { cn } from "../../utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";

export const colors = ["#f7d9aa", "#8ac6d1"];

const programs = [
  "ShareLink200/ShareLink.exe",
  "ShareLink Pro/ShareLink Pro.exe",
];

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    logo: string;
    link: string;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const openProgram = async (index: number) => {
    try {
      const programPath = index % 2 === 0 ? programs[0] : programs[1];
      await invoke("open_program", { programName: programPath });
      console.log("Program opened successfully.");
    } catch (error) {
      console.error("Error opening program:", error);
    }
  };

  return (
    <div className={cn(" w-full grid grid-cols-4 py-8", className)}>
      {items.map((item, idx) => (
        <div
          key={item?.link}
          className="relative group  block p-4 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={() => openProgram(idx)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-slate-800 dark:bg-slate-800/[0.8] block  rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card
          // className={
          //   item.link === "embassy"
          //     ? "bg-[#f7d9aa]"
          //     : item.link === "btg"
          //       ? "bg-[#8ac6d1]"
          //       : item.link === "pune"
          //         ? "bg-[#b58fe0]"
          //         : "bg-[#7fc08d]"
          // }
          >
            <CardImage src={item.logo} link={item.link} />
            <CardTitle>{item.title}</CardTitle>

            {/* <CardDescription> */}
            {/*     <p key={room}>{room}</p> */}
            {/* </CardDescription> */}
          </Card>
        </div>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full overflow-hidden border border-transparent dark:border-transparent  group-active:scale-95 group-active:rounded-2xl transform object-cover transition duration-200 relative z-20",
        className,
      )}
    >
      <div className="relative z-50">
        <div className="p-2">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4
      className={cn(
        " text-center text-white dark:text-white  font-bold tracking-wide mt-4",
        className,
      )}
    >
      {children}
    </h4>
  );
};

export const CardImage = ({ src, link }: { src: string; link: string }) => {
  return (
    <img src={src} className={`logo ${link} mx-auto object-cover`} alt="logo" />
  );
};

export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-8 text-[#666666] tracking-wide leading-relaxed ",
        className,
      )}
    >
      {children}
    </p>
  );
};
