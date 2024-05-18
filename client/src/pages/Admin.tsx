import { Link } from "react-router-dom";
import UserList from "../components/molecules/UserList";

const Admin = () => {
  return (
    <section>
      <h1>Admins Page</h1>
      <br />
      <UserList />
      <br />
      <div className="flexGrow">
        <Link to="/">Home</Link>
      </div>
    </section>
  );
};

export default Admin;
