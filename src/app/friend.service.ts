import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Request } from './models/Request';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  private collectionName = "Friends";
  constructor(private fireStore: AngularFirestore) { }

  async checkWhoToWhoPair(who: string, toWho: string): Promise<boolean> {
    // Query for who-toWho pair
    const querySnapshot1 = await firstValueFrom(
      this.fireStore.collection(this.collectionName, ref =>
        ref.where('who', '==', who).where('toWho', '==', toWho)
      ).get()
    );
  
    // Query for toWho-who pair (reverse)
    const querySnapshot2 = await firstValueFrom(
      this.fireStore.collection(this.collectionName, ref =>
        ref.where('who', '==', toWho).where('toWho', '==', who)
      ).get()
    );
  
    // Return true if either query has results
    return !querySnapshot1.empty || !querySnapshot2.empty;
  }

  getCollection(): Observable<any[]>{
    return this.fireStore.collection(this.collectionName).valueChanges();
  }

  getDocument(id: string){
    return this.fireStore.collection(this.collectionName).doc(id).valueChanges();
  }

  getDocumentByToWho(toWho: string){
    return this.fireStore.collection(this.collectionName, ref => ref.where("toWho", "==", toWho)).valueChanges();
  }

  getDocumentByWhoAndToWho(who:string, toWho: string){
    return this.fireStore.collection(this.collectionName, ref => ref.where("who", "==", who).where("toWho", "==", toWho)).valueChanges();
  }

  async addDocument(request: Request): Promise<void> {
    // Ellenőrizzük, hogy létezik-e már a pár
    const isIn = await this.checkWhoToWhoPair(request.who, request.toWho);
    
    if (isIn) {
      // Dokumentum létezik már, visszautasítjuk a Promise-t
      return Promise.reject('Document with the same who and toWho pair already exists.');
    } else {
      // Ha nem létezik, folytatjuk az új dokumentum hozzáadását
      request.id = this.fireStore.createId();
      return this.fireStore.collection(this.collectionName).doc(request.id).set(request);
    }
  }
  
  

  updateDocument(id: string, data: any): Promise<void> {
    return this.fireStore.collection(this.collectionName).doc(id).update(data);
  }

  deleteDocument(id: string): Promise<void> {
    return this.fireStore.collection(this.collectionName).doc(id).delete();
  }
}
