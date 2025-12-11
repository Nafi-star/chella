import { applyDecorators, UseGuards } from "@nestjs/common";
import { AuthGuard as passwordAuthGuard } from "@nestjs/passport";
export function JwtAuthGuard(type:string|string[]='jwt'){
return applyDecorators(
  UseGuards(passwordAuthGuard(type))
);
}