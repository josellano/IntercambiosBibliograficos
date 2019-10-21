import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FetchMaterialComponent } from '../fetchmaterial/fetchmaterial.component';
import { MaterialService } from '../services/matservice.service';

import { Input, ViewChild, NgZone } from '@angular/core';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { GoogleMapsAPIWrapper } from '@agm/core/services';


@Component({
  templateUrl: './addMaterial.component.html',
  styleUrls: ['../app.component.css', './addMaterial.component.css']
})

export class creatematerial implements OnInit {
  materialForm: FormGroup;
  title: string = "Create";
  materialId: number;
  errorMessage: any;
  lat: number;
  lng: number;
  mail: string;
 
  constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute,
    private _materialService: MaterialService, private _router: Router) {
    this.materialId = this._avRoute.snapshot.params["id"];
    this.lat = this._avRoute.snapshot.params["puntoLat"];
    this.lng = this._avRoute.snapshot.params["puntoLng"];

    

    this.materialForm = this._fb.group({
      materialID: 0,
      titulo: ['', [Validators.required]],
      autor: ['', [Validators.required]],
      edicion: ['', [Validators.required]],
      carrera: ['', [Validators.required]],
      universidad: ['', [Validators.required]],
      valor: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      celular: 0,
      email: [localStorage.getItem("creador"), [Validators.nullValidator]],
      puntoLat: [this.lat, [Validators.nullValidator]],
      puntoLng: [this.lng, [Validators.nullValidator]],

    })
  }

  ngOnInit() {
    
    if (this.materialId > 0) {
      this.title = "Edit";
    
      this._materialService.getMaterialById(this.materialId)
        .subscribe(resp => this.materialForm.setValue(resp)
          , error => this.errorMessage = error);
    }

  }

  save() {
    if (!this.materialForm.valid) {
      return;
    }   
    if (this.title == "Create") {
      this._materialService.saveMaterial(this.materialForm.value)
        .subscribe((data) => {
          this._router.navigate(['/fetch-material']);
        }, error => this.errorMessage = error)
     
     
    }
    else
      if (this.title == "Edit") {
        this._materialService.updateMaterial(this.materialForm.value)
          .subscribe((data) => {
            this._router.navigate(['/fetch-material']);
          }, error => this.errorMessage = error)
      }

  }

  cancel() {
    this._router.navigate(['/fetch-material']);
  }

  get titulo() { return this.materialForm.get('titulo'); }
  get autor() { return this.materialForm.get('autor'); }
  get edicion() { return this.materialForm.get('edicion'); }
  get carrera() { return this.materialForm.get('carrera'); }
  get universidad() { return this.materialForm.get('universidad'); }
  get valor() { return this.materialForm.get('valor'); }
  get estado() { return this.materialForm.get('estado'); }
  get puntoLat() { return this.materialForm.get('puntoLat'); }
  get puntoLng() { return this.materialForm.get('puntoLng'); }
  get email() { return this.materialForm.get('email'); }
  get celular() { return this.materialForm.get('celular'); }
}

