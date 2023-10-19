import validator from "validator";
import { User } from "../../models/user";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { CreateUserParms, ICreateUserRepository } from "./protocols";
import { badRequest, created, serverError } from "../helpers";

export class CreateUserController implements IController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}
  async handle(
    httpRequest: HttpRequest<CreateUserParms>
  ): Promise<HttpResponse<User | string>> {
    try {
      const requeridFields = ["firstName", "lastName", "email", "password"];

      for (const field of requeridFields) {
        if (!httpRequest?.body?.[field as keyof CreateUserParms]?.length) {
          return badRequest(`Field ${field} is requerid`);
        }
      }

      const emailIsValid = validator.isEmail(httpRequest.body.email);

      if (!emailIsValid) {
        return badRequest("E-mail is invalid");
      }

      const user = await this.createUserRepository.createUser(
        httpRequest.body!
      );

      return created<User>(user);
    } catch (error) {
      return serverError();
    }
  }
}
