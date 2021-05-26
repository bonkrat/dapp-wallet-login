import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AddressAuthGuard extends AuthGuard('address') {}
