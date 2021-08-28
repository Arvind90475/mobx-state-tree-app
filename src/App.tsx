import { useEffect } from "react";
import { observer } from "mobx-react";
import { userStore } from "./store/user";
import "./App.css";
import Form from "./components/Form";

function App() {
  useEffect(() => {
    (async () => {
      const users = await userStore.fetchUsers();
      userStore.setUsers(users);
    })();
  }, []);

  return (
    <div className="App">
      <ul style={{ listStyle: "none" }}>
        {userStore.users.map(({ name, id }) => (
          <li
            style={{
              backgroundColor: "#f7f8fa",
              padding: "10px",
              marginTop: "10px",
            }}
            key={id}
            onClick={() => {}}
          >
            <h2 style={{ display: "inline", marginRight: "10px" }}>{name}</h2>
            <button
              onClick={() => {
                userStore.removeUser(id);
              }}
            >
              X
            </button>
          </li>
        ))}
        <li>
          <Form />
        </li>
      </ul>
    </div>
  );
}

export default observer(App);
