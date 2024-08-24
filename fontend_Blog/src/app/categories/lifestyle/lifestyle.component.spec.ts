import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifestyleComponent } from './lifestyle.component';

describe('LifestyleComponent', () => {
  let component: LifestyleComponent;
  let fixture: ComponentFixture<LifestyleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LifestyleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LifestyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
