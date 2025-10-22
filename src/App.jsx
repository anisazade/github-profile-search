// import { useState } from 'react';
// import { use } from 'react';
import './App.css';

function SerachBar() {
    return (
        <>
            <button id="search-button">search</button>
            <input type="Search repo, or a GitHub profile" id="search-input" />
        </>
    );
}

function UserInformation({
    username,
    profile_picture_url,
    bio,
    follower_count,
    following_count,
    location,
}) {
    return (
        <div>
            <div>
                <h2>{username}</h2>
                <p>{bio}</p>
            </div>
            <div>
                <img src={profile_picture_url} alt="Profile Picture" />
                <p>Followers {follower_count}</p>
                <p>Following {following_count}</p>
                <p>Location {location}</p>
            </div>
        </div>
    );
}

function RepositoryGrid({ repository_list }) {
    const reposJSX = repository_list.map((repo) => {
        return <Repository key={repo.id} repository={repo} />;
    });

    return <div id="repository_grid">{reposJSX}</div>;
}

function Repository({ repository }) {
    return (
        <div>
            <a href={repository.URL}>repo link</a>
            <div>
                <p>{repository.title}</p>
                <p>{repository.description}</p>
            </div>
            <div>
                <p>{repository.licence_type}</p>
                <p>{repository.forks}</p>
                <p>{repository.stars}</p>
                <p>{repository.latest_update}</p>
            </div>
        </div>
    );
}

function Header() {
    return (
        <div>
            <SerachBar />
        </div>
    );
}

function Profile({ data }) {
    return (
        <div id="profile-container">
            <UserInformation
                username={data.username}
                profile_picture_url={data.profilePicture}
                bio={data.bio}
                follower_count={data.followers}
                following_count={data.followings}
                location={data.location}
            />
            <RepositoryGrid repository_list={data.repos} />
            <a href="">View all rpositories</a>
        </div>
    );
}

function App() {
    return (
        <>
            <Header />
            <Profile data={Data} />
        </>
    );
}

const Data = {
    username: 'GitHuB',
    bio: 'How people build software.',
    followers: 27839,
    followings: 0,
    location: 'San Francisco, CA',
    repos: [
        {
            title: '.github',
            description: 'Community Health Files for the @GitHub organization',
            licence_type: null,
            forks: 2369,
            stars: 703,
            latest_update: '4 days ago',
            URL: ""
        },
    ],
};

export default App;
