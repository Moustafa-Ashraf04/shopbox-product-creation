import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TextInputComponent } from '../../../../shared/components/text-input/text-input.component';
import { TextareaComponent } from '../../../../shared/components/textarea/textarea.component';
import { SelectComponent } from '../../../../shared/components/select/select.component';
import { RadioGroupComponent } from '../../../../shared/components/radio-group/radio-group.component';
import { SelectWithToggleComponent } from '../../../../shared/components/select-with-toggle/select-with-toggle.component';
import { InputWithButtonComponent } from '../../../../shared/components/input-with-button/input-with-button.component';
import { CheckboxComponent } from '../../../../shared/components/checkbox/checkbox.component';
import { ProductTagsComponent } from './product-tags/product-tags.component';
import { ProductFiltersComponent } from './product-filters/product-filters.component';

@Component({
  selector: 'app-general',
  imports: [
    TextInputComponent,
    TextareaComponent,
    SelectComponent,
    RadioGroupComponent,
    SelectWithToggleComponent,
    InputWithButtonComponent,
    CheckboxComponent,
    ProductTagsComponent,
    ProductFiltersComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './general.component.html',
})
export class GeneralComponent {
  cashRegisterOptions = [
    {
      value: 'same',
      label: 'Use Product name as Official name and Printer name',
    },
    { value: 'different', label: 'Use different names', tooltip: true },
  ];

  categoryOptions = [
    { value: 'cake', label: 'Cake' },
    { value: 'pastry', label: 'Pastry' },
    { value: 'bread', label: 'Bread' },
    { value: 'beverage', label: 'Beverage' },
  ];

  unitOptions = [
    { value: '', label: '' },
    { value: 'piece', label: 'Piece' },
    { value: 'kg', label: 'Kilogram' },
    { value: 'liter', label: 'Liter' },
  ];

  taxGroupOptions = [
    { value: '25', label: '25%' },
    { value: '12', label: '12%' },
    { value: '6', label: '6%' },
    { value: '0', label: '0%' },
  ];

  taxGroupToGoOptions = [
    { value: '15', label: '15%' },
    { value: '12', label: '12%' },
    { value: '6', label: '6%' },
    { value: '0', label: '0%' },
  ];
}
