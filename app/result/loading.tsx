// loading.tsx is shown immediately by Next.js while the result page
// is being compiled/fetched. This eliminates the blank-screen delay
// and gives users instant visual feedback.
export default function ResultLoading() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-4 py-4 sm:px-6">
      {/* Header skeleton */}
      <div className="rounded-xl bg-[var(--surface-container-lowest)] p-4">
        <div className="h-7 w-48 animate-pulse rounded-md bg-[var(--surface-container-high)]" />
        <div className="mt-2 h-4 w-24 animate-pulse rounded-md bg-[var(--surface-container-high)]" />
      </div>

      {/* Status card skeleton */}
      <div className="mt-4 rounded-xl border border-[var(--outline-variant)] bg-[var(--surface-container-lowest)] p-4">
        <div className="rounded-lg border-l-4 border-[var(--outline-variant)] bg-[var(--surface-container-low)] p-4">
          <div className="h-3 w-20 animate-pulse rounded bg-[var(--surface-container-high)]" />
          <div className="mt-3 h-6 w-56 animate-pulse rounded bg-[var(--surface-container-high)]" />
        </div>

        {/* Steps skeleton */}
        <div className="mt-5 space-y-2">
          <div className="h-4 w-24 animate-pulse rounded bg-[var(--surface-container-high)]" />
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-10 w-full animate-pulse rounded-md bg-[var(--surface-container-low)]"
              style={{ animationDelay: `${i * 80}ms` }}
            />
          ))}
        </div>

        {/* Documents skeleton */}
        <div className="mt-5 space-y-2">
          <div className="h-4 w-36 animate-pulse rounded bg-[var(--surface-container-high)]" />
          {[1, 2].map((i) => (
            <div
              key={i}
              className="h-10 w-full animate-pulse rounded-md bg-[var(--surface-container-low)]"
              style={{ animationDelay: `${i * 80}ms` }}
            />
          ))}
        </div>

        {/* CTA buttons skeleton */}
        <div className="mt-5 flex flex-col gap-3">
          <div className="h-12 w-full animate-pulse rounded-md bg-[var(--surface-container-high)]" />
          <div className="h-12 w-full animate-pulse rounded-md bg-[var(--surface-container-low)]" />
        </div>
      </div>
    </main>
  );
}
