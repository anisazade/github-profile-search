import { useState } from 'react';
// import { use } from 'react';
import './App.css';

function UserInformation({ user }) {
    return (
        <div>
            <div>
                <h2>{user.username}</h2>
                <p>{user.bio}</p>
            </div>
            <div>
                <img src={user.avatar_url} alt="Profile Picture" />
                <p>Followers {user.followers}</p>
                <p>Following {user.following}</p>
                <p>Location {user.location}</p>
            </div>
        </div>
    );
}

function RepositoryGrid({ repository_list }) {
    const reposJSX = repository_list.map((repo) => {
        return <Repository key={repo.title} repository={repo} />;
    });

    return <div id="repository_grid">{reposJSX}</div>;
}

function Repository({ repository }) {
    return (
        <div>
            <a href={repository.url}>repo link</a>
            <div>
                <p>{repository.title}</p>
                <p>{repository.description}</p>
            </div>
            <div>
                <p>{repository.licence_type}</p>
                <p>{repository.forks}</p>
                <p>{repository.stars}</p>
                <p>{repository.last_modified}</p>
            </div>
        </div>
    );
}

function Header({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div>
            <button id="search-button" onClick={() => onSearch(searchTerm)}>
                search
            </button>
            <input
                type="text"
                placeholder="Search a GitHub profile"
                id="search-input"
                value={searchTerm}
                onChange={function (event) {
                    setSearchTerm(event.target.value);
                }}
            />
        </div>
    );
}

function Profile({ data }) {
    if (data) {
        return (
            <div id="profile-container">
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
            <Header onSearch={handleSearch} />
            <Profile data={profile} />
            {!profile && (
                <div>
                    <p>Search for an exisitng GitHub user</p>
                </div>
            )}
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
