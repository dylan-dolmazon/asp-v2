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
          variant: "ghost",
          class: "-m-1.5 text-white",
        },
      },
    },
    pagination: {
      default: {
        prevButton: {
          icon: "i-heroicons-arrow-small-left-20-solid",
          label: "Prev",
          color: "gray",
        },
        nextButton: {
          icon: "i-heroicons-arrow-small-right-20-solid",
          trailing: true,
          label: "Next",
          color: "gray",
        },
      },
    },
    dropdown: {
      item: {
        active: "text-default-400",
        icon: {
          active: "text-default-400",
        },
      },
    },
    card: {
      divide: "divide-y divide-gray-200",
    },
    select: {
      base: "h-10 ps-2",
    },
    tabs: {
      list: {
        tab: {
          active: "bg-primary text-white",
          inactive: "bg-white",
        },
      },
    },
  },
});
