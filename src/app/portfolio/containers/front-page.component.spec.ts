import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontPageComponent } from './front-page.component';
import { Store, StoreModule } from '@ngrx/store';

describe('FrontPageComponent', () => {
  let component: FrontPageComponent;
  let fixture: ComponentFixture<FrontPageComponent>;
  let store: Store<any>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [ StoreModule.forRoot({}) ],
      declarations: [ FrontPageComponent ]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontPageComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
