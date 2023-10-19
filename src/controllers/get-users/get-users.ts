import { HttpResponse, IController } from "../protocols";
import { IGetUsersRespository } from "./protocols";
import { User } from "../../models/user";
import { ok, serverError } from "../helpers";

export class GetUsersController implements IController {
  constructor(private readonly getUsersRepository: IGetUsersRespository) {}

  async handle(): Promise<HttpResponse<User[] | string>> {
    try {
      const users = await this.getUsersRepository.getUsers();

      return ok<User[]>(users);
    } catch (error) {
      return serverError();
    }
  }
}
