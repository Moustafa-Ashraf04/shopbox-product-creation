import { Component, signal } from '@angular/core';

interface ProductFilter {
  id: string;
  name: string;
  enabled: boolean;
  favorite: boolean;
  price: string;
}

@Component({
  selector: 'app-product-filters',
  imports: [],
  template: ` <!-- Product Filters -->
    <div
      class="border-border-secondary bg-surface-primary shadow-card rounded-lg border"
    >
      <div
        class="border-border-secondary flex flex-col gap-1.5 border-b px-4 py-3.5"
      >
        <div class="flex items-center justify-between gap-2">
          <h3 class="text-primary text-base font-semibold">Product filters</h3>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.3535 15.3535C12.1583 15.5488 11.8417 15.5488 11.6465 15.3535L5.64648 9.35352C5.45125 9.15828 5.45125 8.84172 5.64648 8.64648C5.84172 8.45125 6.15828 8.45125 6.35352 8.64648L12 14.293L17.6465 8.64648C17.8418 8.45125 18.1582 8.45125 18.3535 8.64648C18.5488 8.84172 18.5488 9.15828 18.3535 9.35352L12.3535 15.3535Z"
              fill="#101828"
              stroke="#101828"
            />
          </svg>
        </div>
        <p class="text-secondary text-sm">
          Enable or disable the filters where this product should appear. Set a
          custom price in each selected filter if needed.
        </p>
      </div>

      <!-- Filters List -->
      <div class="flex flex-col gap-5 px-4 py-6">
        <!-- Enable All Toggle -->
        <div class="flex items-center gap-3">
          <button
            type="button"
            (click)="toggleEnableAllFilters()"
            class="border-border-primary relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full border-2 bg-white p-0.5 transition-colors duration-200 ease-in-out focus:outline-none"
            role="switch"
            [attr.aria-checked]="enableAllFilters()"
          >
            <span
              aria-hidden="true"
              class="pointer-events-none inline-block h-5 w-5 transform rounded-full shadow-sm transition duration-200 ease-in-out"
              [class.translate-x-5]="enableAllFilters()"
              [class.translate-x-0]="!enableAllFilters()"
              [class.bg-brand-primary]="enableAllFilters()"
              [class.bg-neutral-secondary]="!enableAllFilters()"
            ></span>
          </button>
          <span class="text-primary text-sm"
            >Enable product on all filters</span
          >
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
        </div>
        <div class="flex flex-col gap-3.5">
          @for (filter of productFilters(); track filter.id) {
            <div
              class="bg-surface-secondary flex flex-col gap-5 rounded-lg p-4"
            >
              <!-- Filter Header -->
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3.5">
                  <button
                    type="button"
                    (click)="toggleFilter(filter.id)"
                    class="border-border-primary relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full border-2 bg-white p-0.5 transition-colors duration-200 ease-in-out focus:outline-none"
                    role="switch"
                    [attr.aria-checked]="filter.enabled"
                  >
                    <span
                      aria-hidden="true"
                      class="pointer-events-none inline-block h-5 w-5 transform rounded-full shadow-sm transition duration-200 ease-in-out"
                      [class.translate-x-5]="filter.enabled"
                      [class.translate-x-0]="!filter.enabled"
                      [class.bg-brand-primary]="filter.enabled"
                      [class.bg-neutral-secondary]="!filter.enabled"
                    ></span>
                  </button>
                  <span class="text-primary text-base font-semibold">
                    {{ '{' }}Filter name{{ '}' }}
                  </span>
                </div>
                <button
                  type="button"
                  class="flex cursor-pointer items-center gap-1 text-sm"
                  (click)="toggleFavorite(filter.id)"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.999 17.7682L16.01 19.8762C16.791 20.2862 17.703 19.6232 17.554 18.7542L16.788 14.2882L20.034 11.1272C20.666 10.5112 20.318 9.43823 19.444 9.31123L14.96 8.65923L12.955 4.59423C12.565 3.80323 11.436 3.80323 11.046 4.59423L9.04 8.65923L4.556 9.31123C3.683 9.43823 3.334 10.5112 3.966 11.1272L7.212 14.2882L6.446 18.7542C6.297 19.6232 7.209 20.2872 7.99 19.8762L12.001 17.7682H11.999Z"
                      [attr.fill]="
                        filter.favorite
                          ? 'var(--color-brand-primary)'
                          : 'var(--color-surface-primary)'
                      "
                      [attr.stroke]="
                        filter.favorite
                          ? 'var(--color-brand-primary)'
                          : 'var(--color-primary)'
                      "
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span class="text-primary"> Set as favorite </span>
                </button>
              </div>

              <!-- Price Input (shown when enabled) -->
              @if (filter.enabled) {
                <div class="flex flex-col gap-1">
                  <label class="text-primary text-xs font-semibold"
                    >Price</label
                  >
                  <div class="relative">
                    <input
                      type="number"
                      [value]="filter.price"
                      class="shadow-input border-border-primary bg-surface-primary text-primary focus:border-brand-primary w-full rounded-lg border px-3 py-2.5 pr-10 text-sm focus:outline-none"
                      (input)="updateFilterPrice(filter.id, $event)"
                    />
                    <span
                      class="text-disabled absolute top-1/2 right-3 -translate-y-1/2 text-sm"
                    >
                      kr
                    </span>
                  </div>
                </div>
              } @else {
                <p class="text-secondary text-sm">
                  * Enable filter in order to see prices for this filter
                </p>
              }
            </div>
          }
        </div>
      </div>
    </div>`,
})
export class ProductFiltersComponent {
  // Product Filters
  enableAllFilters = signal<boolean>(false);
  productFilters = signal<ProductFilter[]>([
    {
      id: 'filter-1',
      name: 'Filter name',
      enabled: true,
      favorite: true,
      price: '365',
    },
    {
      id: 'filter-2',
      name: 'Filter name',
      enabled: true,
      favorite: false,
      price: '223',
    },
    {
      id: 'filter-3',
      name: 'Filter name',
      enabled: false,
      favorite: false,
      price: '',
    },
    {
      id: 'filter-4',
      name: 'Filter name',
      enabled: false,
      favorite: false,
      price: '',
    },
    {
      id: 'filter-5',
      name: 'Filter name',
      enabled: true,
      favorite: true,
      price: '321',
    },
  ]);

  toggleEnableAllFilters() {
    const newValue = !this.enableAllFilters();
    this.enableAllFilters.set(newValue);
    this.productFilters.update((filters) =>
      filters.map((filter) => ({ ...filter, enabled: newValue })),
    );
  }

  toggleFilter(filterId: string) {
    this.productFilters.update((filters) =>
      filters.map((filter) =>
        filter.id === filterId
          ? { ...filter, enabled: !filter.enabled }
          : filter,
      ),
    );
  }

  toggleFavorite(filterId: string) {
    this.productFilters.update((filters) =>
      filters.map((filter) =>
        filter.id === filterId
          ? { ...filter, favorite: !filter.favorite }
          : filter,
      ),
    );
  }

  updateFilterPrice(filterId: string, event: Event) {
    const input = event.target as HTMLInputElement;
    this.productFilters.update((filters) =>
      filters.map((filter) =>
        filter.id === filterId ? { ...filter, price: input.value } : filter,
      ),
    );
  }
}
