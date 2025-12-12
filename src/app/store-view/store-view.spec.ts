import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreView } from './store-view';

describe('StoreView', () => {
  let component: StoreView;
  let fixture: ComponentFixture<StoreView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
