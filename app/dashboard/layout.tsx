import Header from "@/components/commom/header";
import AppSidebar from "@/components/dashboard/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    <Header />
    <div className="bg-black">
      <div className="max-w-6xl mx-auto px-4 lg:px-6 py-6">
        {/* flex-col se mobile pe niche aayega, lg:flex-row se desktop pe side-by-side */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          
          {/* Sidebar container: Mobile pe full width, Desktop pe 280px */}
          <div className="w-full lg:w-[280px] shrink-0">
            <AppSidebar />
          </div>

          {/* Content area */}
          <div className="overflow-hidden">
            {children}
          </div>
          
        </div>
      </div>
    </div>
    </>
  );
}