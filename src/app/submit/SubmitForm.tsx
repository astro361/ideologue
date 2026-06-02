"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const POPULAR_TAGS = ["SaaS", "AI/ML", "E-commerce", "Social", "Productivity", "Health", "FinTech", "EdTech", "Developer Tools"];

export default function SubmitForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [refining, setRefining] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    teaser: "",
    fullStrategy: "",
    tags: [] as string[],
    teamRoles: "",
  });

  const handleChange = (field: string, value: string | string[]) => {
    setFormData({ ...formData, [field]: value });
  };

  const toggleTag = (tag: string) => {
    if (formData.tags.includes(tag)) {
      handleChange("tags", formData.tags.filter((t) => t !== tag));
    } else {
      handleChange("tags", [...formData.tags, tag]);
    }
  };

  const refineWithAI = async (field: string) => {
    setRefining(field);
    try {
      const response = await fetch("/api/refine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: formData[field as keyof typeof formData],
          field,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        handleChange(field, data.refinedText);
      }
    } catch (error) {
      console.error("Error refining text:", error);
    } finally {
      setRefining(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const idea = await response.json();
        router.push(`/idea/${idea.id}`);
      }
    } catch (error) {
      console.error("Error submitting idea:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const canProceed = () => {
    if (step === 1) return formData.title.trim().length > 0;
    if (step === 2) return formData.teaser.trim().length > 0;
    if (step === 3) return formData.fullStrategy.trim().length > 0;
    return true;
  };

  return (
    <main className="max-w-4xl mx-auto px-8 sm:px-12 lg:px-16 py-20">
      {/* Progress Bar */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`flex items-center ${s < 4 ? "flex-1" : ""}`}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-sm smooth-transition ${
                  s <= step
                    ? "accent-charcoal"
                    : "bg-white border border-slate-200 text-slate-400"
                }`}
              >
                {s}
              </div>
              {s < 4 && (
                <div
                  className={`flex-1 h-0.5 mx-4 smooth-transition ${
                    s < step ? "bg-slate-900" : "bg-slate-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between uppercase-premium text-slate-400 mt-4 px-2">
          <span>Title</span>
          <span>Hook</span>
          <span>Strategy</span>
          <span>Details</span>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-12">
        <AnimatePresence mode="wait">
          {/* Step 1: Title */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="text-3xl font-semibold mb-3 heading-premium">What's your idea called?</h2>
              <p className="text-slate-500 mb-10 text-premium">Give it a memorable name</p>

              <div className="mb-8">
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="e.g., TaskFlow - AI-Powered Project Management"
                  className="w-full px-6 py-4 rounded-2xl bg-white/60 border border-slate-200 focus:bg-white focus:border-slate-400 focus:ring-4 focus:ring-slate-100 outline-none smooth-transition text-lg"
                  autoFocus
                />
              </div>

              <button
                type="button"
                onClick={() => refineWithAI("title")}
                disabled={!formData.title || refining === "title"}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full accent-charcoal-soft smooth-transition disabled:opacity-50 disabled:cursor-not-allowed mb-6"
              >
                <Sparkles className={`w-4 h-4 ${refining === "title" ? "animate-spin" : ""}`} />
                <span className="font-medium">{refining === "title" ? "Refining..." : "Refine with AI"}</span>
              </button>
            </motion.div>
          )}

          {/* Step 2: Teaser */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="text-3xl font-semibold mb-3 heading-premium">Create a hook</h2>
              <p className="text-slate-500 mb-10 text-premium">
                One compelling sentence that captures the essence
              </p>

              <div className="mb-8">
                <textarea
                  value={formData.teaser}
                  onChange={(e) => handleChange("teaser", e.target.value)}
                  placeholder="e.g., Transform chaos into clarity with AI that understands your workflow"
                  className="w-full px-6 py-4 rounded-2xl bg-white/60 border border-slate-200 focus:bg-white focus:border-slate-400 focus:ring-4 focus:ring-slate-100 outline-none smooth-transition resize-none text-premium"
                  rows={4}
                  autoFocus
                />
              </div>

              <button
                type="button"
                onClick={() => refineWithAI("teaser")}
                disabled={!formData.teaser || refining === "teaser"}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full accent-charcoal-soft smooth-transition disabled:opacity-50 disabled:cursor-not-allowed mb-6"
              >
                <Sparkles className={`w-4 h-4 ${refining === "teaser" ? "animate-spin" : ""}`} />
                <span className="font-medium">{refining === "teaser" ? "Refining..." : "Refine with AI"}</span>
              </button>
            </motion.div>
          )}

          {/* Step 3: Full Strategy */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="text-3xl font-semibold mb-3 heading-premium">Execution Strategy</h2>
              <p className="text-slate-500 mb-10 text-premium">
                Describe your vision, target market, and roadmap
              </p>

              <div className="mb-8">
                <textarea
                  value={formData.fullStrategy}
                  onChange={(e) => handleChange("fullStrategy", e.target.value)}
                  placeholder="Share your full strategy: problem, solution, target market, revenue model, go-to-market plan..."
                  className="w-full px-6 py-4 rounded-2xl bg-white/60 border border-slate-200 focus:bg-white focus:border-slate-400 focus:ring-4 focus:ring-slate-100 outline-none smooth-transition resize-none text-premium"
                  rows={12}
                  autoFocus
                />
              </div>

              <button
                type="button"
                onClick={() => refineWithAI("fullStrategy")}
                disabled={!formData.fullStrategy || refining === "fullStrategy"}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full accent-charcoal-soft smooth-transition disabled:opacity-50 disabled:cursor-not-allowed mb-6"
              >
                <Sparkles className={`w-4 h-4 ${refining === "fullStrategy" ? "animate-spin" : ""}`} />
                <span className="font-medium">{refining === "fullStrategy" ? "Refining..." : "Structure with AI"}</span>
              </button>
            </motion.div>
          )}

          {/* Step 4: Tags & Team Roles */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="text-3xl font-semibold mb-3 heading-premium">Add final details</h2>
              <p className="text-slate-500 mb-10 text-premium">Help others discover and collaborate</p>

              <div className="mb-10">
                <label className="block uppercase-premium text-slate-500 mb-5">
                  Categories
                </label>
                <div className="flex flex-wrap gap-3">
                  {POPULAR_TAGS.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`px-6 py-3 rounded-full text-sm font-medium smooth-transition ${
                        formData.tags.includes(tag)
                          ? "accent-charcoal"
                          : "btn-minimal text-slate-600"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block uppercase-premium text-slate-500 mb-5">
                  Team Roles Needed (Optional)
                </label>
                <textarea
                  value={formData.teamRoles}
                  onChange={(e) => handleChange("teamRoles", e.target.value)}
                  placeholder="e.g., Full-stack developer, UX designer, Growth marketer"
                  className="w-full px-6 py-4 rounded-2xl bg-white/60 border border-slate-200 focus:bg-white focus:border-slate-400 focus:ring-4 focus:ring-slate-100 outline-none smooth-transition resize-none text-premium"
                  rows={4}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-12 pt-8 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setStep(step - 1)}
            disabled={step === 1}
            className="flex items-center gap-2 px-8 py-3 rounded-full btn-minimal text-slate-700 font-medium smooth-transition disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          {step < 4 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              disabled={!canProceed()}
              className="flex items-center gap-2 px-8 py-3 rounded-full btn-accent smooth-transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="font-medium">Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={submitting || !canProceed()}
              className="flex items-center gap-2 px-8 py-3 rounded-full btn-accent smooth-transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="font-medium">{submitting ? "Publishing..." : "Publish Idea"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </form>
    </main>
  );
}
