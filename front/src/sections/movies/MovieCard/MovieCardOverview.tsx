import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

import { MovieProps } from "../types";

interface Props {
  movie: MovieProps;
  isExpanded: boolean;
  onToggleExpand: VoidFunction;
}

export default function MovieCardOverview({
  movie,
  isExpanded,
  onToggleExpand,
}: Props) {
  const { overview } = movie;

  const contentVariants = {
    collapsed: {
      opacity: 0.8,
      height: "2.75em",
    },
    expanded: {
      opacity: 1,
      height: "auto",
    },
  };

  return (
    <div className="space-y-2">
      <button
        onClick={onToggleExpand}
        className="w-full cursor-pointer text-left text-gray-200"
        aria-expanded={isExpanded}
      >
        <AnimatePresence initial={false}>
          <motion.div
            initial="collapsed"
            animate={isExpanded ? "expanded" : "collapsed"}
            exit="collapsed"
            variants={contentVariants}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-sm">{overview}</p>
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="mt-1 flex items-center gap-1 text-sm text-gray-400 hover:text-gray-200"
          whileHover={{ scale: 1.02 }}
        >
          {isExpanded ? (
            <>
              <ChevronUp className="size-4" />
              <span>Show less</span>
            </>
          ) : (
            <>
              <ChevronDown className="size-4" />
              <span>Show more</span>
            </>
          )}
        </motion.div>
      </button>
    </div>
  );
}
