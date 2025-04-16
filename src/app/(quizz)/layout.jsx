"use client";
import AppSidebar from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import instance from "@/http";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function MainLayout({ children }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await instance.post("/auth", {
        type: "logout",
      });

      localStorage.removeItem("userId");
      router.push("/login");
    } catch (err) {
      console.error("Erro ao fazer logout:", err);
      alert(err.response?.data?.error || "Erro ao fazer logout");
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
