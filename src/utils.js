// ------------ Data Fetch -------------
export async function fetchProfile(username, abortSignal) {
    const userAPI = URL.parse(username, 'https://api.github.com/users/');
    const response = await fetch(userAPI, {
        headers: {
            Accept: 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28',
        },
        signal: abortSignal,
    }).catch(requestFailure);

    if (!response.ok) {
        if (response.status == 404) {
            throw new Error("Couldn't find this profile. Please check the username and try again.");
        } else {
            throw new Error("There was a problem fetching this profile.");
        }
    }

    const userJson = await response.json().catch(jsonParsingFailure);
    const user = {
        name: userJson.name,
        username: userJson.login,
        avatar_url: userJson.avatar_url,
        bio: userJson.bio,
        followers: userJson.followers,
        following: userJson.following,
        location: userJson.location,
        repos_page: 'https://github.com/' + userJson.login + '?tab=repositories',
        repos_count: userJson.public_repos,
        repos_url: userJson.repos_url,
    };

    const repos = await fetchRepos(user.repos_url, 1, abortSignal);

    return { user, repos };
}

export async function fetchRepos(repos_url, pageNumber, abortSignal) {
    const reposResponse = await fetch(repos_url + `?per_page=4&page=${pageNumber}`, {
        headers: {
            Accept: 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28',
        },
        signal: abortSignal,
    }).catch(requestFailure);

    if (!reposResponse.ok) {
        if (reposResponse.status == 404) {
            throw new Error("Couldn't find the repositories. Please check the username and try again.");
        } else {
            throw new Error("There was a problem fetching the Repositories.");
        }
    }
    const reposJson =  await reposResponse.json().catch(jsonParsingFailure);
    return  reposJson.map((repo) => {
        return {
            title: repo.name,
            description: repo.description,
            forks: repo.forks_count,
            license: repo.license?.spdx_id,
            stars: repo.stargazers_count,
            last_modified: repo.updated_at,
            url: repo.html_url,
        };
    });

}

function jsonParsingFailure() {
    throw new Error("Couldn't process the profile data.");
}

function requestFailure(error) {
    if (error.name === 'AbortError') {
        throw new Error('The request was aborted due to the new search request');
    } else {
        throw new Error(
            "Couldn't connect to GitHub. Check your internet connection and try again.",
        );
    }
}

// ------------ DATA FORMATING --------------
export function timeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();

    // Get components
    const yearDiff = now.getFullYear() - date.getFullYear();
    const monthDiff = now.getMonth() - date.getMonth();
    const dayDiff = now.getDate() - date.getDate();
    const hourDiff = now.getHours() - date.getHours();

    // Same year
    if (yearDiff === 0) {
        // Same year & same month
        if (monthDiff === 0) {
            // Same day
            if (dayDiff === 0) {
                // Same hour
                if (hourDiff === 0) return 'just now';

                return `${hourDiff} hour${Math.abs(hourDiff) > 1 ? 's' : ''} ago`;
            }
            return `${dayDiff} day${Math.abs(dayDiff) > 1 ? 's' : ''} ago`;
        }

        return `${monthDiff} month${Math.abs(monthDiff) > 1 ? 's' : ''} ago`;
    }

    return `${yearDiff} year${Math.abs(yearDiff) > 1 ? 's' : ''} ago`;
}
