import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
  signal,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-select-with-toggle',
  imports: [ReactiveFormsModule],
  template: `
    <div class="flex flex-col gap-2">
      <div class="flex items-center gap-1.5">
        <label [for]="id()" class="text-primary text-xs font-semibold">
          {{ label() }}
          @if (required()) {
            <span class="text-primary">*</span>
          }
        </label>
        @if (tooltip()) {
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
      </div>
      <div class="flex items-center gap-3">
        <div class="relative flex-1">
          <select
            [id]="id()"
            [disabled]="!isEnabled() || isDisabled()"
            [value]="internalValue()"
            (change)="onSelect($event)"
            (blur)="onTouched()"
            class="border-border-primary bg-surface-primary text-primary shadow-input focus:border-brand-primary disabled:bg-surface-secondary disabled:text-disabled w-full cursor-pointer appearance-none rounded-lg border px-3.5 py-2.5 pr-10 text-sm focus:outline-none disabled:cursor-not-allowed"
          >
            @for (option of options(); track option.value) {
              <option [value]="option.value">{{ option.label }}</option>
            }
          </select>
          <svg
            class="text-secondary pointer-events-none absolute top-1/2 right-3.5 h-5 w-5 -translate-y-1/2 opacity-50"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.47695 6.49336L3.54023 6.56719L8.32148 12.0691C8.4832 12.2555 8.72578 12.3715 8.99648 12.3715C9.26719 12.3715 9.50977 12.252 9.67148 12.0691L14.4492 6.57773L14.5301 6.48633C14.5898 6.39844 14.625 6.29297 14.625 6.18047C14.625 5.87461 14.3648 5.625 14.0414 5.625H3.95859C3.63516 5.625 3.375 5.87461 3.375 6.18047C3.375 6.29648 3.41367 6.40547 3.47695 6.49336Z"
              fill="#667085"
            />
          </svg>
        </div>
        <button
          type="button"
          (click)="toggleEnabled()"
          [class]="
            isEnabled()
              ? 'bg-brand-primary relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors'
              : 'bg-border-primary relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors'
          "
        >
          <span
            [class]="
              isEnabled()
                ? 'pointer-events-none mt-0.5 inline-block h-5 w-5 translate-x-5 transform rounded-full bg-white shadow ring-0 transition-transform'
                : 'pointer-events-none mt-0.5 inline-block h-5 w-5 translate-x-0.5 transform rounded-full bg-white shadow ring-0 transition-transform'
            "
          ></span>
        </button>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectWithToggleComponent),
      multi: true,
    },
  ],
})
export class SelectWithToggleComponent implements ControlValueAccessor {
  id = input.required<string>();
  label = input.required<string>();
  options = input<{ value: string; label: string }[]>([]);
  tooltip = input<boolean>(false);
  required = input<boolean>(false);
  /** For non-reactive form usage: initial enabled state */
  enabled = input<boolean>(false);

  internalValue = signal<string>('');
  isEnabled = signal(false);
  isDisabled = signal(false);

  private onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  constructor() {
    // Initialize from input
    this.isEnabled.set(this.enabled());
  }

  writeValue(value: string | null): void {
    this.internalValue.set(value ?? '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  onSelect(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.internalValue.set(select.value);
    this.onChange(select.value);
  }

  toggleEnabled(): void {
    this.isEnabled.update((v) => !v);
  }
}
