import {
  ChangeDetectionStrategy,
  Component,
  effect,
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
  selector: 'app-text-input',
  imports: [ReactiveFormsModule],
  template: `
    <div class="flex flex-col gap-1">
      <div class="flex items-center gap-1">
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
      <div class="relative">
        <input
          [id]="id()"
          [type]="type()"
          [placeholder]="placeholder()"
          [value]="internalValue()"
          [disabled]="isDisabled()"
          (input)="onInput($event)"
          (blur)="onTouched()"
          class="border-border-primary shadow-input bg-surface-primary text-primary focus:border-brand-primary w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          [class.pr-17]="suffix()"
          [class.border-red-500]="error()"
          [class.focus:border-red-500]="error()"
        />
        @if (suffix()) {
          <span
            class="text-disabled pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-sm"
            >{{ suffix() }}</span
          >
        }
      </div>
      @if (error()) {
        <span class="text-xs text-red-500">{{ error() }}</span>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true,
    },
  ],
})
export class TextInputComponent implements ControlValueAccessor {
  id = input.required<string>();
  label = input.required<string>();
  type = input<string>('text');
  placeholder = input<string>('');
  required = input<boolean>(false);
  tooltip = input<boolean>(false);
  suffix = input<string>('');
  error = input<string>('');
  /** For non-reactive form usage */
  value = input<string>('');

  internalValue = signal<string>('');
  isDisabled = signal(false);

  private onChange: (value: string | number) => void = () => {};
  onTouched: () => void = () => {};

  constructor() {
    // Sync input value to internal signal when used without reactive forms
    effect(() => {
      const inputValue = this.value();
      if (inputValue) {
        this.internalValue.set(inputValue);
      }
    });
  }

  writeValue(value: string | number | null): void {
    this.internalValue.set(value?.toString() ?? '');
  }

  registerOnChange(fn: (value: string | number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const rawValue = input.value;
    this.internalValue.set(rawValue);

    // Convert to number for number inputs
    if (this.type() === 'number') {
      const numValue = rawValue === '' ? null : parseFloat(rawValue);
      this.onChange(numValue as unknown as number);
    } else {
      this.onChange(rawValue);
    }
  }
}
