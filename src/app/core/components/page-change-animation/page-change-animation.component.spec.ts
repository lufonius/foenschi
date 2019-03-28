import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageChangeAnimationComponent } from './page-change-animation.component';

describe('PageChangeAnimationComponent', () => {
  let component: PageChangeAnimationComponent;
  let fixture: ComponentFixture<PageChangeAnimationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PageChangeAnimationComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageChangeAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
