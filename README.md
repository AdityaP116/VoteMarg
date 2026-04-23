# Maharashtra Election Assistant (VoteMarg)

A modern, interactive web application designed to assist citizens of Maharashtra in checking their voting eligibility and understanding the exact steps required for the upcoming elections.

![Maharashtra Election Assistant Homepage](https://raw.githubusercontent.com/AdityaP116/VoteMarg/main/public/screenshot.png) *(Note: Placeholder link, replace with actual screenshot if available)*

## 🚀 Features

- **Multi-language Support**: Fully localized in English, Hindi, and Marathi.
- **Quick Eligibility Check**: Simple flow to determine if you are eligible to vote.
- **Interactive Progress**: Real-time progress tracking through the eligibility steps.
- **Actionable Results**: Provides clear, next-step instructions based on your eligibility status.
- **Data Insights**: Anonymously logs eligibility results to Firestore to help analyze common voter issues.
- **User Feedback**: Integrated feedback system to collect and store user suggestions.
- **Premium UI/UX**: Built with a modern aesthetic, featuring smooth animations and a responsive design.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Database**: [Firebase Firestore](https://firebase.google.com/docs/firestore)
- **Deployment**: [Google Cloud Run](https://cloud.google.com/run)

## 💻 Local Development

Follow these steps to run the project locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/AdityaP116/VoteMarg.git
   cd VoteMarg/VoteMarg
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Environment Variables

Create a `.env.local` file in the project root with the following keys:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
```

## ☁️ Deployment

This project is optimized for deployment on **Google Cloud Run**.

### Docker
The project includes a multi-stage `Dockerfile` optimized for production using Next.js standalone output.

Build the image locally:
```bash
docker build -t votemarg .
```

### Google Cloud Build
A `cloudbuild.yaml` configuration is provided for automated deployment. To deploy directly to Cloud Run:
```bash
gcloud builds submit --config cloudbuild.yaml
```

## 📂 Project Structure

```text
VoteMarg/
├── app/                # Next.js App Router pages
├── components/         # Reusable UI components
├── data/               # Election data and decision logic
├── lib/                # Utility functions and types
├── public/             # Static assets
├── Dockerfile          # Production container configuration
├── cloudbuild.yaml     # CI/CD configuration
└── next.config.ts      # Next.js configuration (Standalone mode)
```

## 📄 License

This project is private and intended for use in the Maharashtra Election Assistant initiative.

---
Developed by [AdityaP116](https://github.com/AdityaP116)
