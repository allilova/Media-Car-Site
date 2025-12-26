import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessoriesCatalogComponent } from './accessories-catalog.component';

describe('AccessoriesCatalogComponent', () => {
  let component: AccessoriesCatalogComponent;
  let fixture: ComponentFixture<AccessoriesCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessoriesCatalogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessoriesCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
