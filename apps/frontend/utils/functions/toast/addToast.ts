export const addToast = (
  title: string,
  descriptions: string[],
  type: "warning" | "error" | "success" | "info"
) => {
  const toast = useToast();

  const color = `bg-${type}`;
  let icon;
  switch (type) {
    case "error":
      icon = "i-heroicons-x-circle-solid";
      break;
    case "warning":
      icon = "i-heroicons-exclamation-triangle-solid";
      break;
    case "info":
      icon = "i-heroicons-exclamation-circle-solid";
      break;
    default:
      icon = "i-heroicons-check-circle-solid";
      break;
  }

  toast.add({
    title,
    description: joinStrings(descriptions, " - "),
    ui: {
      progress: {
        background: color,
      },
      icon: {
        color: color,
      },
    },
    icon,
  });
};
