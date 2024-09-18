import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { DrinksComponent } from './drinks/drinks.component';
import { authGuard } from './auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { UploadAudioComponent } from './upload-audio/upload-audio.component';

const routes: Routes = [
  {path: "", component: HomePageComponent},
  {path:"register", component:RegisterComponent},
  {path: "login", component:LoginComponent},
  {path: "drinks", component:DrinksComponent, canActivate: [authGuard]},
  {path: "profile", component:ProfileComponent, canActivate: [authGuard]},
  {path: "audio", component: UploadAudioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
