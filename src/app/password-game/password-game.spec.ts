import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordGame } from './password-game';

describe('PasswordGame', () => {
  let component: PasswordGame;
  let fixture: ComponentFixture<PasswordGame>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordGame]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordGame);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
