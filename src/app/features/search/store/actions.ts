import { createAction, props } from '@ngrx/store';
import { GitHubUser } from '../../../models/github-user.model';

export const searchUser = createAction('[Search] Search User', props<{ username: string }>());
export const searchUserSuccess = createAction('[Search] Search User Success', props<{ user: GitHubUser }>());
export const searchUserFailure = createAction('[Search] Search User Failure', props<{ error: string, username: string }>());
export const clearHistoryEntry = createAction('[Search] Clear History Entry', props<{ username: string }>());
