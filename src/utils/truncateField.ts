export const truncateField = (input: string) => {
  const maxLength = 128;
  if (input.length <= maxLength) {
    return input;
  } else {
    return `${input.slice(0, maxLength)}...`;
  }
};
