import {
  ChangeDetectionStrategy,
  Component,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';

interface StockItem {
  id: string;
  variantName: string;
  quantity: number;
  minimumStockWarning: number;
  warningEnabled: boolean;
}

interface Branch {
  id: string;
  name: string;
  stockItems: StockItem[];
}

@Component({
  selector: 'app-inventory',
  imports: [ReactiveFormsModule],
  templateUrl: './inventory.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InventoryComponent implements OnInit {
  formGroup = input.required<FormGroup>();
  addBranch = input.required<(branch: Branch) => void>();
  branchesArray = input.required<FormArray>();

  isExpanded = signal(true);

  toggleSection() {
    this.isExpanded.update((v) => !v);
  }

  // Default branches data
  private readonly defaultBranches: Branch[] = [
    {
      id: 'branch-1',
      name: 'Greenwood Odense',
      stockItems: [
        {
          id: 'stock-1-1',
          variantName: 'Small / Red',
          quantity: 2,
          minimumStockWarning: 1,
          warningEnabled: true,
        },
        {
          id: 'stock-1-2',
          variantName: 'Small / Black',
          quantity: 5,
          minimumStockWarning: 2,
          warningEnabled: true,
        },
      ],
    },
    {
      id: 'branch-2',
      name: 'Greenwood Cph',
      stockItems: [
        {
          id: 'stock-2-1',
          variantName: 'Small / Red',
          quantity: 3,
          minimumStockWarning: 0,
          warningEnabled: false,
        },
        {
          id: 'stock-2-2',
          variantName: 'Small / Black',
          quantity: 4,
          minimumStockWarning: 0,
          warningEnabled: true,
        },
      ],
    },
  ];

  branches = signal<Branch[]>(this.defaultBranches);

  ngOnInit(): void {
    // Initialize form branches
    this.defaultBranches.forEach((branch) => {
      this.addBranch()(branch);
    });
  }

  get enableInventory(): boolean {
    return this.formGroup().get('enabled')?.value ?? false;
  }

  toggleEnableInventory() {
    const currentValue = this.enableInventory;
    this.formGroup().get('enabled')?.setValue(!currentValue);
  }

  incrementQuantity(branchId: string, stockId: string) {
    this.branches.update((branches) =>
      branches.map((branch) =>
        branch.id === branchId
          ? {
              ...branch,
              stockItems: branch.stockItems.map((item) =>
                item.id === stockId
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
            }
          : branch,
      ),
    );
    this.updateFormBranchStock(branchId, stockId, 'quantity', 1, true);
  }

  decrementQuantity(branchId: string, stockId: string) {
    this.branches.update((branches) =>
      branches.map((branch) =>
        branch.id === branchId
          ? {
              ...branch,
              stockItems: branch.stockItems.map((item) =>
                item.id === stockId
                  ? { ...item, quantity: Math.max(0, item.quantity - 1) }
                  : item,
              ),
            }
          : branch,
      ),
    );
    this.updateFormBranchStock(branchId, stockId, 'quantity', -1, true);
  }

  updateQuantity(branchId: string, stockId: string, event: Event) {
    const input = event.target as HTMLInputElement;
    const value = parseInt(input.value, 10) || 0;
    this.branches.update((branches) =>
      branches.map((branch) =>
        branch.id === branchId
          ? {
              ...branch,
              stockItems: branch.stockItems.map((item) =>
                item.id === stockId
                  ? { ...item, quantity: Math.max(0, value) }
                  : item,
              ),
            }
          : branch,
      ),
    );
    this.updateFormBranchStock(branchId, stockId, 'quantity', value, false);
  }

  updateMinimumStockWarning(branchId: string, stockId: string, event: Event) {
    const input = event.target as HTMLInputElement;
    const value = parseInt(input.value, 10) || 0;
    this.branches.update((branches) =>
      branches.map((branch) =>
        branch.id === branchId
          ? {
              ...branch,
              stockItems: branch.stockItems.map((item) =>
                item.id === stockId
                  ? { ...item, minimumStockWarning: Math.max(0, value) }
                  : item,
              ),
            }
          : branch,
      ),
    );
    this.updateFormBranchStock(
      branchId,
      stockId,
      'minimumStockWarning',
      value,
      false,
    );
  }

  toggleWarningEnabled(branchId: string, stockId: string) {
    this.branches.update((branches) =>
      branches.map((branch) =>
        branch.id === branchId
          ? {
              ...branch,
              stockItems: branch.stockItems.map((item) =>
                item.id === stockId
                  ? { ...item, warningEnabled: !item.warningEnabled }
                  : item,
              ),
            }
          : branch,
      ),
    );

    // Find current value and toggle it
    const branch = this.branches().find((b) => b.id === branchId);
    const stock = branch?.stockItems.find((s) => s.id === stockId);
    if (stock) {
      this.updateFormBranchStock(
        branchId,
        stockId,
        'warningEnabled',
        stock.warningEnabled,
        false,
      );
    }
  }

  private updateFormBranchStock(
    branchId: string,
    stockId: string,
    field: string,
    value: number | boolean,
    isIncrement: boolean,
  ) {
    const branchesArray = this.branchesArray();
    const branchIndex = this.defaultBranches.findIndex(
      (b) => b.id === branchId,
    );
    if (branchIndex === -1) return;

    const branchGroup = branchesArray.at(branchIndex) as FormGroup;
    if (!branchGroup) return;

    const stockItemsFormArray = branchGroup.get('stockItems');
    if (!stockItemsFormArray) return;

    const stockIndex = this.defaultBranches[branchIndex].stockItems.findIndex(
      (s) => s.id === stockId,
    );
    if (stockIndex === -1) return;

    const stockControl = (stockItemsFormArray as FormArray).at(
      stockIndex,
    ) as FormGroup;
    if (!stockControl) return;

    const fieldControl = stockControl.get(field);
    if (fieldControl) {
      if (isIncrement && typeof value === 'number') {
        const currentValue = fieldControl.value || 0;
        fieldControl.setValue(Math.max(0, currentValue + value));
      } else {
        fieldControl.setValue(value);
      }
    }
  }
}
