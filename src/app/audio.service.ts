import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  constructor(private storage: AngularFireStorage) {}

  // Lekérdezi az audios mappában található fájlokat
  listAudioFiles(): Observable<string[]> {
    return this.storage.ref('audios').listAll().pipe(
      switchMap(result => {
        // Lekérdezi a fájlok URL-jeit
        const urls$ = result.items.map(itemRef => itemRef.getDownloadURL());
        // Visszaad egy Observable-t, ami az URL-ek tömbjét adja
        return from(Promise.all(urls$));
      })
    );
  }
}
