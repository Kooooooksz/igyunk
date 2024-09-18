import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { User } from '../models/User';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit{
  isLoggedIn: boolean = false;
  userDatas: any;
  userName: any;
  constructor(private authService: AuthService, private userService:UserService){}

  
  ngOnInit(): void {
    // Subscribe to the authState observable to track login status
    this.authService.isLoggedIn().subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      console.log('User logged in:', this.isLoggedIn);

      if (isLoggedIn) {
        this.authService.getUser().subscribe(
          user => {
            this.userService.getDocumentByEmail(user.email).subscribe(userDatas => {
              console.log(user.email);
              console.log(userDatas);
              this.userDatas = userDatas[0];
              this.userName = this.userDatas.name.firstname;
              
            });
          }
        )
      }
    });
  }

  currentStyle = 'greet-style-one';

  // Függvény a stílus váltására
  toggleStyle() {
    this.currentStyle = this.currentStyle === 'greet-style-one' 
      ? 'greet-style-two' 
      : 'greet-style-one';
  }

  
}
