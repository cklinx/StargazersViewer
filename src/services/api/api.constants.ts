export const UrlTemplates = {
  SEARCH_USERS: '/search/users?q={query}',
  GET_USER_REPOSITORIES: '/users/{owner}/repos',
};

export const ApiUrls = {
  GET_REPO_STARGAZERS: (owner: string, repository: string) => {
    return `repos/${owner}/${repository}/stargazers`;
  },
};
