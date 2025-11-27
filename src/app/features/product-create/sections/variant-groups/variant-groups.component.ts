import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TextInputComponent } from '../../../../shared/components/text-input/text-input.component';
import { SelectComponent } from '../../../../shared/components/select/select.component';
import { InputWithButtonComponent } from '../../../../shared/components/input-with-button/input-with-button.component';

interface Variant {
  id: string;
  name1: string;
  name2: string;
  expanded: boolean;
  enabled: boolean;
  productVariantId: string;
  integrationId: string;
  addUniquePrice: boolean;
  customPrice: boolean;
  variantPrice: string;
  purchasePrice: string;
  takeAwayPrice: string;
  skuCode: string;
  barCode: string;
}

interface VariantGroup {
  id: string;
  name1: string;
  name2: string;
  expanded: boolean;
  variants: Variant[];
}

@Component({
  selector: 'app-variant-groups',
  imports: [TextInputComponent, SelectComponent, InputWithButtonComponent],
  templateUrl: './variant-groups.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VariantGroupsComponent {
  isExpanded = signal(true);
  inventoryOnVariants = signal(true);

  toggleSection() {
    this.isExpanded.update((v) => !v);
  }

  variantGroups = signal<VariantGroup[]>([]);

  defaultVariantOptions = signal([
    { value: 'variant-1', label: '{Variant name1} / {Variant name2}' },
  ]);

  private variantGroupCounter = 0;

  // Predefined variant groups to add sequentially
  private readonly predefinedGroups: VariantGroup[] = [
    {
      id: 'group-1',
      name1: 'Variant Group name1',
      name2: 'Variant Group name2',
      expanded: true,
      variants: [
        {
          id: 'variant-1-1',
          name1: 'Variant name1',
          name2: 'Variant name2',
          expanded: false,
          enabled: true,
          productVariantId: '12415555',
          integrationId: '277653',
          addUniquePrice: true,
          customPrice: false,
          variantPrice: '89',
          purchasePrice: '',
          takeAwayPrice: '95',
          skuCode: 'SB-8214155',
          barCode: '012421000045521',
        },
        {
          id: 'variant-1-2',
          name1: 'Variant name1',
          name2: 'Variant name2',
          expanded: false,
          enabled: false,
          productVariantId: '',
          integrationId: '',
          addUniquePrice: false,
          customPrice: false,
          variantPrice: '',
          purchasePrice: '',
          takeAwayPrice: '',
          skuCode: '',
          barCode: '',
        },
        {
          id: 'variant-1-3',
          name1: 'Variant name1',
          name2: 'Variant name2',
          expanded: true,
          enabled: true,
          productVariantId: '12415555',
          integrationId: '277653',
          addUniquePrice: true,
          customPrice: false,
          variantPrice: '89',
          purchasePrice: '',
          takeAwayPrice: '95',
          skuCode: 'SB-8214155',
          barCode: '012421000045521',
        },
      ],
    },
    {
      id: 'group-2',
      name1: 'Variant Group name1',
      name2: 'Variant Group name2',
      expanded: false,
      variants: [],
    },
  ];

  private predefinedIndex = 0;
  lastAddedGroup = signal<string | null>(null);

  toggleInventoryOnVariants() {
    this.inventoryOnVariants.update((v) => !v);
  }

  addVariantGroup() {
    let addedName: string;

    // Add predefined groups first, then create new empty ones
    if (this.predefinedIndex < this.predefinedGroups.length) {
      const group = this.predefinedGroups[this.predefinedIndex++];
      this.variantGroups.update((groups) => [...groups, group]);
      this.variantGroupCounter = this.predefinedIndex;
      addedName = `{${group.name1}} / {${group.name2}}`;
    } else {
      const newGroup: VariantGroup = {
        id: `group-${++this.variantGroupCounter}`,
        name1: 'Variant Group name1',
        name2: 'Variant Group name2',
        expanded: true,
        variants: [],
      };
      this.variantGroups.update((groups) => [...groups, newGroup]);
      addedName = `{${newGroup.name1}} / {${newGroup.name2}}`;
    }

    this.lastAddedGroup.set(addedName);
    setTimeout(() => this.lastAddedGroup.set(null), 3000);
  }

  toggleVariantGroup(groupId: string) {
    this.variantGroups.update((groups) =>
      groups.map((group) =>
        group.id === groupId ? { ...group, expanded: !group.expanded } : group,
      ),
    );
  }

  toggleVariant(groupId: string, variantId: string) {
    this.variantGroups.update((groups) =>
      groups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              variants: group.variants.map((variant) =>
                variant.id === variantId
                  ? { ...variant, expanded: !variant.expanded }
                  : variant,
              ),
            }
          : group,
      ),
    );
  }

  toggleVariantEnabled(groupId: string, variantId: string) {
    this.variantGroups.update((groups) =>
      groups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              variants: group.variants.map((variant) =>
                variant.id === variantId
                  ? { ...variant, enabled: !variant.enabled }
                  : variant,
              ),
            }
          : group,
      ),
    );
  }

  toggleAddUniquePrice(groupId: string, variantId: string) {
    this.variantGroups.update((groups) =>
      groups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              variants: group.variants.map((variant) =>
                variant.id === variantId
                  ? { ...variant, addUniquePrice: !variant.addUniquePrice }
                  : variant,
              ),
            }
          : group,
      ),
    );
  }

  toggleCustomPrice(groupId: string, variantId: string) {
    this.variantGroups.update((groups) =>
      groups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              variants: group.variants.map((variant) =>
                variant.id === variantId
                  ? { ...variant, customPrice: !variant.customPrice }
                  : variant,
              ),
            }
          : group,
      ),
    );
  }

  removeVariant(groupId: string, variantId: string) {
    this.variantGroups.update((groups) =>
      groups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              variants: group.variants.filter(
                (variant) => variant.id !== variantId,
              ),
            }
          : group,
      ),
    );
  }
}
