import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const RawHeader = createParamDecorator((_, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  // console.log(req.headers)
  console.log(req.rawHeaders);

  return req.rawHeaders;
});
