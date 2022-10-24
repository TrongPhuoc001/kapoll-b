import { HttpException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(readonly userService: UserService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOneEmail(email);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        return { user };
      } else {
        throw new HttpException('Invalid password or email', 401);
      }
    }
    throw new HttpException('Invalid password or email', 401);
  }

  async register(email: string, password: string): Promise<any> {
    const user = await this.userService.findOneEmail(email);
    if (user) {
      throw new HttpException('User already exists', 400);
    } else {
      return this.userService.create({ email, password });
    }
  }
}
