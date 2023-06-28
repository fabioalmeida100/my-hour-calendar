import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  login(username: string, password: string): string {
      try {
        const user = this.validateUser(username, password);

        const payload = { userId: user.id };
        const token = this.jwtService.sign(payload);

        return token;
      } catch (error) {
        throw new Error("Erro ao autenticar usuário");
      }
  }
  
  private validateUser(username: string, password: string): any {
    if (username === 'admin' && password === 'admin') {
      return { id: 1, username: 'admin' };
    } else {
      return null;
    }
  }
}
