import { TestBed, inject } from '@angular/core/testing';

import { ProjectService } from './project.service';
import {AngularFireModule} from "angularfire2";
import {AngularFirestoreModule} from "angularfire2/firestore";
import {environment} from "../../../environments/environment";
import {SkillsPageService} from "./skills-page.service";

fdescribe('ProjectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule
      ],
      providers: [ProjectService]
    });
  });

  it('should be created', inject([ProjectService], (service: ProjectService) => {
    expect(service).toBeTruthy();
  }));

  it('should kp', inject([ProjectService], (service: ProjectService) => {
    service.getProjects('en-gb', 'frontendTemplate').subscribe((kp: any) => {
      console.log(kp);
    });
  }));
});
