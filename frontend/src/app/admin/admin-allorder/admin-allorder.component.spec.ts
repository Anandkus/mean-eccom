import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAllorderComponent } from './admin-allorder.component';

describe('AdminAllorderComponent', () => {
  let component: AdminAllorderComponent;
  let fixture: ComponentFixture<AdminAllorderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAllorderComponent]
    });
    fixture = TestBed.createComponent(AdminAllorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
