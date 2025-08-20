import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatinumPalcoComponent } from './platinum-palco.component';

describe('PlatinumPalcoComponent', () => {
  let component: PlatinumPalcoComponent;
  let fixture: ComponentFixture<PlatinumPalcoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlatinumPalcoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlatinumPalcoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
