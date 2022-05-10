import { format } from "date-fns";
import { enGB, cy } from "date-fns/locale";

const locales = {
  en: enGB,
  cy: cy,
};

export const formatDate = (date, pattern, locale = "en") => {
  return format(date, pattern, {
    locale: locales[locale],
  });
};
