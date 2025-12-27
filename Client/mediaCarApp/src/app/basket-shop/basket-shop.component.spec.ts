import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketShopComponent } from './basket-shop.component';

describe('BasketShopComponent', () => {
  let component: BasketShopComponent;
  let fixture: ComponentFixture<BasketShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasketShopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasketShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
