import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryControlsComponent } from './gallery-controls.component';

describe('GalleryControlsComponent', () => {
  let component: GalleryControlsComponent;
  let fixture: ComponentFixture<GalleryControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GalleryControlsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
