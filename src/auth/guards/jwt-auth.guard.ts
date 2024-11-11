import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

interface JwtPayload {
  userId: number;
  username: string;
  // เพิ่มข้อมูลที่ JWT ของคุณอาจมี
}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // canActivate(context: ExecutionContext) {
  //   return super.canActivate(context);
  // }
  // handleRequest<TUser = JwtPayload>(err: unknown, user: TUser): TUser {
  //   if (err || !user) {
  //     throw err || new UnauthorizedException();
  //   }
  //   return user;
  // }
}
