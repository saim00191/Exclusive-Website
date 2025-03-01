import { Poppins } from "next/font/google";
import AdminGuard from "./AdminGuard";
import Sidebar from "./SideNav";
import Wrapper from "@/shared/Wrapper";


const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] })


const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Wrapper>
      <div className={`${poppins.className} flex h-auto`}>
        <Sidebar />
        <main className="flex-1 p-3">
          <AdminGuard>{children}</AdminGuard>
        </main>
      </div>
    </Wrapper>
  );
};

export default AdminLayout;
