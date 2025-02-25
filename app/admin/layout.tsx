

import AdminGuard from './AdminGuard';
import Sidebar from './SideNav';
import Wrapper from '@/shared/Wrapper';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Wrapper>
      <div className="flex h-auto">
        <Sidebar />
        <main className="flex-1 p-3">
        <AdminGuard>{children}</AdminGuard>

        </main>
      </div>
    </Wrapper>
  );
};

export default AdminLayout;