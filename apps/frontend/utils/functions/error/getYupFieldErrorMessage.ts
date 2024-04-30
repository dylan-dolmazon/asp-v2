export const getYupFieldErrorMessage = (name: string, errors: any): string => {
  for (const [key, value] of Object.entries(errors || {})) {
    if (key === name) {
      return value as string;
    }
  }
  return "";
};
