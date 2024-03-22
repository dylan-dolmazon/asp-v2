export default defineAppConfig({
  // https://ui.nuxt.com/getting-started/theming
  ui: {
    primary: "default",
    gray: "gris",
    notifications: {
      position: "bottom-0",
    },
    success: "bg-success",
    error: "bg-error",
    warning: "bg-warning",
    info: "bg-info",
    table: {
      wrapper: "mx-8 rounded-lg shadow-lg",
      thead: "bg-primary b",
      th: {
        base: "text-left rtl:text-right",
        padding: "px-4 py-3.5",
        color: "text-white",
        font: "font-bold",
        size: "text-sm",
      },
      td: {
        color: "text-black",
        font: "font-bold",
      },
      default: {
        sortButton: {
          icon: "i-heroicons-arrows-up-down-20-solid",
          trailing: true,
          square: true,
          color: "text-white",
          variant: "ghost",
          class: "-m-1.5",
        },
      },
    },
  },
});
