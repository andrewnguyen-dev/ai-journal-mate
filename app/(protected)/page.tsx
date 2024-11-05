import { auth } from "@/auth";
import SemesterProgress from "@/components/semester-progress";
import { getAllWeeks } from "@/data/week";
import { currentUser } from "@/lib/auth";
import { getUsernameFromEmail } from "@/lib/utils";

const Homepage = async () => {
  const user = await currentUser();
  if (!user) return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="text-center">
        <h1>You are not logged in.</h1>
        <p>Please log in to access your account.</p>
      </div>
    </div>
  )

  const weeks = await getAllWeeks();
  if (!weeks) return <div>Failed to load weeks</div>;

  return (
    <div className="">
      <main className="grid grid-cols-6 gap-6">
        <section className="order-2 col-span-6 md:order-1 md:col-span-3 lg:col-span-4">
          <h1>Welcome back, {user?.studentId}!</h1>
        </section>
        <aside className="order-1 col-span-6 md:order-2 md:col-span-3 lg:col-span-2">
          <SemesterProgress steps={weeks}/>
        </aside>
      </main>
    </div>
  );
};

export default Homepage;
