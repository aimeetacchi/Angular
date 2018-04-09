import { Component } from '@angular/core';

@Component ({
    selector: 'app-entry',
    templateUrl: 'entry.component.html',
    styleUrls: ['entry.component.css']
})
export class EntryComponent {
        title:string = 'My first photo';
        photo: string = 'https://placeimg.com/640/480/nature';
        description: string = 'A Description of my first photo';
        comments: any[] = [
            {name: "Aimee", comment: "wow I love this!"},
            {name: "Claire", comment: "oooh it's cute"},
            {name: "Gareth", comment: "nice pic"},
        ]
}