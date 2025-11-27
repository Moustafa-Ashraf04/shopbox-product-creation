import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InventoryComponent } from './inventory.component';

describe('InventoryComponent', () => {
  let component: InventoryComponent;
  let fixture: ComponentFixture<InventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InventoryComponent);
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

  it('should have inventory enabled by default', () => {
    expect(component.enableInventory()).toBe(true);
  });

  it('should have 2 branches', () => {
    expect(component.branches().length).toBe(2);
  });

  // ===== TOGGLE TESTS =====

  it('should collapse section when toggled', () => {
    component.toggleSection();
    expect(component.isExpanded()).toBe(false);
  });

  it('should disable inventory when toggled', () => {
    component.toggleEnableInventory();
    expect(component.enableInventory()).toBe(false);
  });

  // ===== QUANTITY TESTS =====

  it('should increment quantity', () => {
    // Get initial quantity (should be 2)
    const before = component.branches()[0].stockItems[0].quantity;

    // Increment
    component.incrementQuantity('branch-1', 'stock-1-1');

    // Check it increased by 1
    const after = component.branches()[0].stockItems[0].quantity;
    expect(after).toBe(before + 1);
  });

  it('should decrement quantity', () => {
    const before = component.branches()[0].stockItems[0].quantity;

    component.decrementQuantity('branch-1', 'stock-1-1');

    const after = component.branches()[0].stockItems[0].quantity;
    expect(after).toBe(before - 1);
  });

  it('should not go below 0 when decrementing', () => {
    // Decrement many times
    for (let i = 0; i < 10; i++) {
      component.decrementQuantity('branch-1', 'stock-1-1');
    }

    // Should stop at 0, not go negative
    const quantity = component.branches()[0].stockItems[0].quantity;
    expect(quantity).toBe(0);
  });

  // ===== WARNING TOGGLE TEST =====

  it('should toggle warning enabled', () => {
    const before = component.branches()[0].stockItems[0].warningEnabled;

    component.toggleWarningEnabled('branch-1', 'stock-1-1');

    const after = component.branches()[0].stockItems[0].warningEnabled;
    expect(after).toBe(!before);
  });
});
