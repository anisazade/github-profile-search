import { useState } from 'react';

function Repository({ repository }) {
    return (
        <div className="repository stack-400">
            <div className="stack-300">
                <h3>{repository.title}</h3>
                <p>{repository.description}</p>
            </div>
            <div className="flex-400 font-size-200">
                {repository.license && (
                    <div className="flex-200">
                        <svg className="svg-icon svg-icon--law" viewBox="0 0 16 16">
                            <path d="M8.75.75V2h.985c.304 0 .603.08.867.231l1.29.736c.038.022.08.033.124.033h2.234a.75.75 0 0 1 0 1.5h-.427l2.111 4.692a.75.75 0 0 1-.154.838l-.53-.53.529.531-.001.002-.002.002-.006.006-.006.005-.01.01-.045.04c-.21.176-.441.327-.686.45C14.556 10.78 13.88 11 13 11a4.498 4.498 0 0 1-2.023-.454 3.544 3.544 0 0 1-.686-.45l-.045-.04-.016-.015-.006-.006-.004-.004v-.001a.75.75 0 0 1-.154-.838L12.178 4.5h-.162c-.305 0-.604-.079-.868-.231l-1.29-.736a.245.245 0 0 0-.124-.033H8.75V13h2.5a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1 0-1.5h2.5V3.5h-.984a.245.245 0 0 0-.124.033l-1.289.737c-.265.15-.564.23-.869.23h-.162l2.112 4.692a.75.75 0 0 1-.154.838l-.53-.53.529.531-.001.002-.002.002-.006.006-.016.015-.045.04c-.21.176-.441.327-.686.45C4.556 10.78 3.88 11 3 11a4.498 4.498 0 0 1-2.023-.454 3.544 3.544 0 0 1-.686-.45l-.045-.04-.016-.015-.006-.006-.004-.004v-.001a.75.75 0 0 1-.154-.838L2.178 4.5H1.75a.75.75 0 0 1 0-1.5h2.234a.249.249 0 0 0 .125-.033l1.288-.737c.265-.15.564-.23.869-.23h.984V.75a.75.75 0 0 1 1.5 0Zm2.945 8.477c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L13 6.327Zm-10 0c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L3 6.327Z"></path>
                        </svg>
                        <span>{repository.license}</span>
                    </div>
                )}
                <div className="flex-200">
                    <svg className="svg-icon svg-icon--fork" viewBox="0 0 16 16">
                        <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"></path>
                    </svg>
                    <span>{repository.forks}</span>
                </div>
                <div className="flex-200">
                    <svg className="svg-icon svg-icon-star" viewBox="0 0 16 16">
                        <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z"></path>
                    </svg>
                    <span>{repository.stars}</span>
                </div>
                <div>
                    <span> Updated {timeAgo(repository.last_modified)}</span>
                </div>
            </div>
            <a className="stretched-link" href={repository.url} target="_blank"></a>
        </div>
    );
}

function UserInformation({ user }) {
    return (
        <>
            <div className="flex-500">
                <div className="avatar-box bg-primary">
                    <img src={user.avatar_url} alt="Profile Picture" />
                </div>
                <div className="profile__stats font-size-300">
                    <div>
                        <span className="profile__stat-label">Followers</span>
                        <span className="profile__stat-value">{user.followers}</span>
                    </div>
                    <div>
                        <span className="profile__stat-label">Following</span>
                        <span className="profile__stat-value">{user.following}</span>
                    </div>
                    {user.location && (
                        <div>
                            <span className="profile__stat-label">Location</span>
                            <span className="profile__stat-value"> {user.location}</span>
                        </div>
                    )}
                </div>
            </div>
            <div className="stack-300">
                <h2>{user.name}</h2>
                { user.bio && <p>{user.bio}</p>}
            </div>
        </>
    );
}

function Profile({ data }) {
    if (data) {
        const reposJSX = data.repos.map((repo) => {
            return <Repository key={repo.title} repository={repo} />;
        });

        return (
            <section className="section-profile bg-primary active">
                <div className="profile flow-centered stack-500">
                    <UserInformation user={data.user} />
                    <div className="repo-grid">{reposJSX}</div>
                    <a className="flex-centered" href={data.user.repos_page} target="_blank">
                        View all repositories
                    </a>
                </div>
            </section>
        );
    }
}

function Header({ onSearch, isProfileActive }) {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <header className={'flex-centered ' + (isProfileActive ? 'is-profile-active' : '')}>
            <div className="search-box font-size-300">
                <form action="#" className="stack-300">
                    <div className="search-bar bg-primary">
                        <button type="button" onClick={() => onSearch(searchTerm, true)}>
                            <svg className="svg-icon svg-icon--magnifying-glass" viewBox="0 0 511.986 511.986">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"/>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
                                <g id="SVGRepo_iconCarrier"> <g> <g> <path d="M209.297,5.229C93.887,5.229,0,99.121,0,214.526C0,329.93,93.887,423.822,209.297,423.822 c115.409,0,209.297-93.892,209.297-209.297C418.593,99.121,324.706,5.229,209.297,5.229z M209.297,402.893 c-103.862,0-188.367-84.5-188.367-188.367c0-103.866,84.505-188.367,188.367-188.367c103.861,0,188.367,84.501,188.367,188.367 C397.664,318.392,313.158,402.893,209.297,402.893z"/> </g> </g> <g> <g> <rect x="431.726" y="348.717" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -179.4635 440.6595)" width="20.927" height="176.488"/> </g> </g> </g>
                            </svg>
                        </button>
                        <input
                            type="text"
                            placeholder="Search"
                            id="search-input"
                            value={searchTerm}
                            onChange={function (event) {
                                setSearchTerm(event.target.value);
                            }}
                        />
                    </div>
                    <label htmlFor="search-input" className="flex-centered">
                        Search for an exisitng GitHub user
                    </label>
                </form>
            </div>
        </header>
    );
}

function App() {
    const [profile, setProfile] = useState(null);
    function handleSearch(username) {
        getProfile(username).then(setProfile);
    }
    return (
        <div className="bg-fixed">
            <Header onSearch={handleSearch} isProfileActive={profile ? true : false} />
            <main>
                <Profile data={profile} />
            </main>
        </div>
    );
}

// Util funcitons
async function getProfile(username) {
    const userAPI = URL.parse(username, 'https://api.github.com/users/');
    const userJson = await fetch(userAPI, {
        headers: {
            Accept: 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28',
        },
    })
        .then((response) => (response.ok ? response.json() : null))
        .catch(console.error);

    if (!userJson) return null;

    const reposJson = await fetch(userJson.repos_url + '?per_page=4', {
        headers: {
            Accept: 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28',
        },
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

function timeAgo(dateString) {
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

export default App;
