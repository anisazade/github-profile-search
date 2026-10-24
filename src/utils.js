export async function fetchProfile(username, abortSignal) {
    const userAPI = URL.parse(username, 'https://api.github.com/users/');
    const response = await fetch(userAPI, {
        headers: {
            Accept: 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28',
        },
        signal: abortSignal,
    }).catch(()=> {throw new Error("Request failed")});

    if (!response.ok){
        console.log(response.status);
        if (response.status == 404){
            throw new Error("Couldn't find the user");
        }
        else{
            throw new Error("Couldn't fetch the user");
        }
    }

    const userJson = await (response.json());
    const reposJson = await fetch(userJson.repos_url + '?per_page=4', {
        headers: {
            Accept: 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28',
        },
        signal: abortSignal,
    }).then((data) => data.json());
    const user = {
        name: userJson.name,
        username: userJson.login,
        avatar_url: userJson.avatar_url,
        bio: userJson.bio,
        followers: userJson.followers,
        following: userJson.following,
        location: userJson.location,
        repos_page: 'https://github.com/' + userJson.login + '?tab=repositories',
    };
    const repos = reposJson.map((repo) => {
        return {
            title: repo.name,
            description: repo.description,
            forks: repo.forks_count,
            license: repo.license?.spdx_id,
            stars: repo.stargazers_count,
            last_modified: repo.updated_at,
            url: repo.clone_url,
        };
    });
    return { user, repos };
}

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
