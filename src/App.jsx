import { useState } from 'react';
// import { use } from 'react';
import './css/App.css';

function RepositoryGrid({ repository_list }) {
    const reposJSX = repository_list.map((repo) => {
        return <Repository key={repo.title} repository={repo} />;
    });

    return <div className="profile__repositories">{reposJSX}</div>;
}

function Repository({ repository }) {
    return (
        <div className="profile__repository">
            <a className="profile__repository-link" href={repository.url} target="_blank"></a>
            <div className="profile__repository-head-info">
                <h3 className="heading-tertiary profile__repository-title">{repository.title}</h3>
                <p className="profile__repository-description">{repository.description}</p>
            </div>
            <div className="profile__repository-stats">
                {
                    repository.licence_type 
                    && 
                    (<div className="profile__repository-stat">
                            <i className="profile__repository-stat-icon icon-basic-bookmark"></i>
                            <span className="profile__repository-stat-value">
                                {repository.licence_type}
                            </span>
                    </div>)
                }
                <div className="profile__repository-stat">
                    <i className="profile__repository-stat-icon icon-basic-signs"></i>
                    <span className="profile__repository-stat-value">{repository.forks}</span>
                </div>
                <div className="profile__repository-stat">
                    <i className="profile__repository-stat-icon icon-basic-star"></i>
                    <span className="profile__repository-stat-value">{repository.stars}</span>
                </div>
                <div className="profile__repository-stat">
                    <span className="profile__repository-stat-value">
                        Updated {timeAgo(repository.last_modified)}
                    </span>
                </div>
            </div>
        </div>
    );
}

function UserInformation({ user }) {
    return (
        <>
            <div className="profile__info-1">
                <div className="avatar-box margin-top-neg-big">
                    <img className="avatar-box__img" src={user.avatar_url} alt="Profile Picture" />
                </div>
                <div className="profile__stats flex-row">
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
            <div className="profile__info-2 flex-col">
                <h2 className="heading-secondary profile__name">{user.name}</h2>
                <p className="profile__bio">{user.bio}</p>
            </div>
        </>
    );
}

function Profile({ data }) {
    if (data) {
        return (
            <section class="section-profile">
                <div className="profile">
                    <UserInformation user={data.user} />
                    <RepositoryGrid repository_list={data.repos} />
                    <a href="#">View all rpositories</a>
                </div>
            </section>
        );
    }
}

function Header({ onSearch, secClass }) {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <header className="header">
            <div className={'search-box' + secClass}>
                <div className="search-bar">
                    <button className="search-bar__button" onClick={() => onSearch(searchTerm)}>
                        <img
                            className="search-bar__icon"
                            src="./src/assets/magnifying-glass-search-svgrepo-com.svg"
                            alt="search-icon"
                        />
                    </button>
                    <input
                        type="text"
                        placeholder="Search"
                        id="search-input"
                        className="search-bar__input"
                        value={searchTerm}
                        onChange={function (event) {
                            setSearchTerm(event.target.value);
                        }}
                    />
                </div>
                <p className="search-box__sub">Search for an exisitng GitHub user</p>
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
        <>
            <Header
                onSearch={handleSearch}
                secClass={profile !== null ? ' search-box--move-up' : ''}
            />
            <main>
                <Profile data={profile} />
            </main>
        </>
    );
}

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

    const reposJson = await fetch(URL.parse(userJson.repos_url)).then((data) => data.json());
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
