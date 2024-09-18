import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Request } from './models/Request';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private collectionName = "Requests";
  constructor(private fireStore: AngularFirestore) { }

  async checkWhoToWhoPair(who: string, toWho: string): Promise<boolean> {
    const querySnapshot = await firstValueFrom(
      this.fireStore.collection(this.collectionName, ref =>
        ref.where('who', '==', who).where('toWho', '==', toWho)
      ).get()
    );

    // If the query snapshot is not empty, it means a matching pair exists
    return !querySnapshot.empty;
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
    
    this.checkWhoToWhoPair(request.who, request.toWho).then(
      isIn => {
        if (isIn) {
          // Document with the same who and toWho already exists
          return Promise.reject('Document with the same who and toWho pair already exists.');
        } else {
          // No matching document found, proceed with adding the new document
          request.id = this.fireStore.createId();
          return this.fireStore.collection(this.collectionName).doc(request.id).set(request);
        }
      }
    );
    
  }
  

  updateDocument(id: string, data: any): Promise<void> {
    return this.fireStore.collection(this.collectionName).doc(id).update(data);
  }

  deleteDocument(id: string): Promise<void> {
    return this.fireStore.collection(this.collectionName).doc(id).delete();
  }
}
