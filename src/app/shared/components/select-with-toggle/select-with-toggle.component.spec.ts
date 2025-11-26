import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectWithToggleComponent } from './select-with-toggle.component';

describe('SelectWithToggleComponent', () => {
  let component: SelectWithToggleComponent;
  let fixture: ComponentFixture<SelectWithToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectWithToggleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectWithToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
