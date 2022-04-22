/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BaseUser } from './BaseUser';

export type CreateUser = (BaseUser & {
password: string,
});