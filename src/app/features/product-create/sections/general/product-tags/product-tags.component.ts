import { Component, signal } from '@angular/core';

interface Tag {
  id: string;
  name: string;
  selected: boolean;
}

interface TagGroup {
  id: string;
  name: string;
  expanded: boolean;
  tags: Tag[];
}

@Component({
  selector: 'app-product-tags',
  imports: [],
  template: `
    <!-- Product Tags -->
    <div
      class="border-border-secondary bg-surface-primary shadow-card rounded-lg border"
    >
      <div
        class="border-border-secondary flex flex-col gap-1.5 border-b px-4 py-3.5"
      >
        <div class="flex items-center justify-between gap-2">
          <h3 class="text-primary text-base font-semibold">Product tags</h3>
          <button
            type="button"
            class="cursor-pointer"
            (click)="toggleSection()"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="transition-transform duration-200"
              [class.rotate-180]="!isExpanded()"
            >
              <path
                d="M11.6465 8.64648C11.8417 8.45124 12.1583 8.45124 12.3535 8.64648L18.3535 14.6465C18.5488 14.8417 18.5488 15.1583 18.3535 15.3535C18.1583 15.5488 17.8417 15.5488 17.6465 15.3535L12 9.70703L6.35352 15.3535C6.15825 15.5487 5.84175 15.5487 5.64648 15.3535C5.45124 15.1583 5.45124 14.8417 5.64648 14.6465L11.6465 8.64648Z"
                fill="#101828"
                stroke="#101828"
              />
            </svg>
          </button>
        </div>
        <p class="text-secondary text-sm">
          Select tag groups to categorize this product. You can select more than
          one tag.
        </p>
      </div>

      @if (isExpanded()) {
        <!-- Tag Groups List -->
        @if (tagGroups().length > 0) {
          <div class="flex flex-col gap-3.5 px-4 py-3.5">
            @for (group of tagGroups(); track group.id) {
              <div class="bg-surface-secondary rounded-lg">
                <!-- Group Header -->
                <div class="flex items-center justify-between gap-2 px-3 py-4">
                  <button
                    type="button"
                    class="flex flex-1 cursor-pointer items-center gap-2"
                    (click)="toggleTagGroup(group.id)"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      [class.rotate-180]="!group.expanded"
                      class="transition-transform duration-200"
                    >
                      <path
                        d="M11.6465 8.64648C11.8417 8.45124 12.1583 8.45124 12.3535 8.64648L18.3535 14.6465C18.5488 14.8417 18.5488 15.1583 18.3535 15.3535C18.1583 15.5488 17.8417 15.5488 17.6465 15.3535L12 9.70703L6.35352 15.3535C6.15825 15.5487 5.84175 15.5487 5.64648 15.3535C5.45124 15.1583 5.45124 14.8417 5.64648 14.6465L11.6465 8.64648Z"
                        fill="#101828"
                        stroke="#101828"
                      />
                    </svg>

                    <span class="text-primary text-base font-semibold">
                      {{ '{' }}Product tags group name{{ '}' }}
                    </span>
                  </button>
                  <button
                    type="button"
                    class="cursor-pointer"
                    (click)="removeTagGroup(group.id)"
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
                  </button>
                </div>

                <!-- Tags (shown when expanded) -->
                @if (group.expanded) {
                  <div class="flex flex-wrap gap-3 px-4 py-3.5">
                    @for (tag of group.tags; track tag.id) {
                      <button
                        type="button"
                        class="text-primary shadow-input rounded-lg border px-3 py-2 text-sm transition-colors"
                        [class.border-brand-primary]="tag.selected"
                        [class.bg-surface-brand-secondary]="tag.selected"
                        [class.border-border-primary]="!tag.selected"
                        [class.bg-surface-primary]="!tag.selected"
                        (click)="toggleTag(group.id, tag.id)"
                      >
                        {{ '{' }}{{ tag.name }}{{ '}' }}
                      </button>
                    }
                  </div>
                }
              </div>
            }
          </div>
        }

        <div class="px-4 py-4">
          <button
            type="button"
            class="bg-surface-brand-secondary text-brand-primary flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg px-4 py-3 text-base font-medium"
            (click)="addTagGroup()"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.5 12H19.5M12 19.5V4.5"
                stroke="#0E9E73"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            Add tag group
          </button>
        </div>
      }
    </div>
  `,
})
export class ProductTagsComponent {
  isExpanded = signal(true);

