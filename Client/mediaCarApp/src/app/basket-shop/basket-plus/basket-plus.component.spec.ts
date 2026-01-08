import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketPlusComponent } from './basket-plus.component';

describe('BasketPlusComponent', () => {
  let component: BasketPlusComponent;
  let fixture: ComponentFixture<BasketPlusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasketPlusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasketPlusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
