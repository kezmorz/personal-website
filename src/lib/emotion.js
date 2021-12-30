import createCache from "@emotion/cache";

// prepend: true moves MUI styles to the top of the <head> so they're loaded first.
// It allows us to easily override MUI styles with other styling solutions.
export const createEmotionCache = () => {
  return createCache({ key: "css", prepend: true });
};
