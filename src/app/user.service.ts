import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { User } from './models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private collectionName = "Users";
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

  addDocument(user: User): Promise<void> {
    user.id = this.fireStore.createId();
    return this.fireStore.collection(this.collectionName).doc(user.id).set(user);
  }

  updateDocument(id: string, data: any): Promise<void> {
    return this.fireStore.collection(this.collectionName).doc(id).update(data);
  }

  deleteDocument(id: string): Promise<void> {
    return this.fireStore.collection(this.collectionName).doc(id).delete();
  }
}
