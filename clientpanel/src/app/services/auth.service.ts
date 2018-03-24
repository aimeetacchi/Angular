import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }

  // Login user ========
  login(email: string, password: string) {
  	return new Promise((resolve, reject) => {
  		this.afAuth.auth.signInWithEmailAndPassword(email, password)
  		.then(userData => resolve(userData), err => reject(err))
  	});
  }

  // Register a new user =======
  register(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(userData => resolve(userData), err => reject(err))
    });
  }

  // checking authentication
  getAuth(){
  	return this.afAuth.authState.map(auth => auth)
  }

  logout(){
  	this.afAuth.auth.signOut();
  }

}
