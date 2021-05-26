import { Strategy } from 'passport-custom';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Req, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';

@Injectable()
export class AddressStrategy extends PassportStrategy(Strategy, 'address') {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(@Req() request: Request): Promise<any> {
    const { address, code, signature } = request.body;
    const user = await this.authService.validateUser(address, code, signature);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
