const url = "https://api.github.com/graphql"
const login = "" // GitHub Username
const password = "" // GitHub User's Personal Access Token
const request = (username) => {
        let query = `{
        repositoryOwner(login: "${username}") {
            avatarUrl
            ... on User {
            id
            name
            login
            email
            bio
            websiteUrl
            twitterUsername
            location
            company
            starredRepositories {
                totalCount
            }
            followers {
                totalCount
            }
            following {
                totalCount
            }
            organizations(first: 5) {
                totalCount
                nodes {
                avatarUrl
                name
                url
                description
                location
                }
                edges {
                node {
                    repositories {
                    totalCount
                    }
                }
                }
            }
            repositories(first: 20) {
                totalCount
                nodes {
                primaryLanguage {
                    color
                    name
                }
                description
                forkCount
                nameWithOwner
                stargazerCount
                updatedAt
                url
                name
                isFork
                isPrivate
                }
            }
            }
        }
        }`
    return { query: query }
}

export {
    url,
    login,
    password,
    request
}
        