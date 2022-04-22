/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BaseUser } from './BaseUser';

export type UserModel = (BaseUser & {
passwordHash: string,
id: number,
tokenCounter: number,
});