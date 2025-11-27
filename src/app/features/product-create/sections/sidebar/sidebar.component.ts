import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  imports: [],
  template: `
    <aside class="flex flex-col gap-3 md:w-[204px]">
      <!-- Card 1: Image Upload -->
      <div
        class="border-border-primary bg-surface-primary shadow-card flex flex-col gap-4 rounded-lg border p-3"
      >
        <div
          class="border-brand-primary bg-surface-secondary flex h-[136px] cursor-pointer items-center justify-center rounded-lg border border-dashed p-2"
        >
          <div class="flex flex-col items-center justify-center gap-2">
            <span class="text-primary text-sm font-bold">Add image</span>
            <span class="text-secondary text-xs"
              >Supported .jpeg, .jpg, .png</span
            >
          </div>
        </div>

        <p class="text-primary text-sm font-bold">Product name</p>
        <button
          type="button"
          class="border-border-primary bg-surface-primary text-primary shadow-card flex w-full items-center gap-1.5 rounded-lg border px-3 py-2.5 text-sm font-medium hover:cursor-pointer"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.7192 7.92963C17.154 7.78618 17.6249 7.79624 18.0532 7.95813C18.4815 8.12002 18.8413 8.42394 19.0725 8.81915L20.726 11.6466C20.8596 11.8748 20.9465 12.1274 20.9818 12.3895C21.0171 12.6516 21 12.9182 20.9316 13.1736C20.8631 13.4291 20.7447 13.6685 20.5831 13.8779C20.4216 14.0873 20.22 14.2626 19.9902 14.3935C17.4476 15.8428 13.5131 18.0855 9.93811 20.1231C8.92904 20.6983 7.78748 21.0005 6.626 21M6.5 21C7.42826 21 8.3185 20.6313 8.97487 19.9749C9.63125 19.3185 10 18.4283 10 17.5V5C10 4.46957 9.78929 3.96086 9.41421 3.58579C9.03914 3.21071 8.53043 3 8 3H5C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5V17.5C3 18.4283 3.36875 19.3185 4.02513 19.9749C4.6815 20.6313 5.57174 21 6.5 21ZM6.5 21C7.31975 21.0004 8.12531 20.7861 8.83649 20.3784C9.54767 19.9707 10.1397 19.3838 10.5535 18.6762C12.6785 15.0426 14.9551 11.1497 16.5036 8.50189C16.6371 8.27356 16.7241 8.021 16.7593 7.75885C16.7946 7.49669 16.7775 7.23015 16.709 6.97464C16.6406 6.71914 16.5221 6.47976 16.3605 6.27035C16.1989 6.06094 15.9973 5.88568 15.7675 5.7547L12.8812 4.10956C12.4237 3.84882 11.8818 3.77902 11.3732 3.91532C10.8645 4.05161 10.4302 4.383 10.1644 4.83756L10 5.11859"
              stroke="#101828"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M6.49927 16.5C6.53194 16.5 6.56452 16.5017 6.59692 16.5049C6.63128 16.5082 6.66483 16.5147 6.69751 16.5225C6.72809 16.5277 6.75884 16.5338 6.78931 16.543C6.82059 16.5524 6.85176 16.5636 6.88208 16.5762C6.9124 16.5887 6.9421 16.6028 6.97095 16.6182C7.0016 16.6345 7.03047 16.653 7.05786 16.6729C7.06267 16.6759 7.06775 16.6785 7.07251 16.6816L7.13403 16.7266C7.15933 16.7473 7.18405 16.7697 7.20728 16.793L7.27368 16.8662C7.29336 16.8902 7.3102 16.9158 7.32642 16.9414C7.34654 16.9691 7.36549 16.9982 7.38208 17.0293C7.39748 17.0581 7.41153 17.0878 7.42407 17.1182C7.4366 17.1485 7.44781 17.1797 7.45728 17.2109C7.46638 17.2411 7.47258 17.2715 7.47778 17.3018C7.4798 17.3103 7.48289 17.3185 7.48462 17.3271L7.49536 17.4033C7.49851 17.4357 7.50028 17.4683 7.50024 17.501C7.50018 17.5501 7.49669 17.5993 7.4895 17.6475C7.48194 17.698 7.46819 17.7467 7.45142 17.793C7.43965 17.8387 7.42454 17.8845 7.40356 17.9287C7.38264 17.9728 7.35866 18.0158 7.3313 18.0566C7.30394 18.0975 7.27327 18.1358 7.24048 18.1719C7.20936 18.2061 7.17539 18.2365 7.13989 18.2637C7.10204 18.2988 7.06003 18.3308 7.01392 18.3584C6.97196 18.3835 6.92762 18.405 6.88208 18.4238C6.83658 18.4426 6.78983 18.4579 6.74243 18.4697C6.69576 18.4814 6.64911 18.4886 6.60278 18.4912C6.57808 18.495 6.55298 18.4977 6.52759 18.499H6.45044L6.30493 18.4805C6.25666 18.4709 6.20931 18.4579 6.16333 18.4414C6.1143 18.4238 6.06845 18.4011 6.02563 18.375C5.98399 18.3548 5.94307 18.3313 5.90454 18.3027C5.86533 18.2736 5.82801 18.2418 5.79321 18.207C5.75842 18.1722 5.72661 18.1349 5.69751 18.0957C5.66884 18.0571 5.64448 18.0164 5.62427 17.9746C5.59832 17.9319 5.57634 17.8858 5.55884 17.8369C5.54238 17.7909 5.52939 17.7436 5.51978 17.6953L5.50122 17.5498C5.49864 17.4977 5.50133 17.4461 5.50903 17.3965C5.51172 17.3505 5.51894 17.3042 5.53052 17.2578L5.57642 17.1182C5.59524 17.0726 5.61674 17.0283 5.64185 16.9863L5.68481 16.9229C5.70043 16.9019 5.71722 16.8822 5.73462 16.8633C5.7623 16.8267 5.7932 16.7917 5.82837 16.7598C5.86449 16.727 5.90276 16.6963 5.9436 16.6689L6.07153 16.5967L6.14282 16.5674C6.16673 16.5589 6.19086 16.5518 6.21509 16.5459C6.25899 16.5305 6.30509 16.5179 6.35278 16.5107L6.49927 16.5Z"
              stroke="#101828"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-dasharray="3 3"
            />
          </svg>
          <span class="text-primary flex-1 text-sm font-semibold"
            >Set product color</span
          >
        </button>
      </div>

      <!-- Card 2: Button group -->
      <div class="flex flex-col gap-2">
        <!-- Button: Set as favorite -->
        <button
          type="button"
          class="text-primary shadow-card bg-surface-primary border-border-primary flex items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.999 17.7682L16.01 19.8762C16.791 20.2862 17.703 19.6232 17.554 18.7542L16.788 14.2882L20.034 11.1272C20.666 10.5112 20.318 9.43823 19.444 9.31123L14.96 8.65923L12.955 4.59423C12.565 3.80323 11.436 3.80323 11.046 4.59423L9.03999 8.65923L4.55599 9.31123C3.68299 9.43823 3.33399 10.5112 3.96599 11.1272L7.21199 14.2882L6.44599 18.7542C6.29699 19.6232 7.20899 20.2872 7.98999 19.8762L12.001 17.7682H11.999Z"
              fill="#0E9E73"
              stroke="#0E9E73"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <span class="text-primary text-sm font-semibold"
            >Set as favorite</span
          >
        </button>

        <!-- Button: Duplicate -->
        <button
          type="button"
          disabled
          class="text-primary shadow-card bg-surface-primary border-border-primary flex cursor-not-allowed items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium opacity-50"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.75 14.75V15.75C14.75 16.5456 14.4339 17.3087 13.8713 17.8713C13.3087 18.4339 12.5456 18.75 11.75 18.75H3.75C2.95435 18.75 2.19129 18.4339 1.62868 17.8713C1.06607 17.3087 0.75 16.5456 0.75 15.75V7.75C0.75 6.95435 1.06607 6.19129 1.62868 5.62868C2.19129 5.06607 2.95435 4.75 3.75 4.75H4.75M11.7508 9.75V5.75M9.75 7.74919H13.75M4.75 3.75V11.75C4.75 12.5456 5.06607 13.3087 5.62868 13.8713C6.19129 14.4339 6.95435 14.75 7.75 14.75H15.75C16.5456 14.75 17.3087 14.4339 17.8713 13.8713C18.4339 13.3087 18.75 12.5456 18.75 11.75V3.75C18.75 2.95435 18.4339 2.19129 17.8713 1.62868C17.3087 1.06607 16.5456 0.75 15.75 0.75H7.75C6.95435 0.75 6.19129 1.06607 5.62868 1.62868C5.06607 2.19129 4.75 2.95435 4.75 3.75Z"
              stroke="#101828"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <span class="text-primary text-sm font-semibold">Duplicate</span>
        </button>

        <!-- Button: Product history -->
        <button
          type="button"
          disabled
          class="text-primary shadow-card bg-surface-primary border-border-primary flex cursor-not-allowed items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium opacity-50"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.808 13.5918L11.686 12.3418V7.89185M3 5.49985V8.49985H6M3.05865 12.9998C3.61729 17.9325 8.06888 21.4784 13.0016 20.9197C17.9342 20.3611 21.4801 15.9095 20.9215 10.9768C20.3628 6.04416 15.9112 2.4983 10.9785 3.05694C7.74854 3.42274 4.96772 5.504 3.70612 8.49985"
              stroke="#101828"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <span class="text-primary text-sm font-semibold"
            >Product history</span
          >
        </button>

        <!-- Button: Delete product -->
        <button
          type="button"
          disabled
          class="text-primary shadow-card bg-surface-primary border-border-primary flex cursor-not-allowed items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium opacity-50"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 6.375H4M13.969 10.875V16.5M10.031 10.875V16.5M15.5414 21H8.45857C7.89171 21 7.34573 20.786 6.92981 20.4009C6.51389 20.0157 6.25868 19.4878 6.2152 18.9226L5.25 6.375H18.75L17.7848 18.9226C17.7413 19.4878 17.4861 20.0157 17.0702 20.4009C16.6543 20.786 16.1083 21 15.5414 21ZM9.1875 3H14.8125C15.1109 3 15.397 3.11853 15.608 3.3295C15.819 3.54048 15.9375 3.82663 15.9375 4.125V6.375H8.0625V4.125C8.0625 3.82663 8.18103 3.54048 8.392 3.3295C8.60298 3.11853 8.88913 3 9.1875 3Z"
              stroke="#F04438"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <span class="text-primary text-sm font-semibold">Delete product</span>
        </button>
      </div>

      <!-- Card 3: Gross Margin -->
      <div
        class="border-border-primary bg-surface-primary shadow-card flex flex-col gap-3 rounded-lg border p-3.5"
      >
        <div class="">
          <p class="text-primary text-sm font-medium">Gross margin</p>
          <p class="text-primary text-sm">00,00 kr / 0,0%</p>
        </div>
        <div>
          <p class="text-primary text-sm font-medium">Takeaway gross margin</p>
          <p class="text-primary text-sm">00,00 kr / 0,0%</p>
        </div>
      </div>
    </aside>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {}
