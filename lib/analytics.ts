"use client";

import { sendGTMEvent } from '@next/third-parties/google';

export const trackEvent = (eventName: string, eventParams?: Record<string, unknown>) => {
  if (typeof window !== 'undefined') {
    sendGTMEvent({
      event: eventName,
      ...eventParams,
    });
  }
};

export const trackStep = (stepName: string, stepNumber: number) => {
  trackEvent('eligibility_step', {
    step_name: stepName,
    step_number: stepNumber,
  });
};

export const trackDecision = (status: string) => {
  trackEvent('eligibility_decision', {
    decision_status: status,
  });
};
