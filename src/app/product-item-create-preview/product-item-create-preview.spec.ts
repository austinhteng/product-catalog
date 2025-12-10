import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductItemCreatePreview } from './product-item-create-preview';

describe('ProductItemCreatePreview', () => {
  let component: ProductItemCreatePreview;
  let fixture: ComponentFixture<ProductItemCreatePreview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductItemCreatePreview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductItemCreatePreview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
