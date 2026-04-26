import * as admin from 'firebase-admin';
import { Logging } from '@google-cloud/logging';

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'parkflow-aea27'
    });
  } catch (error) {
    console.error('Firebase admin initialization error', error);
  }
}

export const adminDb = admin.firestore();

// Initialize Google Cloud Logging
const logging = new Logging({ projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'parkflow-aea27' });
export const log = logging.log('votemarg-backend-log');
