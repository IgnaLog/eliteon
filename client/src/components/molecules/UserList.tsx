import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as userService from "@services/userService";
import useAxiosPrivate from "@hooks/useAxiosPrivate";

const UserList = () => {
  const [users, setUsers] = useState<string[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const effectRan = useRef(false);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const controller = new AbortController();

    if (effectRan.current === true || import.meta.env.PROD) {
      const getUsers = async () => {
        try {
          const response = await userService.loadUsers(
            controller.signal,
            axiosPrivate
          );
          const userEmails = response.data.map((user) => user.email);
          setUsers(userEmails);
        } catch (err) {
          console.error(err);
          navigate("/login", { state: { from: location }, replace: true });
        }
      };

      getUsers();
    }
    return () => {
      effectRan.current = true;
      controller.abort();
    };
  }, []);

  return (
    <article>
      <h2>Users List</h2>
      {users?.length ? (
        <ul>
          {users.map((user, i) => (
            <li key={i}>{user}</li>
          ))}
        </ul>
      ) : (
        <p>No users to display</p>
      )}
    </article>
  );
};

export default UserList;
