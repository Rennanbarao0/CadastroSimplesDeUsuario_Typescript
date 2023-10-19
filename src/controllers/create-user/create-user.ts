import validator from "validator";
import { User } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";
import {
  CreateUserParms,
  ICreateUserController,
  ICreateUserRepository,
} from "./protocols";

export class CreateUserController implements ICreateUserController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}
  async handle(
    httpRequest: HttpRequest<CreateUserParms>
  ): Promise<HttpResponse<User>> {
    try {
      const requeridFields = ["firstName", "lastName", "email", "password"];

      for (const field of requeridFields) {
        if (!httpRequest?.body?.[field as keyof CreateUserParms]?.length) {
          return {
            statusCode: 400,
            body: `Field ${field} is requerid`,
          };
        }
      }

      const emailIsValid = validator.isEmail(httpRequest.body.email);

      if (!emailIsValid) {
        return {
          statusCode: 400,
          body: "E-mail is invalid",
        };
      }

      const user = await this.createUserRepository.createUser(
        httpRequest.body!
      );

      return {
        statusCode: 201,
        body: user,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Something went wrong",
      };
    }
  }
}
