import { Injectable } from '@angular/core';
//import { HttpClient, HttpHeaders } from '@angular/common/http';


import { Entry } from '../entry.model';

//Set up headers
// const headers = new HttpHeaders();
// headers.append('Content-Type', 'application/json');
// headers.append('Access-Control-Allow-Origin', '*');


@Injectable()
export class EntryService {
  //private entriesUrl = 'app/entries' // URL to web API
  //constructor(private http: HttpClient) {}
  

  addComment(entryId: number, comment: { name: string, comment: string; }) {

    // Push to Enties Array

  }


  // Get Entries from the FAKE Server - server.ts // not using...
  getEntries(){
     let entries = [
      {
          id: 1,
          title: 'Pink Flowers on a nice Summers Day',
          description: 'Some pretty pink flowers in my garden',
          photo: '../assets/photos/flowers.jpg',
          comments: [
              {
                  id: 1,
                  name: 'Wendy T',
                  comment: 'This is my favorite! I love it!'
              }
          ]
      },
      {
          id: 2,
          title: 'Water Lilies and Bridge',
          description: 'Still water with floating lilies',
          photo: '../assets/photos/japanese-garden.jpg',
          comments: [
              {
                  id: 2,
                  name: 'Kyle Black',
                  comment: 'Nice!'
              },
              {
                  id: 3,
                  name: 'Alecia Clark',
                  comment: 'All the greens make this amazing.'
              }
          ]
      },
      {
          id: 3,
          title: 'The Night Sky',
          description: 'all the stars in the night sky',
          photo: '../assets/photos/night-sky.jpg',
          comments: []
      },
      {
          id: 4,
          title: 'A little Shetland Pony',
          description: 'Green fields and a little shetty',
          photo: '../assets/photos/shetty.jpg',
          comments: [
              {
                  id: 4,
                  name: 'John Doe',
                  comment: 'It looks like trouble is on the way.'
              },
              {
                  id: 5,
                  name: 'Claire T',
                  comment: 'This is my favorite! I love it!'
              }
          ]
      },
      {
          id: 5,
          title: 'Mountains tops and Snow',
          description: 'Mountains and snow in Switzerland',
          photo: '../assets/photos/mountains-switzerland.jpg',
          comments: [
              {
                  id: 6,
                  name: 'Aimee T',
                  comment: 'Beautiful!'
              }
          ]
      }
  ];
  return entries;
}
 
     
   
  }


