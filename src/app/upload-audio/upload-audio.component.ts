import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-upload-audio',
  templateUrl: './upload-audio.component.html',
  styleUrls: ['./upload-audio.component.scss']
})
export class UploadAudioComponent {
  selectedFile: File | null = null;
  downloadURL$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(private storage: AngularFireStorage) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  uploadFile() {
    if (this.selectedFile) {
      const filePath = `audios/${this.selectedFile.name}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, this.selectedFile);

      task.snapshotChanges().subscribe({
        next: () => {
          fileRef.getDownloadURL().subscribe({
            next: (url) => {
              this.downloadURL$.next(url); // Update the observable with the download URL
            },
            error: (err) => {
              console.error('Error getting download URL', err);
            }
          });
        },
        error: (err) => {
          console.error('Error uploading file', err);
        }
      });
    }
  }
}
