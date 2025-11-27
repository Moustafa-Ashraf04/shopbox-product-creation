import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModifiersComponent } from './modifiers.component';

/**
 * Unit Tests for ModifiersComponent
 *
 * These tests verify that the component works correctly.
 * Run with: npm test
 */
describe('ModifiersComponent', () => {
  // These variables are used in every test
  let component: ModifiersComponent;
  let fixture: ComponentFixture<ModifiersComponent>;

  // This runs BEFORE each test - sets up a fresh component
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifiersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModifiersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // ===== BASIC TESTS =====

  it('should create', () => {
    // Simply checks if the component exists
    expect(component).toBeTruthy();
  });

  it('should start expanded', () => {
    // The section should be open by default
    expect(component.isExpanded()).toBe(true);
  });

  it('should start with no categories', () => {
    expect(component.categories().length).toBe(0);
  });

  // ===== TOGGLE TESTS =====

  it('should collapse when toggle is clicked', () => {
    // Start: expanded = true
    // After toggle: expanded = false
    component.toggleSection();
    expect(component.isExpanded()).toBe(false);
  });

  it('should expand when toggle is clicked again', () => {
    component.toggleSection(); // collapse
    component.toggleSection(); // expand
    expect(component.isExpanded()).toBe(true);
  });

  it('should toggle category expansion', () => {
    // Add a category first
    component.addModifierGroup();

    const before = component.categories().find((c) => c.id === 'mandatory');
    expect(before?.expanded).toBe(true);

    component.toggleCategory('mandatory');

    const after = component.categories().find((c) => c.id === 'mandatory');
    expect(after?.expanded).toBe(false);
  });

  // ===== MODIFIER OPTION TESTS =====

  it('should toggle modifier option selection', () => {
    component.addModifierGroup();
    component.toggleModifierOption('mandatory', 'mandatory-group-1', 'opt-1');

    const category = component.categories().find((c) => c.id === 'mandatory');
    const option = category?.groups[0]?.options[0];
    expect(option?.selected).toBe(true);
  });

  // ===== REMOVE TESTS =====

  it('should remove a modifier group', () => {
    component.addModifierGroup();
    const before = component.categories().find((c) => c.id === 'mandatory');
    const countBefore = before?.groups.length || 0;

    component.removeModifierGroup('mandatory', 'mandatory-group-1');

    const after = component.categories().find((c) => c.id === 'mandatory');
    expect(after?.groups.length).toBe(countBefore - 1);
  });

  it('should remove a standalone modifier', () => {
    component.addModifierGroup();
    const before = component.categories().find((c) => c.id === 'mandatory');
    const countBefore = before?.standaloneModifiers.length || 0;

    component.removeStandaloneModifier('mandatory', 'standalone-1');

    const after = component.categories().find((c) => c.id === 'mandatory');
    expect(after?.standaloneModifiers.length).toBe(countBefore - 1);
  });

  // ===== ADD MODIFIER GROUP TESTS =====

  it('should add predefined categories sequentially', () => {
    expect(component.categories().length).toBe(0);

    component.addModifierGroup();
    expect(component.categories().length).toBe(1);
    expect(component.categories()[0].id).toBe('mandatory');

    component.addModifierGroup();
    expect(component.categories().length).toBe(2);
    expect(component.categories()[1].id).toBe('addon');

    component.addModifierGroup();
    expect(component.categories().length).toBe(3);
    expect(component.categories()[2].id).toBe('optout');
  });

  it('should not add more than predefined categories', () => {
    component.addModifierGroup();
    component.addModifierGroup();
    component.addModifierGroup();
    component.addModifierGroup(); // Should do nothing

    expect(component.categories().length).toBe(3);
  });

  // ===== FORMAT PRICE TEST =====

  it('should format price correctly', () => {
    // 39.00 should become "39,00 kr"
    expect(component.formatPrice(39)).toBe('39,00 kr');
    expect(component.formatPrice(45.5)).toBe('45,50 kr');
    expect(component.formatPrice(0)).toBe('0,00 kr');
  });
});
