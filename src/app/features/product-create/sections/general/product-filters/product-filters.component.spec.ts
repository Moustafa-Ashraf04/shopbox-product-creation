import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductFiltersComponent } from './product-filters.component';

describe('ProductFiltersComponent', () => {
  let component: ProductFiltersComponent;
  let fixture: ComponentFixture<ProductFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductFiltersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductFiltersComponent);
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

  it('should have 5 filters', () => {
    expect(component.productFilters().length).toBe(5);
  });

  it('should toggle a filter enabled state', () => {
    const before = component.productFilters()[0].enabled;
    component.toggleFilter('filter-1');
    const after = component.productFilters()[0].enabled;
    expect(after).toBe(!before);
  });

  it('should toggle filter favorite', () => {
    const before = component.productFilters()[0].favorite;
    component.toggleFavorite('filter-1');
    const after = component.productFilters()[0].favorite;
    expect(after).toBe(!before);
  });

  it('should enable all filters when toggle all is clicked', () => {
    component.toggleEnableAllFilters();
    const allEnabled = component.productFilters().every((f) => f.enabled);
    expect(allEnabled).toBe(true);
  });
});
