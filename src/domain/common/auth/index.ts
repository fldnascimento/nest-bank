import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '@domain/common/auth/strategies/jwt.strategy';
import { LocalStrategy } from '@domain/common/auth/strategies/local.strategy';

export const authDependenciesModules = (jwtSecret?: string) => {
  return [
    PassportModule,
    JwtModule.register({
      secret: jwtSecret || process.env.JWT_SECRET,
      signOptions: { expiresIn: '30d' },
    }),
  ];
};

export const authStrategies = [JwtStrategy, LocalStrategy];
