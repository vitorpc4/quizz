import AppSidebar from "@/Components/app-sidebar";
import { Separator } from "@/Components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/Components/ui/sidebar";

export default function MainLayout({ children }) {
  return (
    <div>
      <SidebarProvider className={""}>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </header>

          <div className="flex justify-center items-center flex-1">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
