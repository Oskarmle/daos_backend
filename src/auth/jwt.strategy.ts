import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

// The injectable decorator marks til class as a service that can be injected into other components
@Injectable()
// extend PassportStrategy to create a new strategy called JwtStrategy
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    // inject the jwtService which will be used to validate the JWT
    private jwtService: JwtService,
    // inject the configService which will be used to retrieve the JWT secret from the .env file
    private configService: ConfigService,
  ) {
    // the super function is called to pass the options to the parent class
    super({
      // specify the method used to extract the JWT from the request
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // specify the secret used to validate the JWT
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  // validate is called by Passport after the JWT has been decoded and verified
  async validate(payload: any) {
    // return the user ID and username from the payload
    return { userId: payload.sub, username: payload.username };
  }
}
