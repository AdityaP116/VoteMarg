import { RegistrationAnswer, YesNo, DecisionResult } from "@/lib/types";

export const OFFICIAL_LINKS = {
  nvsp: "https://voters.eci.gov.in",
  form6: "https://voters.eci.gov.in",
  form8: "https://voters.eci.gov.in",
  electoralSearch: "https://electoralsearch.eci.gov.in",
  eci: "https://eci.gov.in",
  helpline: "tel:1950"
} as const;

export const DECISIONS: Record<string, DecisionResult> = {
  not_eligible: {
    status: "not_eligible",
    action: null,
    title: "decision_not_eligible_title",
    steps: ["decision_not_eligible_step_1", "decision_not_eligible_step_2", "decision_not_eligible_step_3"],
    documents: ["decision_not_eligible_doc_1", "decision_not_eligible_doc_2"],
    links: [
      { label: "link_open_eci", url: OFFICIAL_LINKS.eci },
      { label: "link_open_nvsp", url: OFFICIAL_LINKS.nvsp }
    ]
  },
  not_registered: {
    status: "not_registered",
    action: "form_6",
    title: "decision_not_registered_title",
    steps: ["decision_not_registered_step_1", "decision_not_registered_step_2", "decision_not_registered_step_3"],
    documents: ["decision_not_registered_doc_1", "decision_not_registered_doc_2", "decision_not_registered_doc_3"],
    links: [
      { label: "link_open_form_6", url: OFFICIAL_LINKS.form6 },
      { label: "link_open_nvsp", url: OFFICIAL_LINKS.nvsp }
    ]
  },
  update_required: {
    status: "update_required",
    action: "form_8",
    title: "decision_update_required_title",
    steps: ["decision_update_required_step_1", "decision_update_required_step_2", "decision_update_required_step_3"],
    documents: ["decision_update_required_doc_1", "decision_update_required_doc_2"],
    links: [
      { label: "link_open_form_8", url: OFFICIAL_LINKS.form8 },
      { label: "link_open_nvsp", url: OFFICIAL_LINKS.nvsp }
    ]
  },
  registered: {
    status: "registered",
    action: null,
    title: "decision_registered_title",
    steps: ["decision_registered_step_1", "decision_registered_step_2", "decision_registered_step_3"],
    documents: ["decision_registered_doc_1"],
    links: [
      { label: "link_open_electoral_search", url: OFFICIAL_LINKS.electoralSearch },
      { label: "link_open_nvsp", url: OFFICIAL_LINKS.nvsp }
    ]
  },
  unknown: {
    status: "unknown",
    action: null,
    title: "decision_unknown_title",
    steps: ["decision_unknown_step_1", "decision_unknown_step_2", "decision_unknown_step_3"],
    documents: ["decision_unknown_doc_1"],
    links: [
      { label: "link_open_electoral_search", url: OFFICIAL_LINKS.electoralSearch },
      { label: "link_call_1950", url: OFFICIAL_LINKS.helpline }
    ]
  }
};
