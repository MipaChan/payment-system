import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@app/entity'

export const getCurrentUserByContext = (context: ExecutionContext): User => {

    if (context.getType() === 'http') {
        return context.switchToHttp().getRequest().email;
    }
    if (context.getType() === 'rpc') {
        return context.switchToRpc().getData().email;
    }
};

export const CurrentUser = createParamDecorator(
    (_data: unknown, context: ExecutionContext) =>
        getCurrentUserByContext(context),
);