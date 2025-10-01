/** @format */

import slugify from "slugify";

export function generateSlug(text: string): string {
  return slugify(text, {
    lower: true,
    strict: true, // remove special chars
    trim: true,
  });
}
