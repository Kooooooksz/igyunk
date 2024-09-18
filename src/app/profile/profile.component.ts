import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { User } from '../models/User';
import { authState } from '@angular/fire/auth';
import { RequestService } from '../request.service';
import { Observable } from 'rxjs';
import { Request } from '../models/Request';
import { FriendService } from '../friend.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  userDatas!: User[];
  constructor(private authService: AuthService,
              private userService: UserService,
              private requestService: RequestService,
              private friendService: FriendService){
  }
  requests$!: Observable<any[]>;

  ngOnInit(): void {
    this.authService.getUser().subscribe(user => {
      this.userService.getDocumentByEmail(user.email).subscribe(userData => {
        this.userDatas = userData as User[];
        this.requests$ = this.requestService.getDocumentByToWho(this.userDatas[0].email);
        //console.log(this.userDatas);
      });  
    })
  }

  accept(request: Request){
    this.friendService.addDocument(request);
    this.delete(request);


  }

  delete(request: Request){
    this.requestService.getDocumentByWhoAndToWho(request.who, request.toWho).subscribe(
      req => {
        this.requestService.deleteDocument((req[0] as Request)?.id);
      }
    )
    
  }
}