  toggleSection() {
    this.isExpanded.update((v) => !v);
  }

  // Tag Groups
  tagGroups = signal<TagGroup[]>([
    {
      id: 'group-1',
      name: 'Product tags group name',
      expanded: true,
      tags: [
        { id: 'tag-1-1', name: 'Tag name', selected: true },
        { id: 'tag-1-2', name: 'Tag name looong', selected: false },
        { id: 'tag-1-3', name: 'Loooong Tag name', selected: false },
        { id: 'tag-1-4', name: 'Tag name', selected: false },
        { id: 'tag-1-5', name: 'Tag name', selected: false },
        { id: 'tag-1-6', name: 'Looong Tag name', selected: false },
      ],
    },
    {
      id: 'group-2',
      name: 'Product tags group name',
      expanded: true,
      tags: [
        { id: 'tag-2-1', name: 'Tag name looong', selected: false },
        { id: 'tag-2-2', name: 'Tag name', selected: false },
        { id: 'tag-2-3', name: 'Tag name', selected: true },
        { id: 'tag-2-4', name: 'Tag name', selected: false },
      ],
    },
    {
      id: 'group-3',
      name: 'Product tags group name',
      expanded: true,
      tags: [
        { id: 'tag-3-1', name: 'Tag name looong', selected: false },
        { id: 'tag-3-2', name: 'Tag name', selected: false },
        { id: 'tag-3-3', name: 'Looong Tag name', selected: false },
        { id: 'tag-3-4', name: 'Tag name', selected: true },
      ],
    },
    {
      id: 'group-4',
      name: 'Product tags group name',
      expanded: false,
      tags: [
        { id: 'tag-4-1', name: 'Tag name', selected: false },
        { id: 'tag-4-2', name: 'Tag name looong', selected: false },
      ],
    },
    {
      id: 'group-5',
      name: 'Product tags group name',
      expanded: false,
      tags: [
        { id: 'tag-5-1', name: 'Tag name', selected: false },
        { id: 'tag-5-2', name: 'Tag name', selected: false },
      ],
    },
  ]);

  private tagGroupCounter = 5;

  addTagGroup() {
    const newGroup: TagGroup = {
      id: `group-${++this.tagGroupCounter}`,
      name: 'Product tags group name',
      expanded: true,
      tags: [
        { id: `tag-${Date.now()}-1`, name: 'Tag name', selected: false },
        { id: `tag-${Date.now()}-2`, name: 'Tag name looong', selected: false },
        {
          id: `tag-${Date.now()}-3`,
          name: 'Loooong Tag name',
          selected: false,
        },
        { id: `tag-${Date.now()}-4`, name: 'Tag name', selected: false },
        { id: `tag-${Date.now()}-5`, name: 'Tag name', selected: false },
        { id: `tag-${Date.now()}-6`, name: 'Looong Tag name', selected: false },
      ],
    };
    this.tagGroups.update((groups) => [...groups, newGroup]);
  }

  removeTagGroup(groupId: string) {
    this.tagGroups.update((groups) =>
      groups.filter((group) => group.id !== groupId),
    );
  }

  toggleTagGroup(groupId: string) {
    this.tagGroups.update((groups) =>
      groups.map((group) =>
        group.id === groupId ? { ...group, expanded: !group.expanded } : group,
      ),
    );
  }

  toggleTag(groupId: string, tagId: string) {
    this.tagGroups.update((groups) =>
      groups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              tags: group.tags.map((tag) =>
                tag.id === tagId ? { ...tag, selected: !tag.selected } : tag,
              ),
            }
          : group,
      ),
    );
  }
}
