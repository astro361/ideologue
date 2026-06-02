"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowUp, MessageCircle, Edit2, Trash2, Users } from "lucide-react";
import { motion } from "framer-motion";

interface Idea {
  id: string;
  title: string;
  teaser: string;
  fullStrategy: string;
  tags?: string[];
  teamRoles?: string;
  upvoteCount: number;
  userId: string;
  userName?: string | null;
  userImage?: string | null;
  createdAt: string;
}

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  userId: string;
  userName?: string | null;
  userImage?: string | null;
}

const TAG_COLORS = [
  "accent-charcoal-soft",
  "accent-slate-soft",
  "accent-sage-soft",
];

export default function IdeaDetail({
  ideaId,
  currentUserId,
}: {
  ideaId: string;
  currentUserId?: string;
}) {
  const router = useRouter();
  const [idea, setIdea] = useState<Idea | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(0);
  const [isPulsing, setIsPulsing] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIdea();
    fetchComments();
    if (currentUserId) {
      checkUpvoteStatus();
    }
  }, [ideaId, currentUserId]);

  const fetchIdea = async () => {
    try {
      const response = await fetch(`/api/ideas/${ideaId}`);
      if (response.ok) {
        const data = await response.json();
        setIdea(data);
        setUpvoteCount(data.upvoteCount);
      }
    } catch (error) {
      console.error("Error fetching idea:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/ideas/${ideaId}/comments`);
      if (response.ok) {
        const data = await response.json();
        setComments(data);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const checkUpvoteStatus = async () => {
    try {
      const response = await fetch(`/api/ideas/${ideaId}/upvote`);
      if (response.ok) {
        const data = await response.json();
        setHasUpvoted(data.upvoted);
      }
    } catch (error) {
      console.error("Error checking upvote:", error);
    }
  };

  const handleUpvote = async () => {
    if (!currentUserId) {
      router.push("/api/auth/signin");
      return;
    }

    setIsPulsing(true);
    setTimeout(() => setIsPulsing(false), 600);

    setHasUpvoted(!hasUpvoted);
    setUpvoteCount(hasUpvoted ? upvoteCount - 1 : upvoteCount + 1);

    try {
      await fetch(`/api/ideas/${ideaId}/upvote`, { method: "POST" });
    } catch (error) {
      console.error("Error upvoting:", error);
      setHasUpvoted(!hasUpvoted);
      setUpvoteCount(hasUpvoted ? upvoteCount + 1 : upvoteCount - 1);
    }
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUserId) {
      router.push("/api/auth/signin");
      return;
    }

    if (!commentText.trim()) return;

    try {
      const response = await fetch(`/api/ideas/${ideaId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: commentText }),
      });

      if (response.ok) {
        setCommentText("");
        fetchComments();
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this idea?")) return;

    try {
      const response = await fetch(`/api/ideas/${ideaId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error deleting idea:", error);
    }
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-8 sm:px-12 lg:px-16 py-32 text-center">
        <div className="inline-block w-2 h-2 bg-slate-900 rounded-full animate-ping"></div>
        <p className="mt-6 text-slate-400 uppercase-premium">Loading</p>
      </div>
    );
  }

  if (!idea) {
    return (
      <div className="max-w-5xl mx-auto px-8 sm:px-12 lg:px-16 py-32 text-center">
        <p className="text-slate-500 text-premium">Idea not found</p>
      </div>
    );
  }

  const isOwner = currentUserId === idea.userId;

  return (
    <main className="max-w-5xl mx-auto px-8 sm:px-12 lg:px-16 py-20">
      {/* Header */}
      <div className="glass-card rounded-3xl p-12 mb-10">
        <div className="flex items-start justify-between gap-10 mb-8">
          <div className="flex-1">
            <h1 className="text-5xl font-semibold mb-6 heading-premium text-slate-900">{idea.title}</h1>
            <p className="text-xl text-slate-600 mb-8 text-premium leading-relaxed">{idea.teaser}</p>

            {/* Tags */}
            {idea.tags && idea.tags.length > 0 && (
              <div className="flex flex-wrap gap-3 mb-8">
                {idea.tags.map((tag, index) => (
                  <span
                    key={index}
                    className={`px-4 py-2 rounded-full text-xs font-medium uppercase-premium ${
                      TAG_COLORS[index % TAG_COLORS.length]
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Meta */}
            <div className="flex items-center gap-4 text-sm text-slate-500">
              {idea.userImage ? (
                <img
                  src={idea.userImage}
                  alt={idea.userName || "User"}
                  className="w-10 h-10 rounded-full border border-slate-200"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-slate-200"></div>
              )}
              <span className="font-medium text-slate-700">{idea.userName || "Anonymous"}</span>
              <span className="text-slate-300">·</span>
              <span className="uppercase-premium text-[0.7rem]">
                {new Date(idea.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-4 flex-shrink-0">
            <motion.button
              onClick={handleUpvote}
              animate={isPulsing ? { scale: [1, 1.2, 1] } : {}}
              className={`flex items-center gap-3 px-8 py-4 rounded-full font-medium smooth-transition ${
                hasUpvoted
                  ? "accent-charcoal"
                  : "btn-minimal text-slate-700"
              }`}
            >
              <ArrowUp className={`w-5 h-5 ${hasUpvoted ? "fill-current" : ""}`} />
              <span className="text-lg">{upvoteCount}</span>
            </motion.button>

            {isOwner && (
              <>
                <button
                  onClick={handleDelete}
                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-red-200 text-red-700 font-medium hover:bg-red-50 smooth-transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Full Strategy */}
        <div className="border-t border-slate-100 pt-10">
          <h2 className="uppercase-premium text-slate-500 mb-6">
            Execution Strategy
          </h2>
          <div className="prose max-w-none">
            <p className="text-slate-700 whitespace-pre-wrap leading-relaxed text-premium text-lg">
              {idea.fullStrategy}
            </p>
          </div>
        </div>

        {/* Team Roles */}
        {idea.teamRoles && (
          <div className="border-t border-slate-100 pt-10 mt-10">
            <h2 className="uppercase-premium text-slate-500 mb-6 flex items-center gap-3">
              <Users className="w-4 h-4" />
              Team Roles Needed
            </h2>
            <p className="text-slate-700 text-premium text-lg">{idea.teamRoles}</p>
          </div>
        )}
      </div>

      {/* Comments Section */}
      <div className="glass-card rounded-3xl p-12">
        <h2 className="text-2xl font-semibold mb-10 heading-premium flex items-center gap-3">
          <MessageCircle className="w-6 h-6 text-slate-600" />
          Discussion
          <span className="text-sm text-slate-400 font-normal">({comments.length})</span>
        </h2>

        {/* Comment Form */}
        {currentUserId ? (
          <form onSubmit={handleComment} className="mb-12">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Share your thoughts..."
              className="w-full px-6 py-4 rounded-2xl bg-white/60 border border-slate-200 focus:bg-white focus:border-slate-400 focus:ring-4 focus:ring-slate-100 outline-none smooth-transition resize-none text-premium mb-4"
              rows={4}
            />
            <button
              type="submit"
              disabled={!commentText.trim()}
              className="px-8 py-3 rounded-full btn-accent smooth-transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="font-medium">Post Comment</span>
            </button>
          </form>
        ) : (
          <div className="mb-12 p-6 bg-slate-50 border border-slate-200 rounded-2xl">
            <p className="text-slate-600 text-premium">
              <a href="/api/auth/signin" className="font-semibold text-slate-900 hover:text-slate-600 smooth-transition">
                Sign in
              </a>{" "}
              to join the discussion
            </p>
          </div>
        )}

        {/* Comments List */}
        <div className="space-y-8">
          {comments.length === 0 ? (
            <p className="text-center text-slate-400 py-12 uppercase-premium">
              No comments yet
            </p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="flex gap-5">
                {comment.userImage ? (
                  <img
                    src={comment.userImage}
                    alt={comment.userName || "User"}
                    className="w-12 h-12 rounded-full border border-slate-200 flex-shrink-0"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-slate-200 flex-shrink-0"></div>
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-semibold text-slate-900">
                      {comment.userName || "Anonymous"}
                    </span>
                    <span className="text-xs text-slate-400 uppercase-premium">
                      {new Date(comment.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <p className="text-slate-700 text-premium leading-relaxed">{comment.content}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
