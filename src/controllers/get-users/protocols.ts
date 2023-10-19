import { User } from "../../models/user";
export interface IGetUsersRespository {
  getUsers(): Promise<User[]>;
}
