import { Component, Input,Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DrinkService } from '../drink.service';
import { Drink } from '../models/Drink';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'add-drink',
  templateUrl: './add-drink.component.html',
  styleUrl: './add-drink.component.scss'
})
export class AddDrinkComponent implements OnInit{
  constructor(private drinkService: DrinkService,
    private authService: AuthService,
    private userService: UserService,
    private storage: AngularFireStorage
  ){}
  userC: any;
  userDatas: any;
  drinks$!: Observable<any[]>;
  userEmail: any;
  selectedFile: File | null = null;
  editMode: { [key: string]: boolean } = {}; // Szerkesztési állapot tárolása
  
  
  drinkForm = new FormGroup({
    name: new FormControl(""),
    category: new FormControl(""),
    description: new FormControl("")
  })

  @Input()
  valtozo!: string;

  @Output() 
  userCChange = new EventEmitter<string>();

  ngOnInit(): void {
    this.authService.getUser().subscribe(
      user => {
        this.userEmail = user.email;
        this.userService.getDocumentByEmail(user.email).subscribe(
          userDatas => {
            this.userDatas = userDatas[0] as User;
            this.userC = this.userDatas.email;
            this.userCChange.emit(this.userDatas.name.firstname +" " + this.userDatas.name.lastname);
          })
      }
    )
  }

  addDrink(){
    this.authService.getUser().subscribe(
      user => {
        this.userEmail = user.email;
        this.userService.getDocumentByEmail(user.email).subscribe(
          userDatas => {
            this.userDatas = userDatas[0] as User;
            this.userC = this.userDatas.email;
            this.userCChange.emit(this.userDatas.firstname +" " + this.userDatas.lastname);

            const drink: Drink = {
              id: "" as string,
              name: this.drinkForm.get("name")?.value as string,
              category: this.drinkForm.get("category")?.value as string,
              description: this.drinkForm.get("description")?.value as string,
              creator: this.userC
        
            }
            
            if (this.selectedFile) {
              const filePath = `drinks/${this.selectedFile.name}`;
              const fileRef = this.storage.ref(filePath);
              this.storage.upload(filePath, this.selectedFile).then(() => {
                fileRef.getDownloadURL().subscribe(url => {
                  drink.imageUrl = url;
                  this.drinkService.addDocument(drink);
                });
              });
            } else {
              this.drinkService.addDocument(drink);
            }
          }
        )
      }
    )    
  }

  onFileSelected(event: Event, drink?: Drink) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }
}
