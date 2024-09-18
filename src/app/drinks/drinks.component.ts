import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { DrinkService } from '../drink.service';
import { Drink } from '../models/Drink';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { User } from '../models/User';
import { Request } from '../models/Request';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { RequestService } from '../request.service';
import { FriendService } from '../friend.service';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.scss']
})
export class DrinksComponent implements OnInit {

  drinks$!: Observable<Drink[]>;
  userFullName: string | undefined;
  userEmail: string | undefined;
  selectedFile: File | null = null;
  editMode: { [key: string]: boolean } = {};
  szulo_valtozo: string = "Suekseltem anyaddal :((";
  userCFromChild: string | undefined;
  isRequestSent: boolean = false;
  friendStatuses: { [key: string]: boolean } = {};

  constructor(
    private drinkService: DrinkService,
    private authService: AuthService,
    private userService: UserService,
    private requestService: RequestService,
    private friendService: FriendService,
    private storage: AngularFireStorage
  ) {}

  ngOnInit() {
    this.drinks$ = this.authService.getUser().pipe(
      switchMap(user => {
        return this.userService.getDocumentByEmail(user.email).pipe(
          tap(userDetails => {
            const userData = userDetails[0] as User;
            this.userFullName = `${userData.name.lastname} ${userData.name.firstname}`;
            this.userEmail = userData.email;
          }),
          switchMap(() => this.drinkService.getCollection()),
          tap(drinks => this.loadFriendStatuses(drinks))
        );
      })
    );
  }

  editDrink(id: string) {
    this.editMode[id] = true;
  }

  cancelEdit(id: string) {
    this.editMode[id] = false;
  }

  deleteDrink(drink: Drink) {
    this.drinkService.deleteDocument(drink.id);
  }

  updateDrink(drink: Drink) {
    if (this.selectedFile) {
      const filePath = `drinks/${this.selectedFile.name}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, this.selectedFile);

      task.snapshotChanges().subscribe(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          drink.imageUrl = url;
          this.drinkService.updateDocument(drink.id, drink).then(() => {
            this.editMode[drink.id] = false;
          });
        });
      });
    } else {
      this.drinkService.updateDocument(drink.id, drink).then(() => {
        this.editMode[drink.id] = false;
      });
    }
  }

  onFileSelected(event: Event, drink?: Drink) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  handlerUserChange(userC: string) {
    this.userCFromChild = userC;
  }

  async sendRequest(drink: Drink) {
    if (!this.userEmail) return;

    const request: Request = {
      id: "",
      who: this.userEmail,
      toWho: drink.creator
    };

    try {
      this.isRequestSent = await this.requestService.checkWhoToWhoPair(request.who, request.toWho);
      if (!this.isRequestSent) {
        await this.requestService.addDocument(request);
        console.log("Request sent successfully");
      } else {
        console.log("Request already sent");
      }
    } catch (error) {
      console.error("Error sending request:", error);
    }
  }

  async areFriends(drink: Drink): Promise<boolean> {
    if (!this.userEmail || !drink.creator) {
      return false;
    }
    return this.friendService.checkWhoToWhoPair(this.userEmail, drink.creator);
  }

  async loadFriendStatuses(drinks: Drink[]) {
    for (const drink of drinks) {
      this.friendStatuses[drink.id] = await this.areFriends(drink);
    }
  }
}
