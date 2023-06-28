import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = this.extractJwtToken(request);

    // Verifica se o token existe e é válido
    try {
      const decoded = this.jwtService.verify(token);
      request.user = decoded; // Anexa as informações do usuário ao objeto de solicitação
      return true;
    } catch {
      return false;
    }
  }

  private extractJwtToken(request: any): string {
    // Lógica para extrair o token JWT do cabeçalho, query params, cookies ou qualquer outra fonte desejada
    const authHeader = request.headers.authorization;
    if (authHeader) {
        const [bearer, token] = authHeader.split(' ');
        if (bearer === 'Bearer' && token) {
            return token;
        }
    }
    return null;
  }
}
