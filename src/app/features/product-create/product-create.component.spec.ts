import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCreateComponent } from './product-create.component';

describe('ProductCreateComponent', () => {
  let component: ProductCreateComponent;
  let fixture: ComponentFixture<ProductCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCreateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have onCreateProduct method', () => {
    expect(component.onCreateProduct).toBeDefined();
  });

  it('should call onCreateProduct without error', () => {
    expect(() => component.onCreateProduct()).not.toThrow();
  });
});
