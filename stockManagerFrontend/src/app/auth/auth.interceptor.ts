import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable} from "rxjs";
@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    intercept(req: HttpRequest<any>, next: HttpHandler): 
    Observable<HttpEvent<any>> {

        const userData: {
            email: string;
            _token: string;
            _expirationDate: string;
        } = JSON.parse(localStorage.getItem('userData')!);

        if(userData){
            
            const modifiedReq = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${userData._token}`)
            });
            return next.handle(modifiedReq);
        }
        
        return next.handle(req);
    }
}