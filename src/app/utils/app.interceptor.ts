import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { NotificationService } from '../services/notification.service';

export class HttpError {
  static BadRequest = 400;
  static Unauthorized = 401;
  static Forbidden = 403;
  static NotFound = 404;
  static TimeOut = 408;
  static Conflict = 409;
  static InternalServerError = 500;
}


@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor(
    private spinner: NgxSpinnerService,
    private notificationService: NotificationService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.spinner.show();
    return next.handle(req).pipe(

      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.spinner.hide();
        }
        return event;
      }),

      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          case HttpError.BadRequest:
            this.notificationService.showSimpleMessage(
              error.error.message ?? 'Bad Request to the Server', 'Close'
            );
            break;

          case HttpError.NotFound:
            this.notificationService.showSimpleMessage(
              error.error.message ?? 'Element not found', 'Close'
            );
            break;

          case HttpError.InternalServerError:
            this.notificationService.showSimpleMessage(
              error.error.message ?? 'Server internal error. Contact administrator!' , 'Close'
            );
            break;

          default:
            const started = Date.now();
            const elapsed = Date.now() - started;
            console.log(`Request for ${req.urlWithParams} failed after ${elapsed} ms.`);
            break;
        }
        this.spinner.hide()
        return throwError(error);
      })
    );
  }
}