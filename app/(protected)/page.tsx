import { auth } from "@/auth";
import SemesterProgress from "@/components/semester-progress";

const Homepage = async () => {
  const session = await auth();

  return (
    <div>
      <main className="grid grid-cols-3 gap-6">
        <section className="col-span-2">
          <h1>Welcome back, {session?.user.name}!</h1>
        </section>
        <aside className="col-span-1">
          <SemesterProgress />
        </aside>
      </main>
    </div>
  );
};

export default Homepage;
