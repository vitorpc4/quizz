"use client";
import AppSidebar from "@/Components/app-sidebar";
import { Separator } from "@/Components/ui/separator";
import { Button } from "@/Components/ui/button";
import { useRouter } from "next/navigation";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/Components/ui/sidebar";

export default function MainLayout({ children }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "logout" }),
      });
      localStorage.removeItem("userId");
      router.push("/login");
    } catch (err) {
      console.error("Erro ao fazer logout:", err);
    }
  };

  return (
    <div>
      <SidebarProvider className={""}>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h1 className="text-2xl font-bold">Quiz App</h1>
            <div className="ml-auto">
              <Button variant="destructive" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </header>

          <div>{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
