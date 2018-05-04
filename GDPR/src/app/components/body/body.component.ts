import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup, FormArray, FormBuilder} from '@angular/forms';
import { DataService } from '../../services/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient,  } from '@angular/common/http';


@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styles: []
})
export class BodyComponent implements OnInit {
  dataReady: boolean = false;
  customerId: string;
  yourPreferences : FormGroup
  servicingAndMot: any;
  marketing: any;
  manufacturer: any;
  
  servicingAndMotSelects: any = [];
  marketingSelects: any = [];
  manufacturerSelects: any = [];
  data: any
  step = 0;

  constructor(
    private formBuilder: FormBuilder,
    private dataservice: DataService,
    private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.customerId = this.activatedRoute.snapshot.params['customerid'];
    // Get Customer ID on load, to show customers name -
    this.dataservice.getCustomerData(this.customerId).subscribe(
      (res) => {
        this.dataReady = true;
        console.log(res);
      })

    // ==============
    // Build your Preferences Form
    this.yourPreferences = this.formBuilder.group({
      servicingAndMot: this.formBuilder.array(['', Validators.required]),
      marketing: this.formBuilder.array(['', Validators.required]),
      manufacturer: this.formBuilder.array(['', Validators.required])
    });

    setTimeout((res)=> {
      this.servicingAndMot = ["Post", "Email", "SMS", "Telephone", "All"];
      this.marketing = ["Post", "Email", "SMS", "Telephone", "All"];
      this.manufacturer = ["Post", "Email", "SMS", "Telephone", "All"]
    });

  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  onChange(event) {
    
    if(event.source.name === 'servicingAndMot'){
      if(event.checked){
      this.servicingAndMotSelects.push(event.source.value);
      } else {
          const i = this.servicingAndMotSelects.findIndex(x => x.value === event.source.value);
          this.servicingAndMotSelects.pop(i);
      }
    }

    else if (event.source.name === 'marketing') {
      if(event.checked){
      this.marketingSelects.push(event.source.value);
    } else {
      const i = this.marketingSelects.findIndex(x => x.value === event.source.value);
      this.marketingSelects.pop(i);
    }
  }

    else if  (event.source.name === 'manufacturer') {
      if (event.checked) {
      this.manufacturerSelects.push(event.source.value);
      } else {
        const i = this.manufacturerSelects.findIndex(x => x.value === event.source.value);
        this.manufacturerSelects.pop(i);
      } 
  }
   
}

checkReady(){
  if(this.servicingAndMotSelects.length >= 1 && this.marketingSelects.length >= 1 && this.manufacturerSelects.length >= 1) {
   return true;
  } 
}
  onSubmit(){
    if (this.yourPreferences.valid) {
    this.data = {
      servicingandmots: this.servicingAndMotSelects,
      marketing: this.marketingSelects,
      manufacturer: this.manufacturerSelects
    }
    console.log(this.data);

    this.dataservice.submitPreferences(this.data).subscribe(
      (res) => {
        console.log(res)
      })
  } // end of if -----
} // end of onSubmit Function ===== 
    
}
