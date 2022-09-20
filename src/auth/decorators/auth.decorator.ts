import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ValidRoles } from '../enums/valid-roles';
import { UserRoleGuard } from '../guards/user-role.guard';
import { RolesProtected } from './roles-protected.decorator';

export const Auth = (...roles: ValidRoles[]) => {
    return applyDecorators(
        RolesProtected(...roles),
        UseGuards(AuthGuard(), UserRoleGuard),
    )
}
