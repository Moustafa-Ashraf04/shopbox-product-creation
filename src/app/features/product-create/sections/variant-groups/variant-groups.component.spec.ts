import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VariantGroupsComponent } from './variant-groups.component';

/**
 * Unit Tests for VariantGroupsComponent
 *
 * Run with: npm test
 */
describe('VariantGroupsComponent', () => {
  let component: VariantGroupsComponent;
  let fixture: ComponentFixture<VariantGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VariantGroupsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VariantGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // ===== BASIC TESTS =====

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start expanded', () => {
    expect(component.isExpanded()).toBe(true);
  });

  it('should have inventory on variants enabled', () => {
    expect(component.inventoryOnVariants()).toBe(true);
  });

  it('should have 2 variant groups', () => {
    expect(component.variantGroups().length).toBe(2);
  });

  // ===== TOGGLE TESTS =====

  it('should collapse section when toggled', () => {
    component.toggleSection();
    expect(component.isExpanded()).toBe(false);
  });

  it('should toggle inventory on variants', () => {
    component.toggleInventoryOnVariants();
    expect(component.inventoryOnVariants()).toBe(false);
  });

  // ===== ADD VARIANT GROUP =====

  it('should add a new variant group', () => {
    const countBefore = component.variantGroups().length;

    component.addVariantGroup();

    expect(component.variantGroups().length).toBe(countBefore + 1);
  });

  it('new group should be expanded', () => {
    component.addVariantGroup();

    const newGroup =
      component.variantGroups()[component.variantGroups().length - 1];
    expect(newGroup.expanded).toBe(true);
  });

  // ===== TOGGLE VARIANT GROUP =====

  it('should toggle variant group expansion', () => {
    // First group starts expanded
    expect(component.variantGroups()[0].expanded).toBe(true);

    component.toggleVariantGroup('group-1');

    expect(component.variantGroups()[0].expanded).toBe(false);
  });

  // ===== VARIANT TESTS =====

  it('should toggle variant expansion', () => {
    // First variant starts collapsed
    const before = component.variantGroups()[0].variants[0].expanded;

    component.toggleVariant('group-1', 'variant-1-1');

    const after = component.variantGroups()[0].variants[0].expanded;
    expect(after).toBe(!before);
  });

  it('should toggle variant enabled/disabled', () => {
    const before = component.variantGroups()[0].variants[0].enabled;

    component.toggleVariantEnabled('group-1', 'variant-1-1');

    const after = component.variantGroups()[0].variants[0].enabled;
    expect(after).toBe(!before);
  });

  it('should remove a variant', () => {
    const countBefore = component.variantGroups()[0].variants.length;

    component.removeVariant('group-1', 'variant-1-1');

    expect(component.variantGroups()[0].variants.length).toBe(countBefore - 1);
  });

  // ===== PRICE TOGGLES =====

  it('should toggle unique price', () => {
    const before = component.variantGroups()[0].variants[0].addUniquePrice;

    component.toggleAddUniquePrice('group-1', 'variant-1-1');

    const after = component.variantGroups()[0].variants[0].addUniquePrice;
    expect(after).toBe(!before);
  });

  it('should toggle custom price', () => {
    const before = component.variantGroups()[0].variants[0].customPrice;

    component.toggleCustomPrice('group-1', 'variant-1-1');

    const after = component.variantGroups()[0].variants[0].customPrice;
    expect(after).toBe(!before);
  });
});
