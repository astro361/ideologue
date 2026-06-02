"use client";

import { useEffect, useState } from "react";
import { Search, Filter } from "lucide-react";
import IdeaCard from "@/components/IdeaCard";

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

const POPULAR_TAGS = ["SaaS", "AI/ML", "E-commerce", "Social", "Productivity", "Health", "FinTech"];

export default function ExploreFeed() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [filteredIdeas, setFilteredIdeas] = useState<Idea[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIdeas();
  }, []);

  useEffect(() => {
    filterIdeas();
  }, [ideas, searchQuery, selectedTag]);

  const fetchIdeas = async () => {
    try {
      const response = await fetch("/api/ideas");
      if (response.ok) {
        const data = await response.json();
        setIdeas(data);
      }
    } catch (error) {
      console.error("Error fetching ideas:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterIdeas = () => {
    let filtered = [...ideas];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (idea) =>
          idea.title.toLowerCase().includes(query) ||
          idea.teaser.toLowerCase().includes(query)
      );
    }

    if (selectedTag) {
      filtered = filtered.filter((idea) => idea.tags?.includes(selectedTag));
    }

    setFilteredIdeas(filtered);
  };

  const handleUpvote = async (ideaId: string) => {
    try {
      await fetch(`/api/ideas/${ideaId}/upvote`, { method: "POST" });
    } catch (error) {
      console.error("Error upvoting:", error);
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 py-20">
      {/* Hero Section */}
      <div className="text-center mb-20">
        <h1 className="text-6xl font-semibold mb-6 heading-premium text-slate-900">
          Discover the Next Big Idea
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto text-premium">
          Explore innovative concepts, share your vision, and collaborate with fellow builders.
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-16">
        <div className="relative max-w-3xl mx-auto">
          <Search className="absolute left-8 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search ideas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-16 pr-8 py-5 input-pill text-base text-slate-900 placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Tag Filters */}
      <div className="mb-16">
        <div className="flex items-center justify-center gap-3 mb-8">
          <span className="uppercase-premium text-slate-500">Categories</span>
        </div>
        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-6 py-3 rounded-full text-sm font-medium smooth-transition ${
              selectedTag === null
                ? "accent-charcoal"
                : "btn-minimal text-slate-600"
            }`}
          >
            All
          </button>
          {POPULAR_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
              className={`px-6 py-3 rounded-full text-sm font-medium smooth-transition ${
                selectedTag === tag
                  ? "accent-charcoal"
                  : "btn-minimal text-slate-600"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Ideas Grid */}
      {loading ? (
        <div className="text-center py-32">
          <div className="inline-block w-2 h-2 bg-slate-900 rounded-full animate-ping"></div>
          <p className="mt-6 text-slate-400 uppercase-premium">Loading</p>
        </div>
      ) : filteredIdeas.length === 0 ? (
        <div className="text-center py-32">
          <p className="text-slate-500 text-lg text-premium">No ideas found. Be the first to share one!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredIdeas.map((idea) => (
            <IdeaCard key={idea.id} idea={idea} onUpvote={handleUpvote} />
          ))}
        </div>
      )}
    </main>
  );
}
