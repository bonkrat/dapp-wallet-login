import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as ethUtil from 'ethereumjs-util';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(address: string, signature: string): Promise<any> {
    const user = await this.userService.user({ address }),
      code = this.userCodeMap.get(address);

    if (this.verifySignature(address, code, signature)) {
      if (!user) {
        this.userService.create({
          address,
        });
      }

      return user;
    }

    console.error('ERROR VERIFYING USER FOR ADDRESS: ' + address);
    return null;
  }

  async login(user: any) {
    const payload = { address: user.address, username: user.username };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  getUserCode(address: string) {
    let code = this.userCodeMap.get(address);

    if (!code) {
      code = this.generateCode();
      this.userCodeMap.set(address, code);
    }

    return { code };
  }

  private generateCode() {
    return Math.floor(Math.random() * 1000000).toString();
  }

  private verifySignature(
    publicAddress: string,
    code: string,
    signature: string,
  ) {
    const msgBuffer = Buffer.from(code);
    const msgHash = ethUtil.hashPersonalMessage(msgBuffer);
    const signatureParams = ethUtil.fromRpcSig(signature);
    const publicKey = ethUtil.ecrecover(
      msgHash,
      signatureParams.v,
      signatureParams.r,
      signatureParams.s,
    );
    const addressBuffer = ethUtil.publicToAddress(publicKey);
    const address = ethUtil.bufferToHex(addressBuffer);

    return address.toLowerCase() === publicAddress.toLowerCase();
  }

  private userCodeMap = new Map();
}
