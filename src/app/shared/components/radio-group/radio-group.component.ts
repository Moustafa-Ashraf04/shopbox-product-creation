import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-radio-group',
  imports: [],
  template: `
    <div class="flex flex-col gap-3">
      @for (option of options(); track option.value) {
        <label
          [for]="option.value"
          class="flex cursor-pointer items-center gap-3.5"
        >
          <input
            type="radio"
            [name]="name()"
            [id]="option.value"
            [value]="option.value"
            [checked]="option.value === selectedValue()"
            class="accent-brand-primary h-5 w-5 cursor-pointer"
          />
          <span class="text-primary flex items-center gap-2 text-sm">
            {{ option.label }}
          </span>
          @if (option.tooltip) {
            <button
              type="button"
              class="cursor-help"
              (click)="$event.preventDefault(); $event.stopPropagation()"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.25 11V7.25H6.5M7.25 14C3.52175 14 0.5 10.9783 0.5 7.25C0.5 3.52175 3.52175 0.5 7.25 0.5C10.9783 0.5 14 3.52175 14 7.25C14 10.9783 10.9783 14 7.25 14ZM7.06175 4.25C6.95825 4.25 6.87425 4.334 6.875 4.4375C6.875 4.541 6.959 4.625 7.0625 4.625C7.166 4.625 7.25 4.541 7.25 4.4375C7.25 4.334 7.166 4.25 7.06175 4.25Z"
                  stroke="#101828"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          }
        </label>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioGroupComponent {
  name = input<string>('radio-group');
  options = input<{ value: string; label: string; tooltip?: boolean }[]>([]);
  selectedValue = input<string>('');
}
