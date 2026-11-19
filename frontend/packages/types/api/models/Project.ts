/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { StatusEnum } from './StatusEnum';
export type Project = {
    readonly id: number;
    name: string;
    description?: string;
    status: StatusEnum;
    readonly created_by: string | null;
    readonly created_at: string;
};
