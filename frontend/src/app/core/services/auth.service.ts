import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {LoginFormType} from "../types/login-form.type";
import {TokensType} from "../types/tokens.type";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api_url = environment.api_url + 'auth/'
  constructor(private httpClient: HttpClient) {
  }

  login(credentials: LoginFormType): Observable<TokensType>{
    return this.httpClient.post<TokensType>(this.api_url + 'local/signin',credentials);
  }
  logout(){
    return this.httpClient.post(this.api_url + 'logout',{})
  }
  refreshAccessToken(refreshToken: string | null): Observable<TokensType>{
    return this.httpClient.post<TokensType>(this.api_url+ 'refresh',refreshToken);
  }
  setTokensInLocalStorage(tokens: TokensType){
    localStorage.setItem('Tokens', JSON.stringify(tokens));
  }
  getTokensFromLocalStorage(){
    const tokens = localStorage.getItem('Tokens');
    return tokens ? JSON.parse(tokens) : null;
  }
  clearTokensFromLocalStorage(){
    localStorage.removeItem('Tokens');
  }
}
