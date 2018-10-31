import { TestBed, inject } from '@angular/core/testing';

import { SkillsPageService } from './skills-page.service';
import {AngularFireModule} from "angularfire2";
import {AngularFirestoreModule} from "angularfire2/firestore";
import { environment } from "../../../environments/environment";

describe('SkillsPageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule
      ],
      providers: [SkillsPageService]
    });
  });

  it('should be created', inject([SkillsPageService], (service: SkillsPageService) => {
    expect(service).toBeTruthy();
  }));

  it('should kp', inject([SkillsPageService], (service: SkillsPageService) => {
    service.getSkillsPage('de-ch').subscribe((kp: any) => {
      console.log(kp);
    });
  }));
});
