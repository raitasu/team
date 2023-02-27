import { type TeamHeadersIds } from '../tables.constans';

export type HeaderKeys = (typeof TeamHeadersIds)[keyof typeof TeamHeadersIds];
