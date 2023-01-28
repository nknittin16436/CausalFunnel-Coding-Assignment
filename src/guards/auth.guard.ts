import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { User } from 'src/db/entities/user.entity';
@Injectable()
export class AuthGuard implements CanActivate {
    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        try {
            const token = request.cookies.causalfunnel;
            if (token) {
                var decoded = jwt.verify(token, process.env.JWT_SECRET);
                const userId = decoded.id;
                const user = await User.findOne({ where: { id: userId } });
                if (user) {
                    return true;
                }
                return false;
            }
            return false;
        } catch (error) {

            throw new UnauthorizedException('Please login to access this resource');
        }
    }
}