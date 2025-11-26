import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

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
  imports: [],
  templateUrl: './inventory.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InventoryComponent {
  isExpanded = signal(true);
  enableInventory = signal(true);

  toggleSection() {
    this.isExpanded.update((v) => !v);
  }

  branches = signal<Branch[]>([
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
  ]);

  toggleEnableInventory() {
    this.enableInventory.update((v) => !v);
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
  }
}
