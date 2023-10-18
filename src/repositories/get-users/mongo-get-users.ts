import { IGetUsersRespository } from "../../controllers/get-users/protocols";
import { User } from "../../models/user";

export class MongoGetUsersRepository implements IGetUsersRespository {
  async getUsers(): Promise<User[]> {
    return [
      {
        firstName: "João",
        lastName: "Marcos",
        email: "joao@email.com",
        password: "12345",
      },
    ];
  }
}
