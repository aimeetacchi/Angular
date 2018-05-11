import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer>
      website App built by <a href="https://www.aimee-tacchi.co.uk">Aimee Tacchi</a>
    </footer>
  `,
  styles: []
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
