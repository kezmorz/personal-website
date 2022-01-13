import { format, add, parseJSON } from "date-fns";
import { enGB, cy } from "date-fns/locale";

const locales = {
  en: enGB,
  cy: cy,
};

export const formatDate = (dateString, locale = "en") => {
  return format(
    add(parseJSON(dateString), {
      minutes: new Date().getTimezoneOffset(),
    }),
    "PPP",
    {
      locale: locales[locale],
    }
  );
};
