import { ApplicationConfig } from "@angular/core";
import { provideRouter, withComponentInputBinding, withRouterConfig } from "@angular/router";
import { routes } from "./app.routes";
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from "@angular/common/http";
import { AuthInterceptor } from "./auth/auth.interceptor";

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes, withComponentInputBinding(), withRouterConfig({
            paramsInheritanceStrategy: 'always'
        })),
        provideHttpClient( withInterceptorsFromDi()),
        {
            provide: HTTP_INTERCEPTORS, 
            useClass: AuthInterceptor,
            multi: true,
        }
    ]
}