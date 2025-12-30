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
  selector: 'app-textarea',
  imports: [ReactiveFormsModule],
  template: `
    <div class="flex flex-col gap-1">
      <label [for]="id()" class="text-primary text-xs font-semibold">
        {{ label() }}
        @if (required()) {
          <span class="text-primary">*</span>
        }
      </label>
      <textarea
        [id]="id()"
        [placeholder]="placeholder()"
        [rows]="rows()"
        [value]="value()"
        [disabled]="isDisabled()"
        (input)="onInput($event)"
        (blur)="onTouched()"
        class="border-border-primary bg-surface-primary text-primary placeholder:text-secondary focus:border-brand-primary w-full resize-none rounded-lg border px-3 py-4 text-sm focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        [class.border-red-500]="error()"
        [class.focus:border-red-500]="error()"
      ></textarea>
      @if (error()) {
        <span class="text-xs text-red-500">{{ error() }}</span>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true,
    },
  ],
})
export class TextareaComponent implements ControlValueAccessor {
  id = input.required<string>();
  label = input.required<string>();
  placeholder = input<string>('');
  rows = input<number>(4);
  required = input<boolean>(false);
  error = input<string>('');

  value = signal<string>('');
  isDisabled = signal(false);

  private onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: string | null): void {
    this.value.set(value ?? '');
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
    const textarea = event.target as HTMLTextAreaElement;
    this.value.set(textarea.value);
    this.onChange(textarea.value);
  }
}
