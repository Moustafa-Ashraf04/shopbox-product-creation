import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-input-with-button',
  imports: [],
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
      <div class="flex gap-2">
        <input
          [id]="id()"
          [type]="type()"
          [placeholder]="placeholder()"
          [value]="value()"
          class="border-border-primary bg-surface-primary text-primary shadow-input focus:border-brand-primary w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none"
        />
        <button
          type="button"
          class="bg-surface-brand-secondary text-primary rounded-lg p-3.5 text-sm font-semibold whitespace-nowrap"
        >
          {{ buttonLabel() }}
        </button>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputWithButtonComponent {
  id = input.required<string>();
  label = input.required<string>();
  buttonLabel = input.required<string>();
  type = input<string>('text');
  placeholder = input<string>('');
  value = input<string>('');
  tooltip = input<boolean>(false);
  required = input<boolean>(false);
}
