import { format } from "date-fns";
import { enGB, cy } from "date-fns/locale";

const locales = {
  en: enGB,
  cy: cy,
};

export const formatDate = (dateString, pattern, locale = "en") => {
  return format(dateString, pattern, {
    locale: locales[locale],
  });
};
