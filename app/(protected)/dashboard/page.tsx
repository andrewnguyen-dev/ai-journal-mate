import { auth, signOut } from "@/auth";
import TopNavbar from "@/components/navs/top-navbar";

const Dashboard = async () => {
  const session = await auth();

  return (
    <div>
      <TopNavbar />
      DASHBOARD
    </div>
  );
};

export default Dashboard;
