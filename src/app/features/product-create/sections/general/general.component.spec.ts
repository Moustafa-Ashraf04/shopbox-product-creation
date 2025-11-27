import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeneralComponent } from './general.component';

describe('GeneralComponent', () => {
  let component: GeneralComponent;
  let fixture: ComponentFixture<GeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start expanded', () => {
    expect(component.isExpanded()).toBe(true);
  });

  it('should collapse when toggled', () => {
    component.toggleSection();
    expect(component.isExpanded()).toBe(false);
  });

  it('should have category options', () => {
    expect(component.categoryOptions.length).toBeGreaterThan(0);
  });

  it('should have tax group options', () => {
    expect(component.taxGroupOptions.length).toBeGreaterThan(0);
  });
});
