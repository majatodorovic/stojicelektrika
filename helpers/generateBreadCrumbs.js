export const generateBreadcrumbs = (start, startPath, parents, end) => {
  const breadcrumbs = [];
  breadcrumbs.push(start);
  let path = startPath;
  for (const item of parents) {
    path = `${path}/${item.id}`;
    breadcrumbs.push({ label: item.name, id: item.id });
  }
  breadcrumbs.push(end);
  return breadcrumbs;
};
