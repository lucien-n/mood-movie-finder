"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

const iconVariants = {
  initial: { scale: 0, rotate: -90, opacity: 0 },
  animate: { scale: 1, rotate: 0, opacity: 1 },
  exit: { scale: 0, rotate: 90, opacity: 0 },
};

export default function Lightswitch() {
  const { setTheme, theme, themes } = useTheme();

  const handleToggleTheme = () => {
    const currentIndex = themes.indexOf(theme || "system");
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleToggleTheme}
        className="relative z-10 cursor-pointer"
      >
        <AnimatePresence mode="popLayout">
          <motion.span
            key={theme}
            variants={iconVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 25,
              duration: 0.15,
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {theme === "light" && <Sun className="h-[1.2rem] w-[1.2rem]" />}
            {theme === "dark" && <Moon className="h-[1.2rem] w-[1.2rem]" />}
            {theme === "system" && (
              <Monitor className="h-[1.2rem] w-[1.2rem]" />
            )}
          </motion.span>
        </AnimatePresence>
        <span className="sr-only">Toggle theme</span>
      </Button>
    </motion.div>
  );
}
