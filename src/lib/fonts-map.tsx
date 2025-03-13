type FontInfo = {
  name: string;
  className: string;
};

type FontMap = {
  [fontFamilyName: string]: FontInfo;
};

export const fontsMap: FontMap = {
  DM_Sans: {
    className: "font-dm-sans",
    name: "DM Sans",
  },
  DM_Serif_Display: {
    className: "font-dm-serif-display",
    name: "DM Serif Display",
  },
  GeistSans: {
    className: "font-geist-sans",
    name: "Geist Sans",
  },
  Montserrat: {
    className: "font-montserrat",
    name: "Montserrat",
  },
  PT_Serif: {
    className: "font-pt-serif",
    name: "PT Serif",
  },
  Roboto: {
    className: "font-roboto",
    name: "Roboto",
  },
  Roboto_Condensed: {
    className: "font-roboto-condensed",
    name: "Roboto Condensed",
  },
  Ultra: {
    className: "font-ultra",
    name: "Ultra",
  },
  Inter: {
    className: "font-inter",
    name: "Inter",
  },
  Syne: {
    className: "font-syne",
    name: "Syne",
  },
  ArchivoBlack: {
    className: "font-archivo-black",
    name: "Archivo Black",
  },
  BigShoulders: {
    className: "font-big-shoulders",
    name: "Big Shoulders",
  },
  Lato: {
    className: "font-lato",
    name: "Lato",
  },
  Lora: {
    className: "font-lora",
    name: "Lora",
  },
  Delius_Swash_Caps: {
    className: "font-delius-swash-caps",
    name: "Delius Swash Caps"
  }
};

export function fontIdToClassName(fontId: string) {
  return fontsMap[fontId].className;
}
