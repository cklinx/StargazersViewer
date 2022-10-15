import {HttpClient} from '@stargazers/services/http-client';
import {ApiUrls, UrlTemplates} from '@stargazers/services/api/api.constants';
import {
  RepositoriesRawResponse,
  StargazersRawResponse,
  UsersSearchRawResponse,
} from './user-service.types';
import Formatter from '@stargazers/utils/formatter';

export const searchUsers = (query: string) =>
  HttpClient.get<UsersSearchRawResponse>(
    Formatter.injectUrlParam(UrlTemplates.SEARCH_USERS, query),
  );

export const getUserRepositories = (owner: string) =>
  HttpClient.get<RepositoriesRawResponse>(
    Formatter.injectUrlParam(UrlTemplates.GET_USER_REPOSITORIES, owner),
  );

export const getStargazers = (owner: string, repository: string) =>
  HttpClient.get<StargazersRawResponse>(ApiUrls.GET_REPO_STARGAZERS(owner, repository));
