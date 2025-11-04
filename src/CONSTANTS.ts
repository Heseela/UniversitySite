export const NUMBER_REGEX_STRING = "^[0-9]*$";
export const NAME_REGEX = /^[A-Za-z]+$/;
export const NAME_WITH_SPACE_REGEX = /^[A-Za-z]+( [A-Za-z]+)*$/;
export const APP_URL = (process.env.NEXT_PUBLIC_URL || process.env.APP_URL);
export const CLOUDINARY_SIGNATURE_ENDPOINT =
  "/api/sign-cloudinary-params" as const;

export const SITE_TITLE = "Feature Creatify";
