import { Component } from '@angular/core';
import { SidebarComponent } from './sections/sidebar/sidebar.component';
import { GeneralSectionComponent } from './sections/general-section/general-section.component';
@Component({
  selector: 'app-product-create',
  imports: [SidebarComponent, GeneralSectionComponent],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css',
})
export class ProductCreateComponent {}
