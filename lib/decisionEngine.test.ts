import { describe, it, expect } from 'vitest';
import { getDecision } from './decisionEngine';
import { UserAnswers } from './types';

describe('decisionEngine', () => {
  it('returns not_eligible for users under 18', () => {
    const answers: UserAnswers = {
      age: 17,
      citizenship: 'yes',
      registered: 'yes',
      moved: 'no'
    };
    const result = getDecision(answers);
    expect(result.status).toBe('not_eligible');
  });

  it('returns not_eligible for non-citizens', () => {
    const answers: UserAnswers = {
      age: 25,
      citizenship: 'no',
      registered: 'yes',
      moved: 'no'
    };
    const result = getDecision(answers);
    expect(result.status).toBe('not_eligible');
  });

  it('returns not_registered when user is 18+ citizen but not registered', () => {
    const answers: UserAnswers = {
      age: 18,
      citizenship: 'yes',
      registered: 'no',
      moved: 'no'
    };
    const result = getDecision(answers);
    expect(result.status).toBe('not_registered');
    expect(result.action).toBe('form_6');
  });

  it('returns update_required when user moved recently', () => {
    const answers: UserAnswers = {
      age: 30,
      citizenship: 'yes',
      registered: 'yes',
      moved: 'yes'
    };
    const result = getDecision(answers);
    expect(result.status).toBe('update_required');
    expect(result.action).toBe('form_8');
  });

  it('returns update_required even if they say they are not sure about registration if they moved', () => {
    const answers: UserAnswers = {
      age: 30,
      citizenship: 'yes',
      registered: 'not_sure',
      moved: 'yes'
    };
    const result = getDecision(answers);
    expect(result.status).toBe('update_required');
    expect(result.action).toBe('form_8');
  });

  it('returns registered for users who are 18+ citizens, registered, and have not moved', () => {
    const answers: UserAnswers = {
      age: 18,
      citizenship: 'yes',
      registered: 'yes',
      moved: 'no'
    };
    const result = getDecision(answers);
    expect(result.status).toBe('registered');
    expect(result.action).toBeNull();
  });

  it('returns unknown if registration is not_sure and user has not moved', () => {
    const answers: UserAnswers = {
      age: 50,
      citizenship: 'yes',
      registered: 'not_sure',
      moved: 'no'
    };
    const result = getDecision(answers);
    expect(result.status).toBe('unknown');
  });
});
