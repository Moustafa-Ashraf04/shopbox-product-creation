import { Component } from '@angular/core';
import { ProductCreateComponent } from './features/product-create/product-create.component';
import { HeaderComponent } from './layout/header/header.component';

@Component({
  selector: 'app-root',
  imports: [ProductCreateComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
