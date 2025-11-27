import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputWithButtonComponent } from './input-with-button.component';

describe('InputWithButtonComponent', () => {
  let component: InputWithButtonComponent;
  let fixture: ComponentFixture<InputWithButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputWithButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputWithButtonComponent);
    component = fixture.componentInstance;

    // Set required inputs before detectChanges
    fixture.componentRef.setInput('id', 'test-input-button');
    fixture.componentRef.setInput('label', 'Test Label');
    fixture.componentRef.setInput('buttonLabel', 'Click Me');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
