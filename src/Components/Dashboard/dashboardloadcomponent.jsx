import { FileQuestion, Loader2 } from "lucide-react";

export default function DashboardLoadComponent() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="relative w-20 h-20 mb-6">
        <div className="absolute top-0 left-0 w-full h-full">
          <Loader2 className="w-20 h-20 animate-spin text-primary" />
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <FileQuestion className="w-10 h-10 text-primary" />
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-2">Carregando Dashboard</h3>
      <p className="text-muted-foreground text-center max-w-md">
        Estamos preparando seus dados e estatísticas. Isso pode levar alguns
        instantes.
      </p>
    </div>
  );
}
