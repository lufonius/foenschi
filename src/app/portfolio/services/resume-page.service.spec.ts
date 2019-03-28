import { inject, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../../../environments/environment';
import { ResumePageService } from './resume-page.service';

fdescribe('ResumePageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AngularFireModule.initializeApp(environment.firebase), AngularFirestoreModule],
      providers: [ResumePageService]
    });
  });

  it('should be created', inject([ResumePageService], (service: ResumePageService) => {
    expect(service).toBeTruthy();
  }));

  fit('should kp', inject([AngularFirestore], (db: AngularFirestore) => {
  }));
});
