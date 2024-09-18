import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  constructor(private authService: AuthService){}
  logout(){
    this.authService.logout();
  }
  showLoggedIn(){
    this.authService.isLoggedIn().subscribe(
      isLoggedIn => {
        this.isLoggedIn = isLoggedIn;
      }
    );
  }

  ngOnInit(){
    this.showLoggedIn();
  }
}
