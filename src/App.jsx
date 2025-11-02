import { useState } from 'react';
// import { use } from 'react';
import './App.css';

function UserInformation({ user }) {
    return (
        <div className="profile__info">
            <div className="profile__head-info">
                <div className="profile__avatar-box">
                    <img
                        className="profile__avatar-img"
                        src={user.avatar_url}
                        alt="Profile Picture"
                    />
                </div>
                <div className="profile__stats">
                    <div className="profile__stat profile__stat--followers">
                        <span className="profile__stat-label">Followers </span>
                        <span className="profile__stat-value">{user.followers}</span>
                    </div>
                    <div className="profile__stat profile__stat--following">
                        <span className="profile__stat-label">Following </span>
                        <span className="profile__stat-value">{user.following}</span>
                    </div>
                    <div className="profile__stat profile__stat--loaction">
                        <span className="profile__stat-label">Location </span>
                        <span className="profile__stat-value"> {user.location}</span>
                    </div>
                </div>
            </div>
            <div className="profile__sub-info">
                <h1 className="profile__name">{user.name}</h1>
                <p className="profile__bio">{user.bio}</p>
            </div>
        </div>
    );
}

function RepositoryGrid({ repository_list }) {
    const reposJSX = repository_list.map((repo) => {
        return <Repository key={repo.title} repository={repo} />;
    });

    return <div className="profile__repositories">{reposJSX}</div>;
}

function Repository({ repository }) {
    return (
        <div className="profile__repository">
            <a className="profile__repository-link" href={repository.url}>
                repo link
            </a>
            <div className="profile__repository-head-info">
                <h2 className="profile__repository-title">{repository.title}</h2>
                <p className="profile__repository-description">{repository.description}</p>
            </div>
            <div className="profile__repository-stats">
                <div className="profile__repository-stat profile__repository-stat--licence">
                    <img className="profile__repository-stat-icon" src="" alt="licence" />
                    <span className="profile__repository-stat-value">
                        {repository.licence_type}
                    </span>
                </div>
                <div className="profile__repository-stat profile__repository-stat--fork">
                    <img className="profile__repository-stat-icon" src="" alt="fork" />
                    <span className="profile__repository-stat-value">{repository.forks}</span>
                </div>
                <div className="profile__repository-stat profile__repository-stat-stars">
                    <img className="profile__repository-stat-icon" src="" alt="stars" />
                    <span className="profile__repository-stat-value">{repository.stars}</span>
                </div>
                <div className="profile__repository-stat profile__repository-stat--last-update">
                    <img className="profile__repository-stat-icon" src="" alt="last-update" />
                    <span className="profile__repository-stat-value">
                        {repository.last_modified}
                    </span>
                </div>
            </div>
        </div>
    );
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
                        class="search-bar__input"
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

function Profile({ data }) {
    if (data) {
        return (
            <div class="profile">
                <UserInformation user={data.user} />
                <RepositoryGrid repository_list={data.repos} />
                <a href="">View all rpositories</a>
            </div>
        );
    }
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
            <Profile data={profile} />
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

export default App;
