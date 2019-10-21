import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class MaterialService {
  myAppUrl: string = "";

  constructor(private _http: Http, @Inject('BASE_URL') baseUrl: string) {
    this.myAppUrl = baseUrl;
  }

  getMateriales() {
    return this._http.get(this.myAppUrl + 'api/Material/Index')
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  getMaterialesOfUser(Email: string) {
    return this._http.get(this.myAppUrl + "api/Material/IndexUser/"+ Email)
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  getMaterialById(id: number) {
    return this._http.get(this.myAppUrl + "api/Material/Details/" + id)
      .map((response: Response) => response.json())
      .catch(this.errorHandler)
  }

  saveMaterial(material) {
    return this._http.post(this.myAppUrl + 'api/Material/Create', material)
      .map((response: Response) => response.json())
      .catch(this.errorHandler)
  }

  updateMaterial(material) {

    return this._http.put(this.myAppUrl + 'api/Material/Edit', material)
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  deleteMaterial(id) {
    return this._http.delete(this.myAppUrl + "api/Material/Delete/" + id)
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  errorHandler(error: Response) {
    console.log(error);
    return Observable.throw(error);
  }
}  
