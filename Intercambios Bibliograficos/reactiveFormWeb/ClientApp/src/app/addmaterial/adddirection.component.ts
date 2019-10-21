import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MaterialService } from '../services/matservice.service';

import { Input, ViewChild, NgZone } from '@angular/core';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { GoogleMapsAPIWrapper } from '@agm/core/services';


declare var google: any;

interface Location {
  lat: number;
  lng: number;
  viewport?: Object;
  zoom: number;
  address_level_1?: string;
  address_level_2?: string;
  address_country?: string;
  address_state?: string;
}

@Component({
  templateUrl: './addDirection.component.html',
  styleUrls: ['./addDirection.component.css', '../app.component.css']
})

export class createdireccion {
  title: string = "Create";
  errorMessage: any;
  public noResults: boolean = true;

  geocoder: any;
  public location: Location = {
    lat: null,
    lng: null,
    zoom: 16
  };
  
  constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute,
    private _materialService: MaterialService, private _router: Router,
    public mapsApiLoader: MapsAPILoader, private zone: NgZone,
    private wrapper: GoogleMapsAPIWrapper) {
   

    this.mapsApiLoader = mapsApiLoader;
    this.zone = zone;
    this.wrapper = wrapper;
    this.mapsApiLoader.load().then(() => { this.geocoder = new google.maps.Geocoder(); });

  }

  updateOnMap() {
    let full_address: string = this.location.address_level_1 || ""
    if (this.location.address_level_2) full_address = full_address + " " + this.location.address_level_2
    if (this.location.address_state) full_address = full_address + " " + this.location.address_state
    if (this.location.address_country) full_address = full_address + " " + this.location.address_country

    this.findLocation(full_address);

  }

  findLocation(address) {
    if (!this.geocoder) this.geocoder = new google.maps.Geocoder()
    this.geocoder.geocode({
      'address': address
    }, (results, status) => {
      
      if (status == google.maps.GeocoderStatus.OK) {
        for (var i = 0; i < results[0].address_components.length; i++) {
          let types = results[0].address_components[i].types

          if (types.indexOf('locality') != -1) {
            this.location.address_level_2 = results[0].address_components[i].long_name
          }
          if (types.indexOf('country') != -1) {
            this.location.address_country = results[0].address_components[i].long_name
          }
          if (types.indexOf('administrative_area_level_1') != -1) {
            this.location.address_state = results[0].address_components[i].long_name
          }
        }

        if (results[0].geometry.location) {
          this.location.lat = results[0].geometry.location.lat();
          this.location.lng = results[0].geometry.location.lng();
          this.location.viewport = results[0].geometry.viewport;

        }
      } else {
        this.noResults = false;
      }
    })
  }

  siguiente() {

    this._router.navigate(['/register-material/' + this.location.lat + '/' + this.location.lng]);
  }

}
