import { auth, signOut } from "@/auth";

const Dashboard = async () => {
  const session = await auth();

  return (
    <div>
      <p>Session: {JSON.stringify(session)}</p>
      <form action={async () => {
        'use server'
        await signOut();
      }}>
        <button type="submit">Logout</button>
      </form>
    </div>
  );
};

export default Dashboard;
