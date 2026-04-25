"use client";

import { useState } from "react";
import { Language } from "@/lib/types";
import { t } from "@/lib/translations";

interface FeedbackFormProps {
  language: Language;
}

export default function FeedbackForm({ language }: FeedbackFormProps) {
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) return;

    setIsSubmitting(true);
    try {
      const { db, auth } = await import("@/lib/firebase");
      if (!db) {
        console.warn("Firestore is not initialized. Check your Firebase configuration.");
        return;
      }
      const { collection, addDoc, serverTimestamp } = await import("firebase/firestore");

      let userId = "anonymous";
      if (auth) {
        try {
          const { signInAnonymously } = await import("firebase/auth");
          const userCredential = await signInAnonymously(auth);
          userId = userCredential.user.uid;
        } catch (e) {
          // Firebase Auth not configured or enabled; gracefully fallback to anonymous string
        }
      }

      await addDoc(collection(db, "feedback"), {
        text: feedback,
        language,
        userId,
        timestamp: serverTimestamp(),
      });

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting feedback:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="mt-4 rounded-xl bg-[var(--surface-container-high)] p-4 text-center">
        <p className="text-sm font-semibold text-[var(--secondary)]">
          {t("feedback_success", language)}
        </p>
      </div>
    );
  }

  return (
    <div className="mt-4 rounded-xl border border-[var(--outline-variant)] bg-[var(--surface-container-lowest)] p-4">
      <h3 className="text-md font-semibold text-[var(--on-surface)]">
        {t("feedback_title", language)}
      </h3>
      <form onSubmit={handleSubmit} className="mt-3">
        <textarea
          id="feedback-text"
          name="feedback"
          aria-label={t("feedback_title", language)}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder={t("feedback_placeholder", language)}
          className="w-full rounded-lg border border-[var(--outline)] bg-[var(--surface-container-low)] p-2 text-sm text-[var(--on-surface)] focus:border-2 focus:border-[var(--primary)] focus:outline-none"
          rows={3}
          disabled={isSubmitting}
        />
        <button
          type="submit"
          disabled={isSubmitting || !feedback.trim()}
          className="mt-2 w-full rounded-lg bg-[var(--primary)] py-2 text-sm font-semibold text-[var(--on-primary)] transition-opacity disabled:opacity-50"
        >
          {isSubmitting ? "..." : t("feedback_submit", language)}
        </button>
      </form>
    </div>
  );
}
