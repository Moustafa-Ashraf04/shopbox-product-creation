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

  variantGroups = signal<VariantGroup[]>([
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
  ]);

  defaultVariantOptions = signal([
    { value: 'variant-1', label: '{Variant name1} / {Variant name2}' },
  ]);

  private variantGroupCounter = 2;

  toggleInventoryOnVariants() {
    this.inventoryOnVariants.update((v) => !v);
  }

  addVariantGroup() {
    const newGroup: VariantGroup = {
      id: `group-${++this.variantGroupCounter}`,
      name1: 'Variant Group name1',
      name2: 'Variant Group name2',
      expanded: true,
      variants: [],
    };
    this.variantGroups.update((groups) => [...groups, newGroup]);
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

  reorderVariant(groupId: string, variantId: string, direction: 'up' | 'down') {
    this.variantGroups.update((groups) =>
      groups.map((group) => {
        if (group.id !== groupId) return group;

        const variants = [...group.variants];
        const index = variants.findIndex((v) => v.id === variantId);

        if (direction === 'up' && index > 0) {
          [variants[index - 1], variants[index]] = [
            variants[index],
            variants[index - 1],
          ];
        } else if (direction === 'down' && index < variants.length - 1) {
          [variants[index], variants[index + 1]] = [
            variants[index + 1],
            variants[index],
          ];
        }

        return { ...group, variants };
      }),
    );
  }
}
