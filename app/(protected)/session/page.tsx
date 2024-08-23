import { auth, signOut } from "@/auth";
import TopNavbar from "@/components/navs/top-navbar";

const Session = async () => {
  const session = await auth();

  return (
    <>
      <TopNavbar />
      <div>
        <p>Session: {JSON.stringify(session)}</p>
        <form action={async () => {
          'use server'
          await signOut({
            redirectTo: '/auth/login',
          });
        }}>
          <button type="submit">Logout</button>
        </form>
      </div>
    </>
  );
};

export default Session;
