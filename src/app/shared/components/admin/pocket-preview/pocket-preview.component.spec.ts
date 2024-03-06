import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PocketPreviewComponent } from './pocket-preview.component';

describe('PocketPreviewComponent', () => {
  let component: PocketPreviewComponent;
  let fixture: ComponentFixture<PocketPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PocketPreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PocketPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
