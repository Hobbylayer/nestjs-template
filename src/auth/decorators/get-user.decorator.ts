import { createParamDecorator, ExecutionContext, InternalServerErrorException } from "@nestjs/common";

export const GetUser = createParamDecorator((data: string[], ctx: ExecutionContext) => {

    const req = ctx.switchToHttp().getRequest()
    let user = req.user;

    if (data) {
        let userWithSelectedProperties = {}
        data.forEach((userProperty) => {
            return userWithSelectedProperties[userProperty] = user[userProperty]
        })
        return userWithSelectedProperties
    }

    if (!user) throw new InternalServerErrorException('User not found')

    return user
});