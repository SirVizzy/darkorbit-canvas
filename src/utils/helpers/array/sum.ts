export const sum = <T>(array: T[], selector: (item: T) => number): number => {
  return array.reduce((accumulator, item) => accumulator + selector(item), 0);
};
