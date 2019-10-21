import { Component, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { MaterialService } from '../services/matservice.service';

@Component({
  templateUrl: './fetchmaterial.component.html',
  styleUrls: ['../app.component.css']
})

export class FetchMaterialComponent {
    public matList: MaterialData[];
    searchTerm: string;

    constructor(public http: Http, private _router: Router, private _materialService: MaterialService) {
        this.getMateriales();
    }

    getMateriales() {
        this._materialService.getMateriales().subscribe(
            data => this.matList = data
        )
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
