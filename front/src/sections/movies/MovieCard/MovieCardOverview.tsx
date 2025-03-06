import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Props {
  overview: string;
  isExpanded: boolean;
  onToggleExpand: VoidFunction;
}

export default function MovieCardOverview({
  overview,
  isExpanded,
  onToggleExpand,
}: Props) {
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
        className="w-full text-left text-gray-200 cursor-pointer"
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
          className="flex items-center gap-1 mt-1 text-sm text-gray-400 hover:text-gray-200"
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
