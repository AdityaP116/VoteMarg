export type Language = "en" | "hi" | "mr";

export type YesNo = "yes" | "no";

export type RegistrationAnswer = "yes" | "no" | "not_sure";

export interface UserAnswers {
  age: number;
  citizenship: YesNo;
  registered: RegistrationAnswer;
  moved: YesNo;
}

export type DecisionStatus =
  | "not_eligible"
  | "not_registered"
  | "update_required"
  | "registered"
  | "unknown";

export type DecisionAction = "form_6" | "form_8" | null;

export interface DecisionLink {
  label: string;
  url: string;
}

export interface DecisionResult {
  status: DecisionStatus;
  action: DecisionAction;
  title: string;
  steps: string[];
  documents: string[];
  links: DecisionLink[];
}

export interface ElectionEntry {
  type: string;
  registrationDeadline: string;
  phases: string[];
  resultDate: string;
}

export interface MaharashtraElectionData {
  state: string;
  lastUpdated: string;
  elections: ElectionEntry[];
}
