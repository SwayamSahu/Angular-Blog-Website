import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewBlogComponent } from './add-new-blog.component';

describe('AddNewBlogComponent', () => {
  let component: AddNewBlogComponent;
  let fixture: ComponentFixture<AddNewBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewBlogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddNewBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
