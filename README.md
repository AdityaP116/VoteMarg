# VoteMarg

**VoteMarg** is a premium, secure, and mobile-first web application designed to help Indian citizens answer a critical question in under 30 seconds: **"Can I vote, and what should I do next?"**

Built as a scalable, state-driven platform, VoteMarg provides real-time voting eligibility checks, localized registration deadlines, and actionable next steps for all Indian states, all backed by a production-ready, test-driven backend.

![VoteMarg Banner](https://raw.githubusercontent.com/AdityaP116/VoteMarg/main/public/banner.png)

## 🌟 Key Features

- **Secure Server-Side Engine**: Eligibility decisions are processed entirely on a secure Next.js API backend to prevent client-side tampering.
- **Data-Driven Logic**: Decisions are mapped via a centralized configuration (`data/decisionData.ts`), decoupling rules from implementation.
- **Scalable Localization**: Uses a lightweight JSON-based localization system for **English**, **Hindi**, and **Marathi**, optimized for fast IDE performance and bundle size.
- **Accessible (A11y)**: WCAG compliant with focus management, ARIA live regions, and explicit roles.
- **Google Services Integration**:
  - **Google Analytics & GTM**: Granular event tracking for user flow drop-offs.
  - **Google Maps**: Dynamic polling station location rendering.
  - **Cloud Logging**: Backend audit trails for eligibility checks.
  - **Firebase Admin**: Secure server-side data persistence.

## 🛠️ Tech Stack

- **Frontend**: [Next.js 15](https://nextjs.org/) (App Router, Standalone Mode)
- **Hooks & Logic**: Custom Hooks (`hooks/`) and Data-Driven Engine (`lib/decisionEngine.ts`)
- **Validation**: [Zod](https://zod.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Framer Motion](https://www.framer.com/motion/)
- **Infrastructure**: [Google Cloud Run](https://cloud.google.com/run), [Secret Manager](https://cloud.google.com/secret-manager), [Cloud Build](https://cloud.google.com/build).

## 📂 Project Structure

```text
VoteMarg/
├── app/
│   ├── api/check/      # Secure API route with Admin SDK logging
│   └── result/         # Dynamic result rendering layer
├── components/         # Standardized UI Components (Atomic Design)
├── data/               # Election Data & Decision Engine Rules
├── hooks/              # Custom Hooks for encapsulated business logic
├── lib/                # Core helpers (i18n, Analytics, Firebase Admin)
│   └── locales/        # JSON translation files
├── tests/              # (Co-located) Vitest suites
├── Dockerfile          # Multi-stage production container
└── cloudbuild.yaml     # CI/CD with Secret Manager integration
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
   Create a `.env.local` file with your credentials:
   ```env
   # Firebase Client
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://your_project_id-default-rtdb.firebaseio.com

   # Google Services
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_maps_key
   NEXT_PUBLIC_GTM_ID=GTM-XXXXXX
   
   # Secret for Google Cloud Logging (Server-side)
   GOOGLE_APPLICATION_CREDENTIALS=path/to/service-account.json
   ```

4. **Run the Test Suite**:
   Ensure all core business logic passes:
   ```bash
   npm run test
   ```

5. **Start Development**:
   ```bash
   npm run dev
   ```

## ☁️ Deployment (CI/CD)

The project is fully integrated with Google Cloud Build and optimized for **Google Cloud Run**. Every deployment automatically runs:
1. `npm ci` for clean dependency installation.
2. `npm run test` (**Build Gate**: Build fails if tests don't pass).
3. Docker container build with **Standalone Optimization**.
4. Secure Secret Injection from **Google Secret Manager**.

To manually trigger a deployment:
```bash
gcloud builds submit --config cloudbuild.yaml
```

## 🎨 Design & Engineering Principles

- **Security First**: Client data is never trusted. All inputs are validated via Zod on the server.
- **Clarity over Complexity**: Every interaction must be self-explanatory. Snappy transitions (0.2s) for mobile.
- **Data Privacy**: Anonymous auth and non-PII logging to Firestore.
- **Institutional Minimalism**: A design that feels official, trustworthy, and fast.

---
Developed with ❤️ for the Indian Electorate.
