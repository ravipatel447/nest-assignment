import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((res) => ({
        success: true,
        message: res.message
          ? res.message
          : 'Process has been completed successfully',
        data: res.data ? res.data : res,
      })),
    );
  }
}
