import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";
import {ServiceModel} from "../models/service.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  api_url = environment.api_url + 'services/'
  constructor(private httpClient : HttpClient) { }

  addService(service:ServiceModel){
    return this.httpClient.post(this.api_url,service);
  }
  getAllServices() : Observable<ServiceModel[]> {
    return this.httpClient.get<ServiceModel[]>(this.api_url);
  }
  getServiceById(id: number) {
    return this.httpClient.get(this.api_url + `${id}`);
  }
  updateService(id: number, service: ServiceModel): Observable<ServiceModel>{
    return this.httpClient.patch<ServiceModel>(this.api_url + `${id}`, service);
  }
  deleteServiceById(id: number) {
    return this.httpClient.delete(this.api_url + `${id}`);
  }
}
