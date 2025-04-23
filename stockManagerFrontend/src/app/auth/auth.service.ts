import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { AuthRequest } from "./authRequest.model";
import { catchError, map, Subject, tap, throwError } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";

export interface AuthResponse {
    token: string,
    expiration: string,

}

@Injectable({ providedIn: 'root'})
export class AuthService {

    user = new Subject<User>();
    private router = inject(Router);
    tokenExpirationTimer: any;

    constructor(private httpClient: HttpClient){}

    private handleAuthentication(request: AuthRequest, response: AuthResponse){
        const user = new User(
            request.email!, 
            response.token, 
            new Date(response.expiration)
        );
        this.user.next(user);
        const expirationDuration = new Date(response.expiration).getTime() - new Date().getTime()
        this.autoLogout(expirationDuration);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    loginUser(request: AuthRequest){
        console
        return this.httpClient.post<AuthResponse>("http://localhost:5002/api/v1/User/login",
            request
        )
       .pipe(
            map((response) => response),
            catchError(() => {
                return throwError(() => new Error('Server down. Try again later'));
            })
        )
        .pipe(
            tap(response => {
                this.handleAuthentication(request, response);
            })
        );
    }

    signUpUser(request: AuthRequest){
        return this.httpClient.post<AuthResponse>("http://localhost:5002/api/v1/User/register",
            request
         )
         .pipe(
            map((response) => response),
            catchError(() => {
                return throwError(() => new Error('Server down. Try again later'));
            })
        )
        .pipe(
            tap(response => {
                this.handleAuthentication(request, response);
            })
        );
    }

    logoutUser(){
        this.user.next(null!);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');

        if(this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer)
        }

        this.tokenExpirationTimer = null;

    }

    autoLogin(){
        const userData: {
            email: string;
            _token: string;
            _expirationDate: string;
        } = JSON.parse(localStorage.getItem('userData')!);

        if(!userData){
            return;
        }

        const loadedUser = new User(
            userData.email, 
            userData._token, 
            new Date(userData._expirationDate)
        ); 

        if(loadedUser.token){
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._expirationDate).getTime() - new Date().getTime()
            this.autoLogout(expirationDuration);
        }
    }

    autoLogout(expirationDuration: number){
        this.tokenExpirationTimer = setTimeout(() => {
            this.logoutUser()
        }, expirationDuration);
    }
}