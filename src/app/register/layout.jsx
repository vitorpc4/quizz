export default function RegisterLayout({ children }) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-[32px] items-center sm:items-start">
          {children}
        </main>
      </div>
    );
  }
  