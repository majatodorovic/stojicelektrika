export const generateMenu = (menu, startPath) => {
  const ret = [];
  for (const item of menu) {
    const path = `${startPath}/${item.slug}`;
    const { name } = item;
    const children =
      (item?.children ?? []).length > 0
        ? generateMenu(item.children, path)
        : [];

    ret.push({
      name,
      path,
      children,
      id: item.id,
      icon: item.icon,
      slug: item.slug,
    });
  }

  return ret;
};

// export const generateMenu = (categories, startPath) => {
//   if (categories == null) return;

//   return categories.map((category) => {
//       let path = `${startPath}/${category.slug}`;
//       return { icon: category.icon, label: category.name, to: path, children: generateMenu(category.children, path) };
//   });
// };
