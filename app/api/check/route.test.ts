import { describe, it, expect, vi } from 'vitest';
import { POST } from './route';
import { NextRequest } from 'next/server';

// Mock Firebase Admin to avoid actual network calls during testing
vi.mock('@/lib/firebaseAdmin', () => ({
  adminDb: {
    collection: vi.fn().mockReturnValue({
      add: vi.fn().mockResolvedValue({ id: 'test-doc-id' })
    })
  },
  log: {
    entry: vi.fn(),
    write: vi.fn().mockResolvedValue(true)
  }
}));

describe('POST /api/check', () => {
  const createRequest = (body: Record<string, unknown>) => {
    return new NextRequest('http://localhost/api/check', {
      method: 'POST',
      body: JSON.stringify(body)
    });
  };

  it('returns a decision for valid input', async () => {
    const request = createRequest({
      age: 25,
      citizenship: 'yes',
      registered: 'no',
      moved: 'no',
      state: 'maharashtra',
      language: 'en'
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.decision).toBeDefined();
    expect(data.decision.status).toBe('not_registered');
    expect(data.decision.action).toBe('form_6');
  });

  it('returns 400 for invalid input (e.g. negative age)', async () => {
    const request = createRequest({
      age: -5,
      citizenship: 'yes',
      registered: 'no',
      moved: 'no'
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Invalid input');
  });

  it('returns 400 for missing required fields', async () => {
    const request = createRequest({
      age: 25
      // missing other fields
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
  });
});
