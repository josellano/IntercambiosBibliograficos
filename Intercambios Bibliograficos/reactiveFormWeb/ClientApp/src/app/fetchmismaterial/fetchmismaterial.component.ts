import { Component, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { MaterialService } from '../services/matservice.service';

@Component({
  templateUrl: './fetchmismaterial.component.html',
  styleUrls: ['../app.component.css']
})

export class FetchMisMaterialComponent {
  public matList: MaterialData[];
  public Email: string = localStorage.getItem("creador");

    constructor(public http: Http, private _router: Router, private _materialService: MaterialService) {
      this.getMisMateriales();
      
    }

  getMisMateriales() {
      this._materialService.getMaterialesOfUser(this.Email).subscribe(
            data => this.matList = data
        )
    }

   delete(materialID) {
        var ans = confirm("¿Realmente desea eliminar el material?");
        if (ans) {
            this._materialService.deleteMaterial(materialID).subscribe((data) => {
                this.getMisMateriales();
            }, error => console.error(error))
        }
  }
}

interface MaterialData {
    MaterialID: number;
    Titulo: string;
    Autor: string;
    Edicion: string;
    Carrera: string;
    Universidad: string;
    Valor: number;
    Estado: string;
    PuntoLat: string;
    PuntoLng: string;
    Email: string;
    Celular: string;
}  
