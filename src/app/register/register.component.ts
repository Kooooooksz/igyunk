import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from '../models/User';
import { UserService } from '../user.service';
import { AudioService } from '../audio.service';
import { Observable } from 'rxjs';
import { map, mergeAll } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})


export class RegisterComponent implements OnInit{
  signUpForm = new FormGroup({
    email:  new FormControl(""),
    password: new FormControl(""),
    address: new FormControl(""),
    name: new FormGroup({
      firstname: new FormControl(""),
      lastname: new FormControl("")
    })
  })

audioUrls: string[] = [];
audioElement: HTMLAudioElement | null = null;

 ngOnInit(): void {
  this.audioService.listAudioFiles().subscribe(urls => {
    this.audioUrls = urls;
    console.log(this.audioUrls); // Ellenőrizd a konzolban a letöltési URL-eket
    
  });
 }
  

 playAudio(url: string): void {
  // Ellenőrzi, hogy már létezik-e egy audio elem
  if (this.audioElement) {
    this.audioElement.src = url; // Beállítja az új forrást
    this.audioElement.play(); // Elindítja a lejátszást
  } else {
    // Ha nem létezik, létrehoz egy új audio elemet
    this.audioElement = new Audio(url);
    this.audioElement.play().catch(error => {
      console.error('Hiba az audio lejátszása közben:', error);
    });
  }
}

  onSubmit(){
    console.log(this.signUpForm);
    const user: User = {
      id: "" as string,
      email: (this.signUpForm.get("email")?.value as string).toLowerCase(),
      address: this.signUpForm.get("address")?.value as string,
      name: {
        firstname: this.signUpForm.get("name")?.get("firstname")?.value as string,
        lastname: this.signUpForm.get("name")?.get("lastname")?.value as string,
      }
      
    };

    this.authService.register(this.signUpForm.get("email")?.value as string, this.signUpForm.get("password")?.value as string);
    this.userService.addDocument(user);
    if(user.name.firstname.toLowerCase() === "laci" && user.name.lastname.toLowerCase() === "gáspár"){
      this.playAudio(this.audioUrls[0]);
    }
    
  

  }

  constructor(private authService: AuthService, private userService: UserService, private audioService: AudioService,
    private storage:AngularFireStorage
  ){
    
  }



}
