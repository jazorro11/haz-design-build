export default function SiteLoading() {
  return (
    <div className="container-wide py-12 md:py-16 animate-pulse" aria-busy="true" aria-label="Cargando">
      <div className="h-10 w-48 max-w-full rounded-md bg-muted mb-6" />
      <div className="h-4 w-full max-w-xl rounded bg-muted/80 mb-3" />
      <div className="h-4 w-full max-w-lg rounded bg-muted/60 mb-12" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-lg border border-border overflow-hidden bg-card">
            <div className="aspect-project bg-muted" />
            <div className="p-4 space-y-3">
              <div className="h-5 w-3/4 rounded bg-muted" />
              <div className="h-3 w-1/2 rounded bg-muted/70" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
