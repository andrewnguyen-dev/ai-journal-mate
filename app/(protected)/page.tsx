import { auth } from "@/auth";
import SemesterProgress from "@/components/semester-progress";
import { currentUser } from "@/lib/auth";
import { getUsernameFromEmail } from "@/lib/utils";

const Homepage = async () => {
  const user = await currentUser();

  return (
    <div className="">
      <main className="grid grid-cols-6 gap-6">
        <section className="order-2 col-span-6 md:order-1 md:col-span-3 lg:col-span-4">
          <h1>Welcome back, {user?.studentId}!</h1>
        </section>
        <aside className="order-1 col-span-6 md:order-2 md:col-span-3 lg:col-span-2">
          <SemesterProgress />
        </aside>
      </main>
    </div>
  );
};

export default Homepage;
