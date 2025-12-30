import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SidebarComponent } from './sections/sidebar/sidebar.component';
import { GeneralComponent } from './sections/general/general.component';
import { VariantGroupsComponent } from './sections/variant-groups/variant-groups.component';
import { InventoryComponent } from './sections/inventory/inventory.component';
import { ModifiersComponent } from './sections/modifiers/modifiers.component';

import type { VariantGroup } from './sections/variant-groups/variant-groups.component';
import type { ModifierCategory } from './sections/modifiers/modifiers.component';

export interface ProductFormValue {
  general: {
    productName: string;
    cashRegisterOption: string;
    officialName: string;
    printerName: string;
    productDescription: string;
    category: string;
    price: number | null;
    takeAwayPrice: number | null;
    purchasePrice: number | null;
    unit: string;
    unitEnabled: boolean;
    taxGroupDineIn: string;
    taxGroupToGo: string;
    skuCode: string;
    barCode: string;
    priceSettings: {
      customPrice: boolean;
      quantityPrices: boolean;
      closedForDiscount: boolean;
      externalReferenceField: boolean;
      requireExternalReferenceField: boolean;
    };
    tags: string[];
    filters: string[];
  };
  variantGroups: {
    inventoryOnVariants: boolean;
    groups: VariantGroup[];
  };
  inventory: {
    enabled: boolean;
    branches: {
      id: string;
      name: string;
      stockItems: {
        id: string;
        variantName: string;
        quantity: number;
        minimumStockWarning: number;
        warningEnabled: boolean;
      }[];
    }[];
  };
  modifiers: {
    categories: ModifierCategory[];
  };
}

@Component({
  selector: 'app-product-create',
  imports: [
    ReactiveFormsModule,
    SidebarComponent,
    GeneralComponent,
    VariantGroupsComponent,
    InventoryComponent,
    ModifiersComponent,
  ],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCreateComponent {
  @ViewChild(VariantGroupsComponent)
  variantGroupsComponent?: VariantGroupsComponent;

  @ViewChild(ModifiersComponent)
  modifiersComponent?: ModifiersComponent;

  private readonly _submitted = signal(false);
  readonly submitted = this._submitted.asReadonly();

  readonly form = new FormGroup({
    general: new FormGroup({
      productName: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(2)],
      }),
      cashRegisterOption: new FormControl('same', { nonNullable: true }),
      officialName: new FormControl('', { nonNullable: true }),
      printerName: new FormControl('', { nonNullable: true }),
      productDescription: new FormControl('', { nonNullable: true }),
      category: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      price: new FormControl<number | null>(null, {
        validators: [Validators.required, Validators.min(0)],
      }),
      takeAwayPrice: new FormControl<number | null>(null, {
        validators: [Validators.min(0)],
      }),
      purchasePrice: new FormControl<number | null>(null, {
        validators: [Validators.min(0)],
      }),
      unit: new FormControl('', { nonNullable: true }),
      unitEnabled: new FormControl(false, { nonNullable: true }),
      taxGroupDineIn: new FormControl('25', { nonNullable: true }),
      taxGroupToGo: new FormControl('15', { nonNullable: true }),
      skuCode: new FormControl('', { nonNullable: true }),
      barCode: new FormControl('', { nonNullable: true }),
      priceSettings: new FormGroup({
        customPrice: new FormControl(false, { nonNullable: true }),
        quantityPrices: new FormControl(false, { nonNullable: true }),
        closedForDiscount: new FormControl(false, { nonNullable: true }),
        externalReferenceField: new FormControl(false, { nonNullable: true }),
        requireExternalReferenceField: new FormControl(false, {
          nonNullable: true,
        }),
      }),
      tags: new FormControl<string[]>([], { nonNullable: true }),
      filters: new FormControl<string[]>([], { nonNullable: true }),
    }),
    inventory: new FormGroup({
      enabled: new FormControl(false, { nonNullable: true }),
      branches: new FormArray<FormGroup>([]),
    }),
  });

  readonly generalForm = this.form.controls.general;
  readonly inventoryForm = this.form.controls.inventory;

  readonly isValid = computed(() => this.form.valid);
  readonly isInvalid = computed(() => this.form.invalid && this._submitted());

  get branchesArray(): FormArray {
    return this.inventoryForm.controls.branches;
  }

  addBranch(branch: {
    id: string;
    name: string;
    stockItems: {
      id: string;
      variantName: string;
      quantity: number;
      minimumStockWarning: number;
      warningEnabled: boolean;
    }[];
  }): void {
    const branchGroup = new FormGroup({
      id: new FormControl(branch.id, { nonNullable: true }),
      name: new FormControl(branch.name, { nonNullable: true }),
      stockItems: new FormArray(
        branch.stockItems.map(
          (item) =>
            new FormGroup({
              id: new FormControl(item.id, { nonNullable: true }),
              variantName: new FormControl(item.variantName, {
                nonNullable: true,
              }),
              quantity: new FormControl(item.quantity, {
                nonNullable: true,
                validators: [Validators.min(0)],
              }),
              minimumStockWarning: new FormControl(item.minimumStockWarning, {
                nonNullable: true,
                validators: [Validators.min(0)],
              }),
              warningEnabled: new FormControl(item.warningEnabled, {
                nonNullable: true,
              }),
            }),
        ),
      ),
    });
    this.branchesArray.push(branchGroup);
  }

  getFieldError(controlPath: string): string | null {
    const control = this.form.get(controlPath);
    if (!control || !this._submitted() || control.valid) {
      return null;
    }

    if (control.hasError('required')) {
      return 'This field is required';
    }
    if (control.hasError('minlength')) {
      const error = control.getError('minlength');
      return `Minimum ${error.requiredLength} characters required`;
    }
    if (control.hasError('min')) {
      const error = control.getError('min');
      return `Value must be at least ${error.min}`;
    }
    return 'Invalid value';
  }

  isFieldInvalid(controlPath: string): boolean {
    const control = this.form.get(controlPath);
    return !!control && control.invalid && this._submitted();
  }

  private markAsSubmitted(): void {
    this._submitted.set(true);
    this.form.markAllAsTouched();
  }

  reset(): void {
    this._submitted.set(false);
    this.form.reset();
  }

  private getFormValue(): ProductFormValue {
    const formValue = this.form.getRawValue();
    return {
      ...formValue,
      variantGroups: this.variantGroupsComponent
        ? this.variantGroupsComponent.getVariantGroupsData()
        : { inventoryOnVariants: false, groups: [] },
      modifiers: this.modifiersComponent
        ? this.modifiersComponent.getModifiersData()
        : { categories: [] },
    } as ProductFormValue;
  }

  private logInvalidControls(group: FormGroup | FormArray, path = ''): void {
    Object.keys(group.controls).forEach((key) => {
      const control = group.get(key) as AbstractControl;
      const currentPath = path ? `${path}.${key}` : key;

      if (control instanceof FormGroup || control instanceof FormArray) {
        this.logInvalidControls(control, currentPath);
      } else if (control.invalid) {
        console.error(`Invalid control: ${currentPath}`, control.errors);
      }
    });
  }

  onCreateProduct(): void {
    this.markAsSubmitted();

    if (this.form.invalid) {
      console.error('Form is invalid', this.form.errors);
      this.logInvalidControls(this.form);
      // Scroll to first error
      const firstErrorElement = document.querySelector('.border-red-500');
      firstErrorElement?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      return;
    }

    const productData = this.getFormValue();
    console.log('Product created successfully:', productData);
    // Here you would typically call an API service to save the product
    alert('Product created successfully!');
  }
}
