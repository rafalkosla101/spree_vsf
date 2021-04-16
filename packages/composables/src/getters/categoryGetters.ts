import { CategoryGetters, AgnosticCategoryTree, AgnosticBreadcrumb } from '@vue-storefront/core';
import { Category } from '@upsidelab/vue-storefront-spree-api/src/types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCategoryTree = (categories: any): AgnosticCategoryTree => {
  const { root, current } = categories;

  const itemToTree = (category: Category) => ({
    label: category.name,
    slug: category.slug,
    items: category.items.map(itemToTree),
    isCurrent: category.id === current.id
  });

  return itemToTree(root);
};

export const getCategoryBreadcrumbs = (category: Category): AgnosticBreadcrumb[] => {
  const rootBreadcrumb = {
    text: 'Home',
    link: '/'
  };
  const breadcrumbs = [rootBreadcrumb];

  const buildBreadcrumbs = (category) => {
    if (category.parent.parent)
      buildBreadcrumbs(category.parent);

    breadcrumbs.push({
      text: category.name,
      link: `/c/${category.slug}`
    });
  };
  buildBreadcrumbs(category);

  return breadcrumbs;
};

const categoryGetters: CategoryGetters<Category> = {
  getTree: getCategoryTree,
  getBreadcrumbs: getCategoryBreadcrumbs
};

export default categoryGetters;
