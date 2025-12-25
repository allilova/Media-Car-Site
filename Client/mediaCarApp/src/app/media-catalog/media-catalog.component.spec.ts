import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaCatalogComponent } from './media-catalog.component';

describe('MediaCatalogComponent', () => {
  let component: MediaCatalogComponent;
  let fixture: ComponentFixture<MediaCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaCatalogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
