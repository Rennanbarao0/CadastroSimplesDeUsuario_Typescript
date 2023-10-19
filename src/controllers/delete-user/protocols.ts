import { User } from "../../models/user";

export interface IDeleteUserRepository {
  deteleUser(id: string): Promise<User>;
}
