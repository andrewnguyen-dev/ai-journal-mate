import { auth } from "@/auth";
import TopNavbar from "@/components/navs/top-navbar";
import SemesterProgress from "@/components/semester-progress";

const Homepage = async () => {
  const session = await auth();

  return (
    <div>
      <TopNavbar />
      <main className="grid grid-cols-3 gap-6">
        <section className="col-span-2">
          <h1>Andrew Nguyen</h1>
        </section>
        <aside className="col-span-1">
          <SemesterProgress />
        </aside>
      </main>
    </div>
  );
};

export default Homepage;
