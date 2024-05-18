import { useNavigate, Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";

const Users = () => {
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate("/linkpage");
  };

  return (
    <section>
      <h1>Users</h1>
      <br />
      <p>You are logged in!</p>
      <br />
      <br />
      <Link to="/admin">Go to the Admin page</Link>
      <br />
      <br />
      <div className="flexGrow">
        <button onClick={signOut}>Sign Out</button>
      </div>
    </section>
  );
};

export default Users;
