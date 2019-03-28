import { inject, TestBed } from '@angular/core/testing';

import { SkillsPageService } from './skills-page.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../../../environments/environment';

describe('SkillsPageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AngularFireModule.initializeApp(environment.firebase), AngularFirestoreModule],
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
