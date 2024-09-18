import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { firebaseConfig } from './environment';
import { AngularFireModule } from '@angular/fire/compat';
import { LoginComponent } from './login/login.component';
import { DrinksComponent } from './drinks/drinks.component';
import { ProfileComponent } from './profile/profile.component';
import { SigmaPipe } from './sigma.pipe';
import { AddDrinkComponent } from './add-drink/add-drink.component';
import { UploadAudioComponent } from './upload-audio/upload-audio.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomePageComponent,
    RegisterComponent,
    LoginComponent,
    DrinksComponent,
    ProfileComponent,
    SigmaPipe,
    AddDrinkComponent,
    UploadAudioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [
    provideFirebaseApp(() => initializeApp({"projectId":"igyunk-e31d7","appId":"1:1043534981809:web:cc63f58215e9ba69f55090","storageBucket":"igyunk-e31d7.appspot.com","apiKey":"AIzaSyDes7zKru58xC7VIeeASYzCXtU9nufFf50","authDomain":"igyunk-e31d7.firebaseapp.com","messagingSenderId":"1043534981809","measurementId":"G-SSRVS671JT"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
