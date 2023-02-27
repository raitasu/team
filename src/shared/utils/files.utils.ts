import { type ArrayValues } from '~/shared/helpers.types';

const MAX_FILE_SIZE = 52428800;

export const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
] as const;
export const ACCEPTED_DOCS_FILE_TYPES = [
  'application/pdf',
  'application/msword'
] as const;

export const isValidDocsFile = (
  file: string | File | null
): file is File & { type: ArrayValues<typeof ACCEPTED_DOCS_FILE_TYPES> } => {
  if (!file || typeof file === 'string') {
    return true;
  }

  return (
    (ACCEPTED_DOCS_FILE_TYPES as readonly string[]).includes(file.type) &&
    file.size <= MAX_FILE_SIZE
  );
};

export const isValidImageFile = (
  avatar: File | string | null
): avatar is File & { type: ArrayValues<typeof ACCEPTED_IMAGE_TYPES> } => {
  if (typeof avatar === 'string' || avatar === null) {
    return true;
  }

  return (ACCEPTED_IMAGE_TYPES as readonly string[]).includes(avatar.type);
};
