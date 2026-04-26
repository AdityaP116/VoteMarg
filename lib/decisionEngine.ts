import { DecisionResult, UserAnswers } from "@/lib/types";
import { DECISIONS } from "@/data/decisionData";

/**
 * Pure decision engine that maps user answers to a specific voter status.
 * Logic is decoupled from UI and translations.
 */
export function getDecision(answers: UserAnswers): DecisionResult {
  // 1. Eligibility Check (Age & Citizenship)
  if (answers.age < 18 || answers.citizenship === "no") {
    return DECISIONS.not_eligible;
  }

  // 2. Registration Status Check
  if (answers.registered === "no") {
    return DECISIONS.not_registered;
  }

  // 3. Address/Movement Check
  if (answers.moved === "yes") {
    return DECISIONS.update_required;
  }

  // 4. Confirmed Registration
  if (answers.registered === "yes") {
    return DECISIONS.registered;
  }

  // 5. Fallback for "Not Sure" and no movement
  return DECISIONS.unknown;
}
