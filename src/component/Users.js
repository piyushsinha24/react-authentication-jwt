import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController(); // Replacement for cancellation tokens

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/users", {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setUsers(response.data);
      } catch (err) {
        console.log(err);
        // If the refresh token expires, take them to the login page
        navigate("/login", { state: { from: location }, replace: true});
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  return (
    <article>
      <h2>Users list</h2>
      {users?.length ? (
        <ul>
          {users.map((user, i) => (
            <li key={i}>{user.username}</li>
          ))}
        </ul>
      ) : (
        <p>No user to display</p>
      )}
    </article>
  );
}

export default Users;
