import { GitHubUser } from './github-user.model';

export interface SearchEntry {
  username: string;
  userData?: GitHubUser;
  success: boolean;
  timestamp: number;
}

export interface SearchState {
  history: SearchEntry[];
  currentUser?: GitHubUser;
  loading: boolean;
  error?: string;
}
