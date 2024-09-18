import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<any>;

  constructor(private fireAuth: AngularFireAuth, private router: Router) {
    // Subscribe to authState to get the current user's login status
    this.user$ = this.fireAuth.authState;
  }

  register(email: string, password: string){
      this.fireAuth.createUserWithEmailAndPassword(email, password).then(
        () => {
          alert("Sikeresen regisztráltál bazdmeg");
          this.router.navigate(["/"]);
        },
        err => {
          alert(err.message);
          
        }
      )
  }


  login(email: string, password: string){
    this.fireAuth.signInWithEmailAndPassword(email, password).then(
      () => {
        alert("Sikeresen bejelentkeztél bazdmeg");
        this.router.navigate(["/"]);
      },
      err => {
        alert(err.message);
        
      }
    )
  }

  isLoggedIn(): Observable<boolean> {
    return this.fireAuth.authState.pipe(
      map(user => !!user) // map the user object to a boolean
    );
  }


  getUser(): Observable<any> {
    return this.fireAuth.authState;
  }

  logout(){
    this.fireAuth.signOut();
  }
}
