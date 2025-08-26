import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const auth = (req.headers['authorization'] as string) || '';
    const [type, token] = auth.split(' ');

    if (!type || type.toLowerCase() !== 'bearer' || !token) {
      throw new UnauthorizedException('Falta token Bearer');
    }

    try {
      const payload = this.jwt.verify(token);
      req.user = payload; // opcional: queda disponible en los handlers
      return true;
    } catch {
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }
}
