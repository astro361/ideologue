"use client";

import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface IdeaCardProps {
  idea: {
    id: string;
    title: string;
    teaser: string;
    tags?: string[];
    upvoteCount: number;
    userName?: string | null;
    userImage?: string | null;
    createdAt: Date | string;
  };
  onUpvote?: (ideaId: string) => Promise<void>;
  hasUpvoted?: boolean;
}

const TAG_COLORS = [
  "accent-charcoal-soft",
  "accent-slate-soft",
  "accent-sage-soft",
];

export default function IdeaCard({ idea, onUpvote, hasUpvoted = false }: IdeaCardProps) {
  const [isUpvoted, setIsUpvoted] = useState(hasUpvoted);
  const [upvoteCount, setUpvoteCount] = useState(idea.upvoteCount);
  const [isPulsing, setIsPulsing] = useState(false);

  const handleUpvote = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsPulsing(true);
    setTimeout(() => setIsPulsing(false), 600);

    setIsUpvoted(!isUpvoted);
    setUpvoteCount(isUpvoted ? upvoteCount - 1 : upvoteCount + 1);

    if (onUpvote) {
      await onUpvote(idea.id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group h-full"
    >
      <Link href={`/idea/${idea.id}`} className="block h-full">
        <div className="glass-card glass-card-hover rounded-2xl p-8 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-start justify-between gap-6 mb-4">
            <h3 className="text-xl font-semibold text-slate-900 group-hover:text-slate-600 smooth-transition line-clamp-2 heading-premium flex-1">
              {idea.title}
            </h3>
            <motion.button
              onClick={handleUpvote}
              animate={isPulsing ? { scale: [1, 1.2, 1] } : {}}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full smooth-transition ${
                isUpvoted
                  ? "accent-charcoal text-white"
                  : "bg-white/50 border border-slate-200 text-slate-600 hover:bg-white hover:border-slate-300"
              }`}
            >
              <ArrowUp className={`w-4 h-4 ${isUpvoted ? "fill-current" : ""}`} />
              <span className="text-sm font-medium">{upvoteCount}</span>
            </motion.button>
          </div>

          {/* Teaser */}
          <p className="text-slate-600 text-sm mb-6 line-clamp-2 text-premium flex-grow">{idea.teaser}</p>

          {/* Tags */}
          {idea.tags && idea.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {idea.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium uppercase-premium ${
                    TAG_COLORS[index % TAG_COLORS.length]
                  }`}
                >
                  {tag}
                </span>
              ))}
              {idea.tags.length > 3 && (
                <span className="px-3 py-1.5 rounded-full text-xs font-medium uppercase-premium bg-slate-100/50 text-slate-500">
                  +{idea.tags.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center gap-3 text-xs text-slate-500 pt-4 border-t border-slate-100">
            {idea.userImage ? (
              <img
                src={idea.userImage}
                alt={idea.userName || "User"}
                className="w-6 h-6 rounded-full border border-slate-200"
              />
            ) : (
              <div className="w-6 h-6 rounded-full bg-slate-200"></div>
            )}
            <span className="font-medium">{idea.userName || "Anonymous"}</span>
            <span className="text-slate-300">·</span>
            <span className="uppercase-premium text-[0.65rem]">
              {new Date(idea.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
