import { Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	
	@Input() testing: string;
	
	logo = './assets/images/logo.png';

  	ngOnInit(){
  		console.log(this.testing);
  	}

}
