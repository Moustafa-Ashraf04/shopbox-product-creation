import { Component } from '@angular/core';
import { SidebarComponent } from './sections/sidebar/sidebar.component';
import { GeneralComponent } from './sections/general/general.component';
import { VariantGroupsComponent } from './sections/variant-groups/variant-groups.component';
import { InventoryComponent } from './sections/inventory/inventory.component';
import { ModifiersComponent } from './sections/modifiers/modifiers.component';

@Component({
  selector: 'app-product-create',
  imports: [
    SidebarComponent,
    GeneralComponent,
    VariantGroupsComponent,
    InventoryComponent,
    ModifiersComponent,
  ],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css',
})
export class ProductCreateComponent {}
