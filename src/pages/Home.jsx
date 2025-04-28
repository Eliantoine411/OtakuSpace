import { supabase } from '../supabaseClient';

function Home() {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <div>
      <h2>Welcome to OtakuSpace</h2>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
}

export default Home;
