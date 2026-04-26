import { NextResponse } from 'next/server';
import { getDecision } from '@/lib/decisionEngine';
import { UserAnswers } from '@/lib/types';
import { adminDb, log } from '@/lib/firebaseAdmin';
import { CheckRequestSchema } from '@/lib/validations';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = CheckRequestSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: result.error.format() },
        { status: 400 }
      );
    }

    const data = result.data;
    const answers: UserAnswers = {
      age: data.age,
      citizenship: data.citizenship,
      registered: data.registered,
      moved: data.moved
    };

    const decision = getDecision(answers);

    // Save to Firestore securely from backend using Admin SDK
    if (adminDb && data.age > 0) {
      try {
        await adminDb.collection('queries').add({
          ...answers,
          status: decision.status,
          state: data.state || 'unknown',
          timestamp: new Date(),
          language: data.language || 'en',
          userId: data.userId || 'anonymous'
        });

        // Log the decision to Google Cloud Logging
        const metadata = {
          resource: { type: 'global' },
          severity: 'INFO',
        };
        const entry = log.entry(metadata, {
          message: 'User eligibility check completed',
          decision: decision.status,
          userId: data.userId || 'anonymous'
        });
        await log.write(entry);
      } catch (dbError) {
        console.error('Failed to log query to Firestore or Google Cloud Logging:', dbError);
        // Do not fail the request if logging fails
      }
    }

    return NextResponse.json({ decision });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
