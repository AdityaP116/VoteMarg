# VoteMarg

**VoteMarg** is a premium, secure, and mobile-first web application designed to help Indian citizens answer a critical question in under 30 seconds: **"Can I vote, and what should I do next?"**

Built as a scalable, state-driven platform, VoteMarg provides real-time voting eligibility checks, localized registration deadlines, and actionable next steps for all Indian states, all backed by a production-ready, test-driven backend.

![VoteMarg Banner](https://raw.githubusercontent.com/AdityaP116/VoteMarg/main/public/banner.png)

## 🌟 Key Features

- **Secure Server-Side Engine**: Eligibility decisions are processed entirely on a secure Next.js API backend to prevent client-side tampering.
- **Strict Input Validation**: End-to-end type safety and rigorous input sanitization using **Zod**.
- **State-Driven Architecture**: Supports all Indian states with a centralized data map. Switch states instantly with localized data rendering.
- **Multi-Lingual Support**: Fully localized in **English**, **Hindi (हिंदी)**, and **Marathi (मराठी)**.
- **Accessible (A11y)**: Built with WCAG compliance in mind, utilizing ARIA live regions (`role="alert"`) and explicit labels for screen-reader compatibility.
- **Automated Testing Suite**: 100% core test coverage using **Vitest** for unit and API integration testing.
- **Data Insights**: Anonymous authentication and logging via **Firebase Firestore** to identify common voter hurdles securely.
- **Standardized Premium UI**: A unified, high-fidelity design system using CSS tokens, fluid animations, and a standardized page layout.

## 🛠️ Tech Stack

- **Frontend**: [Next.js 15](https://nextjs.org/) (App Router, Standalone Mode)
- **Backend API**: Next.js Serverless Routes running natively on Cloud Run
- **Validation & Testing**: [Zod](https://zod.dev/) for schemas, [Vitest](https://vitest.dev/) for unit/integration testing
- **Styling & UI**: [Tailwind CSS](https://tailwindcss.com/) & [Framer Motion](https://www.framer.com/motion/)
- **Database & Auth**: [Firebase](https://firebase.google.com/) (Firestore, Anonymous Auth, Analytics)
- **Deployment & CI/CD**: [Google Cloud Run](https://cloud.google.com/run) via Docker and Cloud Build with pre-deploy test gates.

## 📂 Project Structure

```text
VoteMarg/
├── app/
│   ├── api/check/      # Secure API route for eligibility verification
│   └── result/         # Dynamic result rendering layer
├── components/         # Standardized UI Components (Layouts, Flows, Cards)
├── data/               # Centralized state-driven election data map
├── lib/                # Core logic, Decision Engine, Translations, Types, Validations
├── tests/              # (Co-located) Vitest suites for engine and API
├── public/             # Static assets (Logos, Icons)
├── Dockerfile          # Multi-stage production container configuration
├── vitest.config.mts   # Test runner configuration
└── cloudbuild.yaml     # CI/CD configuration for Google Cloud Build
```

## 💻 Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/AdityaP116/VoteMarg.git
   cd VoteMarg/VoteMarg
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment**:
   Create a `.env.local` file with your Firebase credentials:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://your_project_id-default-rtdb.firebaseio.com
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   ```

4. **Run the Test Suite**:
   Ensure all core business logic passes before starting:
   ```bash
   npm run test
   ```

5. **Start Development**:
   ```bash
   npm run dev
   ```

## ☁️ Deployment (CI/CD)

The project is fully integrated with Google Cloud Build. Every deployment automatically runs:
1. `npm install`
2. `npm run test` (The build securely fails if tests do not pass)
3. Container build (`Dockerfile`)
4. Deployment to Google Cloud Run

To manually trigger a deployment:
```bash
gcloud builds submit --config cloudbuild.yaml
```

## 🎨 Design & Engineering Principles

- **Security First**: Client data is never trusted. All inputs are validated via Zod on the server.
- **Clarity over Complexity**: Every interaction must be self-explanatory.
- **Fast Interaction**: Transitions are optimized (0.2s-0.3s) to feel snappy on low-end mobile devices.
- **Trust-First**: Sources and last-updated timestamps are displayed prominently to ensure users act on reliable info.

---
Developed with ❤️ for the Indian Electorate.
