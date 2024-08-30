import { auth } from "@/auth";
import SemesterProgress from "@/components/semester-progress";
import { currentUser } from "@/lib/auth";
import { getUsernameFromEmail } from "@/lib/utils";

const Homepage = async () => {
  const user = await currentUser();

  return (
    <div>
      <main className="grid grid-cols-3 gap-6">
        <section className="col-span-2">
          <h1>Welcome back, {user?.studentId}!</h1>
        </section>
        <aside className="col-span-1">
          <SemesterProgress />
        </aside>
      </main>
    </div>
  );
};

export default Homepage;
