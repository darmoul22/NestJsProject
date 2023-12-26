import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  api_url = environment.api_url + 'auth/local/signin'
  constructor(private httpClient: HttpClient) {
  }

}
