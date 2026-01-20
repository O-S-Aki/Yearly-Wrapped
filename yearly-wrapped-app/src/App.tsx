import { useEffect, useState } from "react";

import { client } from "./lib/supabaseClient";
import { Login} from "./components";

function App() {
  const [user, setUser] = useState<null | any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Check existing session on app load
    client.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    // 2. Listen for auth changes (login/logout)
    const { data: authListener } =
      client.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
      });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Login />;
  }

  return (
    <div>
      <h1>2026 Wrapped</h1>
      <p>Logged in as {user.email}</p>

      {/* Your app starts here */}
    </div>
  );
}

export default App;
