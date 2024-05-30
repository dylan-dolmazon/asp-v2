import dayjs from "dayjs";
import "dayjs/locale/fr";

dayjs.locale("fr");

export const getDateformated = (
  date?: string,
  format: string = "DD/MM/YYYY"
) => {
  return dayjs(date).format(format);
};
