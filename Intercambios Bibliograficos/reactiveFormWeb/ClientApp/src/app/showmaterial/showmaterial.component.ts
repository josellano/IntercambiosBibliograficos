import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MaterialService } from '../services/matservice.service';

import { Input, ViewChild, NgZone } from '@angular/core';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { GoogleMapsAPIWrapper } from '@agm/core/services';



declare var google: any;

interface Marker {
    lat: number;
    lng: number;
    label?: string;
    draggable: boolean;
}

interface Location {
    lat: number;
    lng: number;
    viewport?: Object;
    zoom: number;
    address_level_1?: string;
    address_level_2?: string;
    address_country?: string;
    address_state?: string;
    marker?: Marker;
}

@Component({
    templateUrl: './showmaterial.component.html',
  styleUrls: ['./showmaterial.component.css','../app.component.css']
})

export class ShowMaterialComponent {
    geocoder: any;
    public location: Location = {
      lat: Number(this._avRoute.snapshot.params["puntoLat"]),
      lng: Number(this._avRoute.snapshot.params["puntoLng"]),
        marker: {
          lat: Number(this._avRoute.snapshot.params["puntoLat"]),
          lng: Number(this._avRoute.snapshot.params["puntoLng"]),
          draggable: true
        },
        zoom: 16
    };

    @ViewChild(AgmMap) map: AgmMap;

    public mat: MaterialData;
    materialId: number;

   
    constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute,
        private _materialService: MaterialService, private _router: Router,
        public mapsApiLoader: MapsAPILoader, private zone: NgZone,
        private wrapper: GoogleMapsAPIWrapper) {
        this.materialId = this._avRoute.snapshot.params["id"];
        this.getMaterialById(this.materialId);

        this.mapsApiLoader = mapsApiLoader;
        this.zone = zone;
        this.wrapper = wrapper;
        this.mapsApiLoader.load().then(() => {
        this.geocoder = new google.maps.Geocoder();
        });

        
    }
    getMaterialById(materialId) {
        this._materialService.getMaterialById(materialId).subscribe(
            data => this.mat = data
        )
      
    }
	
	  
  

  verDireccion() {
    this.findAddressByCoordinates();
  }

    findAddressByCoordinates() {
        this.geocoder.geocode({
            'location': {
                lat: this.location.marker.lat,
                lng: this.location.marker.lng
            }
        }, (results, status) => {
            this.decomposeAddressComponents(results);
        })
    }

  decomposeAddressComponents(addressArray) {
    if (addressArray.length == 0) return false;
    let address = addressArray[0].address_components;

    for (let element of address) {
      if (element.length == 0 && !element['types']) continue

      if (element['types'].indexOf('street_number') > -1) {
        this.location.address_level_1 = element['long_name'];
        continue;
      }
      if (element['types'].indexOf('route') > -1) {
        this.location.address_level_1 += ', ' + element['long_name'];
        continue;
      }
      if (element['types'].indexOf('locality') > -1) {
        this.location.address_level_2 = element['long_name'];
        continue;
      }
      if (element['types'].indexOf('administrative_area_level_1') > -1) {
        this.location.address_state = element['long_name'];
        continue;
      }
      if (element['types'].indexOf('country') > -1) {
        this.location.address_country = element['long_name'];
        continue;
      }
    }
  }

  return() {
    this._router.navigate(['/fetch-material']);
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
