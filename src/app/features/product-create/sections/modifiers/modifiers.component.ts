import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

export interface ModifierOption {
  id: string;
  name: string;
  price: number;
  selected: boolean;
}

export interface ModifierGroup {
  id: string;
  name: string;
  min?: number;
  max?: number;
  included?: number;
  options: ModifierOption[];
}

export interface StandaloneModifier {
  id: string;
  name: string;
  min?: number;
  max?: number;
  included?: number;
  selected: boolean;
}

export interface ModifierCategory {
  id: string;
  type: 'mandatory' | 'addon' | 'optout';
  title: string;
  expanded: boolean;
  groups: ModifierGroup[];
  standaloneModifiers: StandaloneModifier[];
}

@Component({
  selector: 'app-modifiers',
  imports: [],
  templateUrl: './modifiers.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModifiersComponent {
  isExpanded = signal(true);

  categories = signal<ModifierCategory[]>([]);

  // Predefined categories to add sequentially
  private readonly predefinedCategories: ModifierCategory[] = [
    {
      id: 'mandatory',
      type: 'mandatory',
      title: 'Mandatory modifiers',
      expanded: true,
      groups: [
        {
          id: 'mandatory-group-1',
          name: 'Modifier group name',
          options: [
            {
              id: 'opt-1',
              name: 'Modifier nammeee',
              price: 39.0,
              selected: false,
            },
            { id: 'opt-2', name: 'Modifier name', price: 39.0, selected: true },
            {
              id: 'opt-3',
              name: 'Modifier name',
              price: 45.0,
              selected: false,
            },
            {
              id: 'opt-4',
              name: 'Modifier name looongeeerr',
              price: 45.0,
              selected: false,
            },
            { id: 'opt-5', name: 'Modifier', price: 45.0, selected: false },
            {
              id: 'opt-6',
              name: 'Modifier name longer',
              price: 45.0,
              selected: false,
            },
          ],
        },
        {
          id: 'mandatory-group-2',
          name: 'Modifier group name',
          options: [
            {
              id: 'opt-7',
              name: 'Modifier nammeee',
              price: 39.0,
              selected: false,
            },
            {
              id: 'opt-8',
              name: 'Modifier name',
              price: 45.0,
              selected: false,
            },
            {
              id: 'opt-9',
              name: 'Modifier name looongeeerr',
              price: 45.0,
              selected: false,
            },
            {
              id: 'opt-10',
              name: 'Modifier name',
              price: 39.0,
              selected: true,
            },
            { id: 'opt-11', name: 'Modifier', price: 45.0, selected: false },
            {
              id: 'opt-12',
              name: 'Modifier name longer',
              price: 45.0,
              selected: false,
            },
          ],
        },
      ],
      standaloneModifiers: [
        { id: 'standalone-1', name: 'Modifier nammeee', selected: false },
        { id: 'standalone-2', name: 'Modifier nammeee', selected: true },
        { id: 'standalone-3', name: 'Modifier nammeee', selected: false },
        {
          id: 'standalone-4',
          name: 'Modifier name looongeeerr',
          selected: false,
        },
      ],
    },
    {
      id: 'addon',
      type: 'addon',
      title: 'Add-on modifiers',
      expanded: true,
      groups: [
        {
          id: 'addon-group-1',
          name: 'Modifier group name',
          min: 1,
          max: 1,
          included: 4,
          options: [
            {
              id: 'addon-opt-1',
              name: 'Modifier nammeee',
              price: 39.0,
              selected: false,
            },
            {
              id: 'addon-opt-2',
              name: 'Modifier name',
              price: 39.0,
              selected: true,
            },
            {
              id: 'addon-opt-3',
              name: 'Modifier name',
              price: 45.0,
              selected: false,
            },
            {
              id: 'addon-opt-4',
              name: 'Modifier name looongeeerr',
              price: 45.0,
              selected: false,
            },
            {
              id: 'addon-opt-5',
              name: 'Modifier',
              price: 45.0,
              selected: false,
            },
            {
              id: 'addon-opt-6',
              name: 'Modifier name longer',
              price: 45.0,
              selected: false,
            },
          ],
        },
      ],
      standaloneModifiers: [
        {
          id: 'addon-standalone-1',
          name: 'Modifier nammeee',
          min: 1,
          max: 3,
          included: 1,
          selected: true,
        },
        {
          id: 'addon-standalone-2',
          name: 'Modifier nammeee',
          min: 1,
          max: 1,
          included: 0,
          selected: false,
        },
      ],
    },
    {
      id: 'optout',
      type: 'optout',
      title: 'Opt-out modifiers',
      expanded: true,
      groups: [],
      standaloneModifiers: [
        {
          id: 'optout-standalone-1',
          name: 'Modifier nammeee',
          selected: false,
        },
        {
          id: 'optout-standalone-2',
          name: 'Modifier nammeee',
          selected: false,
        },
        {
          id: 'optout-standalone-3',
          name: 'Modifier nammeee',
          selected: false,
        },
      ],
    },
  ];

  private predefinedIndex = 0;
  lastAddedCategory = signal<string | null>(null);

  addModifierGroup() {
    if (this.predefinedIndex >= this.predefinedCategories.length) {
      return;
    }

    const category = this.predefinedCategories[this.predefinedIndex++];
    this.categories.update((cats) => [...cats, category]);

    this.lastAddedCategory.set(category.title);
    setTimeout(() => this.lastAddedCategory.set(null), 3000);
  }

  toggleSection() {
    this.isExpanded.update((v) => !v);
  }

  toggleCategory(categoryId: string) {
    this.categories.update((categories) =>
      categories.map((category) =>
        category.id === categoryId
          ? { ...category, expanded: !category.expanded }
          : category,
      ),
    );
  }

  toggleModifierOption(categoryId: string, groupId: string, optionId: string) {
    this.categories.update((categories) =>
      categories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              groups: category.groups.map((group) =>
                group.id === groupId
                  ? {
                      ...group,
                      options: group.options.map((option) =>
                        option.id === optionId
                          ? { ...option, selected: !option.selected }
                          : option,
                      ),
                    }
                  : group,
              ),
            }
          : category,
      ),
    );
  }

  toggleStandaloneModifier(categoryId: string, modifierId: string) {
    this.categories.update((categories) =>
      categories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              standaloneModifiers: category.standaloneModifiers.map(
                (modifier) =>
                  modifier.id === modifierId
                    ? { ...modifier, selected: !modifier.selected }
                    : modifier,
              ),
            }
          : category,
      ),
    );
  }

  removeModifierGroup(categoryId: string, groupId: string) {
    this.categories.update((categories) =>
      categories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              groups: category.groups.filter((group) => group.id !== groupId),
            }
          : category,
      ),
    );
  }

  removeStandaloneModifier(categoryId: string, modifierId: string) {
    this.categories.update((categories) =>
      categories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              standaloneModifiers: category.standaloneModifiers.filter(
                (m) => m.id !== modifierId,
              ),
            }
          : category,
      ),
    );
  }

  formatPrice(price: number): string {
    return price.toFixed(2).replace('.', ',') + ' kr';
  }

  getModifiersData(): { categories: ModifierCategory[] } {
    return {
      categories: this.categories(),
    };
  }
}
