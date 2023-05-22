export function titleWithBrand(title: string): string {
  const pageTitle = title && `${title} | `;
  return `${pageTitle || ''}Adopción de mascotas`;
}
