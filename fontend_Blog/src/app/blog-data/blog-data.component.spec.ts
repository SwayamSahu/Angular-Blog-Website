import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogDataComponent } from './blog-data.component';

describe('BlogDataComponent', () => {
  let component: BlogDataComponent;
  let fixture: ComponentFixture<BlogDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlogDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
