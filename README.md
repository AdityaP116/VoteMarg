# VoteMarg

**VoteMarg** is a premium, mobile-first web application designed to help Indian citizens answer a critical question in under 30 seconds: **"Can I vote, and what should I do next?"**

Built as a scalable, state-driven platform, VoteMarg provides real-time voting eligibility checks, localized registration deadlines, and actionable next steps for all Indian states.

![VoteMarg Banner](https://raw.githubusercontent.com/AdityaP116/VoteMarg/main/public/banner.png)

## 🌟 Key Features

- **State-Driven Architecture**: Supports all Indian states with a centralized data map. Switch states instantly with localized data rendering.
- **Multi-Lingual Support**: Fully localized in **English**, **Hindi (हिंदी)**, and **Marathi (मराठी)** to ensure accessibility.
- **One-Decision-At-A-Time Flow**: A guided onboarding and question experience that minimizes cognitive load.
- **Actionable Eligibility Checklist**: Results are presented in a clear, checklist format with specific document requirements.
- **Color-Coded Status Cards**: Immediate visual feedback (Red/Orange/Green) on voter status.
- **Data Insights**: Anonymous logging of eligibility results via **Firebase Firestore** to identify common voter hurdles.
- **Standardized Premium UI**: A unified, high-fidelity design system using CSS tokens and a standardized page layout.

## 🛠️ Tech Stack

- **Frontend**: [Next.js 15](https://nextjs.org/) (App Router, Standalone Mode)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with a custom design system.
- **Animations**: [Framer Motion](https://www.framer.com/motion/) for fluid page transitions and interactive micro-animations.
- **Database**: [Firebase Firestore](https://firebase.google.com/docs/firestore) for anonymous logging and feedback collection.
- **Typography**: [Noto Sans](https://fonts.google.com/specimen/Noto+Sans) (Latin & Devanagari) for optimal readability.
- **Deployment**: [Google Cloud Run](https://cloud.google.com/run) via Docker and Cloud Build.

## 📂 Project Structure

```text
VoteMarg/
├── app/                # Next.js App Router (Layouts, Pages, Routes)
├── components/         # Standardized UI Components (Layouts, Flows, Cards)
├── data/               # Centralized state-driven election data map
├── lib/                # Core logic, Decision Engine, Translations, Types
├── public/             # Static assets (Logos, Icons)
├── Dockerfile          # Multi-stage production container configuration
└── cloudbuild.yaml     # CI/CD configuration for Google Cloud
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
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   ```

4. **Start Development**:
   ```bash
   npm run dev
   ```

## ☁️ Deployment

The project is ready for one-click deployment to **Google Cloud Run**.

### Using Cloud Build
```bash
gcloud builds submit --config cloudbuild.yaml
```

## 🎨 Design Principles

- **Clarity over Complexity**: Every interaction must be self-explanatory.
- **Fast Interaction**: Transitions are optimized (0.2s-0.3s) to feel snappy on low-end mobile devices.
- **Trust-First**: Sources and last-updated timestamps are displayed prominently to ensure users act on reliable info.

---
Developed with ❤️ for the Indian Electorate.
