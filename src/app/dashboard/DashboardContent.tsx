"use client";

import { useEffect, useState } from "react";
import { Package, Plus } from "lucide-react";
import IdeaCard from "@/components/IdeaCard";
import Link from "next/link";

interface Idea {
  id: string;
  title: string;
  teaser: string;
  fullStrategy: string;
  tags?: string[];
  upvoteCount: number;
  userId: string;
  userName?: string | null;
  userImage?: string | null;
  createdAt: string;
}

export default function DashboardContent() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserIdeas();
  }, []);

  const fetchUserIdeas = async () => {
    try {
      const response = await fetch("/api/user/ideas");
      if (response.ok) {
        const data = await response.json();
        setIdeas(data);
      }
    } catch (error) {
      console.error("Error fetching user ideas:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 py-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-16">
        <div>
          <h1 className="text-5xl font-semibold mb-4 heading-premium">My Collection</h1>
          <p className="text-slate-500 text-lg text-premium">
            Track and manage your ideas in one place
          </p>
        </div>
        <Link
          href="/submit"
          className="flex items-center gap-2 px-6 py-3 rounded-full btn-accent"
        >
          <Plus className="w-4 h-4" />
          <span className="font-medium">New Idea</span>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="glass-card rounded-2xl p-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full accent-charcoal flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <span className="uppercase-premium text-slate-500">Total Ideas</span>
          </div>
          <p className="text-4xl font-semibold heading-premium">{ideas.length}</p>
        </div>
        <div className="glass-card rounded-2xl p-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full accent-slate flex items-center justify-center">
              <span className="text-white text-xl font-semibold">↑</span>
            </div>
            <span className="uppercase-premium text-slate-500">Total Upvotes</span>
          </div>
          <p className="text-4xl font-semibold heading-premium">
            {ideas.reduce((sum, idea) => sum + idea.upvoteCount, 0)}
          </p>
        </div>
        <div className="glass-card rounded-2xl p-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full accent-sage flex items-center justify-center">
              <span className="text-white text-xl font-semibold">★</span>
            </div>
            <span className="uppercase-premium text-slate-500">Avg. Upvotes</span>
          </div>
          <p className="text-4xl font-semibold heading-premium">
            {ideas.length > 0
              ? Math.round(ideas.reduce((sum, idea) => sum + idea.upvoteCount, 0) / ideas.length)
              : 0}
          </p>
        </div>
      </div>

      {/* Ideas Grid */}
      {loading ? (
        <div className="text-center py-32">
          <div className="inline-block w-2 h-2 bg-slate-900 rounded-full animate-ping"></div>
          <p className="mt-6 text-slate-400 uppercase-premium">Loading</p>
        </div>
      ) : ideas.length === 0 ? (
        <div className="text-center py-32 glass-card rounded-2xl">
          <Package className="w-20 h-20 text-slate-300 mx-auto mb-6" />
          <h3 className="text-2xl font-semibold text-slate-900 mb-3 heading-premium">No ideas yet</h3>
          <p className="text-slate-500 mb-8 text-premium">Start building your collection</p>
          <Link
            href="/submit"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full btn-accent"
          >
            <Plus className="w-4 h-4" />
            <span className="font-medium">Submit Your First Idea</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ideas.map((idea) => (
            <IdeaCard key={idea.id} idea={idea} />
          ))}
        </div>
      )}
    </main>
  );
}
