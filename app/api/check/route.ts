import { NextResponse } from 'next/server';
import { getDecision } from '@/lib/decisionEngine';
import { UserAnswers } from '@/lib/types';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
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

    // Save to Firestore securely from backend
    if (db && data.age > 0) {
      try {
        await addDoc(collection(db, 'queries'), {
          ...answers,
          status: decision.status,
          state: data.state || 'unknown',
          timestamp: serverTimestamp(),
          language: data.language || 'en',
          userId: data.userId || 'anonymous'
        });
      } catch (dbError) {
        console.error('Failed to log query to Firestore:', dbError);
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
