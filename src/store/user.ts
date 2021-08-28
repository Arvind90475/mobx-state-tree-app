import { flow, Instance, types, IMSTArray } from "mobx-state-tree";
import { v4 } from "uuid";

const URL = "https://jsonplaceholder.typicode.com/users";

const fetchUser = async () => {
  const data = await fetch(URL);
  const users = await data.json();
  return users.map(({ name }: { name: string }) => ({ id: v4(), name }));
};

const User = types.model({
  id: types.string,
  name: types.string,
});

const UserStore = types
  .model("userStore", {
    users: types.optional(types.array(User), []),
  })
  .actions((self) => ({
    addUser(user: IUser) {
      self.users.push(user);
    },

    removeUser(id: string) {
      self.users = self.users.filter((user) => user.id !== id) as IUsers;
    },

    setUsers(users: IMSTArray<typeof User>) {
      self.users = users;
    },

    fetchUsers: flow(function* () {
      try {
        return yield fetchUser();
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    }),
  }));

export const userStore = UserStore.create({
  users: [],
});

export interface IUsers extends IMSTArray<typeof User> {}
export interface IUser extends Instance<typeof User> {}
