import type { CommonPaginationInformationResponse } from '.';

export interface GoalResponse {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface GoalSimpleResponse {
  id: number;
  title: string;
}

export interface GoalListResponse {
  paginationInformation: CommonPaginationInformationResponse;
  goals: GoalResponse[];
}

export interface GoalListParams {
  cursor?: number;
  size?: number;
  sortOrder?: 'newest' | 'oldest';
  moreKeys?: string[];
}
