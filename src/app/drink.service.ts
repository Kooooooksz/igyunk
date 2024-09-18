import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Drink } from './models/Drink';

@Injectable({
  providedIn: 'root'
})
export class DrinkService {


  private collectionName = "Drinks";
  constructor(private fireStore: AngularFirestore) { }

  getCollection(): Observable<any[]>{
    return this.fireStore.collection(this.collectionName).valueChanges();
  }

  getDocument(id: string){
    return this.fireStore.collection(this.collectionName).doc(id).valueChanges();
  }

  getDocumentByEmail(email: string){
    return this.fireStore.collection("Users", ref => ref.where("email", "==", email)).valueChanges();
  }

  addDocument(drink: Drink): Promise<void> {
    drink.id = this.fireStore.createId();
    return this.fireStore.collection(this.collectionName).doc(drink.id).set(drink);
  }

  updateDocument(id: string, data: any): Promise<void> {
    return this.fireStore.collection(this.collectionName).doc(id).update(data);
  }

  deleteDocument(id: string): Promise<void> {
    return this.fireStore.collection(this.collectionName).doc(id).delete();
  }
}
