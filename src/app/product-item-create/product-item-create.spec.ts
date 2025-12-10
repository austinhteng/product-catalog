import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductItemCreate } from './product-item-create';

describe('ProductItemCreate', () => {
  let component: ProductItemCreate;
  let fixture: ComponentFixture<ProductItemCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductItemCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductItemCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
