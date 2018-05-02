import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup, FormArray, FormBuilder} from '@angular/forms';
import { DataService } from '../../services/data.service';
import { HttpClient,  } from '@angular/common/http';


@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styles: []
})
export class BodyComponent implements OnInit {
  yourPreferences : FormGroup
  servicingAndMot: any;
  marketing: any;
  manufacturer: any;
  
  servicingAndMotSelects: any = [];
  marketingSelects: any = [];
  manufacturerSelects: any = [];

  data: any

  constructor(private formBuilder: FormBuilder, private dataservice: DataService) { }

  ngOnInit() {
    this.yourPreferences = this.formBuilder.group({
      servicingAndMot: this.formBuilder.array([]),
      marketing: this.formBuilder.array([]),
      manufacturer: this.formBuilder.array([])
    });

    setTimeout((res)=> {
      this.servicingAndMot = ["Post", "Email", "SMS", "Telephone", "All"];
      this.marketing = ["Post", "Email", "SMS", "Telephone", "All"];
      this.manufacturer = ["Post", "Email", "SMS", "Telephone", "All"]
    });

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
  onSubmit(){
    
    this.data = {
      servicingandmots: this.servicingAndMotSelects,
      marketing: this.marketingSelects,
      manufacturer: this.manufacturerSelects
    }
    console.log(this.data);

    this.dataservice.submitPreferences(this.data).subscribe(
      (res) => {
        console.log(res)
      }
    )
  }
    
}
