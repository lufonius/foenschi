import { TestBed, inject } from '@angular/core/testing';

import { FrontPageService } from './front-page.service';

describe('FrontPageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FrontPageService]
    });
  });

  it('should be created', inject([FrontPageService], (service: FrontPageService) => {
    expect(service).toBeTruthy();
  }));
});
