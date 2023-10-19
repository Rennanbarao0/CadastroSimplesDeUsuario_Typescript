import { User } from "../../models/user";

export interface CreateUserParms {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ICreateUserRepository {
  createUser(params: CreateUserParms): Promise<User>;
}
