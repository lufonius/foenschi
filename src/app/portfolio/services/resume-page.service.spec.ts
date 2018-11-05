import { TestBed, inject } from '@angular/core/testing';

import { SkillsPageService } from './skills-page.service';
import {AngularFireModule} from "angularfire2";
import {AngularFirestore, AngularFirestoreModule, CollectionReference, DocumentReference} from "angularfire2/firestore";
import { environment } from "../../../environments/environment";
import {ResumePageService} from "./resume-page.service";

fdescribe('ResumePageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule
      ],
      providers: [ResumePageService]
    });
  });

  it('should be created', inject([ResumePageService], (service: ResumePageService) => {
    expect(service).toBeTruthy();
  }));

  fit('should kp', inject([AngularFirestore], (db: AngularFirestore) => {


  }));
});
