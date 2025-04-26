import { Injectable } from '@nestjs/common';
import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport'; // Import the base Passport AuthGuard

@Injectable()
export class AuthGuard extends PassportAuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super(); // Calls the Passport JWT strategy for validation
  }

  // The canActivate method uses the context argument to access the request object
  // The context in this case is an ExecutionContext object which is the object that is passed to the canActivate method
  canActivate(context: ExecutionContext) {
    return super.canActivate(context); // This will now invoke the JwtStrategy to validate the JWT
  }
}
