import React, { useState } from "react";
import { v4 } from "uuid";
import { userStore } from "../store/user";

const Form = () => {
  const [name, setName] = useState<string>("");
  return (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        userStore.addUser({ name, id: v4() });
        setName("");
      }}
    >
      <input
        type="text"
        placeholder="New User  Eg: Steve"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setName(e.target.value)
        }
        value={name}
      />
      <button type="submit">Add User</button>
    </form>
  );
};

export default Form;
