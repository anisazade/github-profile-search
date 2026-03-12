import { useState } from 'react';
import './css/App.css';
import data from './data.json';

function RepositoryGrid({ repository_list }) {
    const reposJSX = repository_list.map((repo) => {
        return <Repository key={repo.title} repository={repo} />;
    });

    return <div className="repo-grid">{reposJSX}</div>;
}

function Repository({ repository }) {
    return (
        <div className="repository">
            <a className="repository__link stack-gap-meduim" href={repository.url} target="_blank">
                <div className="stack-gap-small">
                    <h3 className="repository__title">{repository.title}</h3>
                    <p>{repository.description}</p>
                </div>
                <div className="repository__stats flex-gap-meduim font-size-200">
                    {repository.license && (
                        <div className="repository__stat">
                            <i className="repository__stat-icon icon-basic-bookmark"></i>
                            <span>{repository.license}</span>
                        </div>
                    )}
                    <div className="repository__stat">
                        <i className="repository__stat-icon icon-basic-signs"></i>
                        <span>{repository.forks}</span>
                    </div>
                    <div className="repository__stat">
                        <i className="repository__stat-icon icon-basic-star"></i>
                        <span>{repository.stars}</span>
                    </div>
                    <div className="repository__stat">
                        <span> Updated {timeAgo(repository.last_modified)}</span>
                    </div>
                </div>
            </a>
        </div>
    );
}

function UserInformation({ user }) {
    return (
        <>
            <div className="profile__info-1 flex-gap-big">
                <div className="profile__avatar avatar-box margin-top-neg-big bg-primary">
                    <img className="avatar-box__img" src={user.avatar_url} alt="Profile Picture" />
                </div>
                <div className="profile__stats font-size-300">
                    <div className="profile__stat">
                        <span className="profile__stat-label">Followers</span>
                        <span className="profile__stat-value">{user.followers}</span>
                    </div>
                    <div className="profile__stat">
                        <span className="profile__stat-label">Following</span>
                        <span className="profile__stat-value">{user.following}</span>
                    </div>
                    <div className="profile__stat">
                        <span className="profile__stat-label">Location</span>
                        <span className="profile__stat-value"> {user.location}</span>
                    </div>
                </div>
            </div>
            <div className="stack-gap-small">
                <h2 className="heading-secondary profile__name">{user.name}</h2>
                <p className="profile__bio">{user.bio}</p>
            </div>
        </>
    );
}

function Profile({ data }) {
    if (data) {
        return (
            <section class="section-profile bg-primary">
                <div className="profile flow-centered stack-gap-big">
                    <UserInformation user={data.user} />
                    <RepositoryGrid repository_list={data.repos} />
                    <a class="btn-text flow-centered">View all repositories</a>
                </div>
            </section>
        );
    }
}

function Header({ onSearch, secClass }) {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <header className="header flex-centered">
            <div className={'search font-size-300 ' + secClass}>
                <form action="#" className="search__form stack-gap-small">
                    <div className="search__bar bg-primary flex-plain">
                        <button
                            className="search__button"
                            type="button"
                            onClick={() => onSearch(searchTerm, false)}
                        >
                            <img
                                className="search__icon"
                                src="./src/assets/magnifying-glass-search-svgrepo-com.svg"
                                alt="search-icon"
                            />
                        </button>
                        <input
                            type="text"
                            placeholder="Search"
                            id="search-input"
                            className="search__input"
                            value={searchTerm}
                            onChange={function (event) {
                                setSearchTerm(event.target.value);
                            }}
                        />
                    </div>
                    <label for="search-input" className="search__label">
                        Search for an exisitng GitHub user
                    </label>
                </form>
            </div>
        </header>
    );
}

function App() {
    const [profile, setProfile] = useState(null);
    function handleSearch(username, isOnline) {
        // Offline data
        if(isOnline){
            // Online data
            getProfile(username).then(setProfile);
        }
        else{
            setProfile(data);
        }

    }
    return (
        <>
            <Header onSearch={handleSearch} secClass={profile !== null ? 'move-up-animation' : ''} />
            <main>
                <Profile data={profile} />
            </main>
        </>
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
    };
    const repos = reposJson.map((repo) => {
        return {
            title: repo.name,
            description: repo.description,
            forks: repo.forks_count,
            license: repo.spdxid,
            stars: repo.stargazers_count,
            last_modified: repo.updated_at,
            url: repo.clone_url,
        };
    });
    console.log({ user, repos });
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
