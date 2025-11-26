import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-textarea',
  imports: [],
  template: `
    <div class="flex flex-col gap-1">
      <label [for]="id()" class="text-primary text-xs font-semibold">
        {{ label() }}
      </label>
      <textarea
        [id]="id()"
        [placeholder]="placeholder()"
        [rows]="rows()"
        [value]="value()"
        class="border-border-primary bg-surface-primary text-primary placeholder:text-secondary focus:border-brand-primary w-full resize-none rounded-lg border px-3 py-4 text-sm focus:outline-none"
      ></textarea>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaComponent {
  id = input.required<string>();
  label = input.required<string>();
  placeholder = input<string>('');
  value = input<string>('');
  rows = input<number>(4);
}
