/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaginatedProjectList } from '../models/PaginatedProjectList';
import type { Project } from '../models/Project';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class ProjectsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * @param page A page number within the paginated result set.
     * @param status
     * @returns PaginatedProjectList
     * @throws ApiError
     */
    public projectsList(
        page?: number,
        status?: 'active' | 'completed' | 'draft',
    ): CancelablePromise<PaginatedProjectList> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/projects/',
            query: {
                'page': page,
                'status': status,
            },
        });
    }
    /**
     * @param requestBody
     * @returns Project
     * @throws ApiError
     */
    public projectsCreate(
        requestBody: Project,
    ): CancelablePromise<Project> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/projects/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
