export const copyStyles = (from: HTMLElement, to: HTMLElement, which: string[]): void => {
  const styles = window.getComputedStyle(from);
  console.log('styles', styles);
  if (!styles) return;
  for (const property of which)
    (to.style as any)[property] = (styles as any)[property];
};
