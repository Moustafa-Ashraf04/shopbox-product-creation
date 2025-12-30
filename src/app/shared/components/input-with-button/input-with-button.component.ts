import {
  ChangeDetectionStrategy,
  Component,
  effect,
  forwardRef,
  input,
  output,
  signal,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-input-with-button',
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
      <div class="flex flex-col gap-2 sm:flex-row">
        <input
          [id]="id()"
          [type]="type()"
          [placeholder]="placeholder()"
          [value]="internalValue()"
          [disabled]="isDisabled()"
          (input)="onInput($event)"
          (blur)="onTouched()"
          class="border-border-primary bg-surface-primary text-primary shadow-input focus:border-brand-primary w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          [class.border-red-500]="error()"
          [class.focus:border-red-500]="error()"
        />
        <button
          type="button"
          class="bg-surface-brand-secondary text-primary cursor-pointer rounded-lg p-3.5 text-sm font-semibold whitespace-nowrap"
          (click)="onButtonClick()"
        >
          {{ buttonLabel() }}
        </button>
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
      useExisting: forwardRef(() => InputWithButtonComponent),
      multi: true,
    },
  ],
})
export class InputWithButtonComponent implements ControlValueAccessor {
  id = input.required<string>();
  label = input.required<string>();
  buttonLabel = input.required<string>();
  type = input<string>('text');
  placeholder = input<string>('');
  tooltip = input<boolean>(false);
  required = input<boolean>(false);
  error = input<string>('');
  /** For non-reactive form usage */
  value = input<string>('');

  buttonClick = output<void>();

  internalValue = signal<string>('');
  isDisabled = signal(false);

  private onChange: (value: string) => void = () => {};
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

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.internalValue.set(input.value);
    this.onChange(input.value);
  }

  onButtonClick(): void {
    this.buttonClick.emit();
  }
}
