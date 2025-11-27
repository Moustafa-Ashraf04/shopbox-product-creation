import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductTagsComponent } from './product-tags.component';

describe('ProductTagsComponent', () => {
  let component: ProductTagsComponent;
  let fixture: ComponentFixture<ProductTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductTagsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductTagsComponent);
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

  it('should have 5 tag groups', () => {
    expect(component.tagGroups().length).toBe(5);
  });

  it('should add a new tag group', () => {
    const before = component.tagGroups().length;
    component.addTagGroup();
    expect(component.tagGroups().length).toBe(before + 1);
  });

  it('should remove a tag group', () => {
    const before = component.tagGroups().length;
    component.removeTagGroup('group-1');
    expect(component.tagGroups().length).toBe(before - 1);
  });

  it('should toggle tag group expansion', () => {
    const before = component.tagGroups()[0].expanded;
    component.toggleTagGroup('group-1');
    const after = component.tagGroups()[0].expanded;
    expect(after).toBe(!before);
  });

  it('should toggle tag selection', () => {
    const before = component.tagGroups()[0].tags[0].selected;
    component.toggleTag('group-1', 'tag-1-1');
    const after = component.tagGroups()[0].tags[0].selected;
    expect(after).toBe(!before);
  });
});
