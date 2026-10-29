import { useState, useRef, use, Suspense } from 'react';
import { timeAgo, fetchProfile, fetchRepos } from './utils';
import ProfileLoadingSkeleton from './skeleton';
import ErrorBoundary, { ProfileErrorFallback } from './ErrorBoundry';

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
            <a
                aria-label={`View ${repository.name} repository on GitHub`}
                className="stretched-link"
                href={repository.url}
                target="_blank"
            ></a>
        </div>
    );
}

function UserInformation({ user }) {
    return (
        <>
            <div className="flex-500">
                <div className="avatar-box shimmer-animation">
                    <img key={user.name} src={user.avatar_url} alt="Profile Picture" />
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
                    {user.location && (
                        <div className="profile__stat">
                            <span className="profile__stat-label">Location</span>
                            <span className="profile__stat-value"> {user.location}</span>
                        </div>
                    )}
                </div>
            </div>
            <div className="stack-300">
                <h2>{user.name}</h2>
                {user.bio && <p>{user.bio}</p>}
            </div>
        </>
    );
}

function Profile({ promise, abortSignal, setPopupError, removeError }) {
    const data = use(promise);
    const [additionalRepos, setNewRepos] = useState([]);
    const [isLoadingNewRepos, setLoading] = useState(false);
    const popupErrorTimeout = useRef(0);

    const reposJSX = data.repos.map((repo) => {
        return <Repository key={repo.title} repository={repo} />;
    });
    const additionalReposJSX = additionalRepos.map((repo) => {
        return <Repository key={repo.title} repository={repo} />;
    });

    const fetched_repos_count = data.repos.length + additionalRepos.length;

    return (
        <div className="profile flow-centered stack-500">
            <UserInformation user={data.user} />
            <div className="repo-grid">
                {reposJSX}
                {additionalReposJSX}
            </div>
            {fetched_repos_count < data.user.repos_count && (
                <div className="flex-centered">
                    {isLoadingNewRepos ? (
                        <svg
                            className="spinner"
                            height="800px"
                            width="800px"
                            version="1.1"
                            id="Layer_1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 330 330"
                            xml:space="preserve"
                        >
                            <g id="XMLID_11_">
                                <path
                                    id="XMLID_12_"
                                    d="M165,232.5c-8.284,0-15,6.716-15,15v60c0,8.284,6.716,15,15,15s15-6.716,15-15v-60
		C180,239.216,173.284,232.5,165,232.5z"
                                />
                                <path
                                    id="XMLID_13_"
                                    d="M165,7.5c-8.284,0-15,6.716-15,15v30c0,8.284,6.716,15,15,15s15-6.716,15-15v-30
		C180,14.216,173.284,7.5,165,7.5z"
                                />
                                <path
                                    id="XMLID_14_"
                                    d="M90,157.5c0-8.284-6.716-15-15-15H15c-8.284,0-15,6.716-15,15s6.716,15,15,15h60
		C83.284,172.5,90,165.784,90,157.5z"
                                />
                                <path
                                    id="XMLID_15_"
                                    d="M315,142.5h-60c-8.284,0-15,6.716-15,15s6.716,15,15,15h60c8.284,0,15-6.716,15-15S323.284,142.5,315,142.5
		z"
                                />
                                <path
                                    id="XMLID_16_"
                                    d="M90.752,210.533L48.327,252.96c-5.857,5.858-5.857,15.355,0,21.213c2.929,2.929,6.768,4.393,10.607,4.393
		s7.678-1.464,10.607-4.393l42.426-42.427c5.857-5.858,5.857-15.355-0.001-21.213C106.108,204.675,96.611,204.675,90.752,210.533z"
                                />
                                <path
                                    id="XMLID_17_"
                                    d="M228.639,108.86c3.839,0,7.678-1.464,10.606-4.394l42.426-42.427c5.858-5.858,5.858-15.355,0-21.213
		c-5.857-5.857-15.355-5.858-21.213,0l-42.426,42.427c-5.858,5.858-5.858,15.355,0,21.213
		C220.961,107.396,224.8,108.86,228.639,108.86z"
                                />
                                <path
                                    id="XMLID_18_"
                                    d="M239.245,210.533c-5.856-5.857-15.355-5.858-21.213-0.001c-5.858,5.858-5.858,15.355,0,21.213
		l42.426,42.427c2.929,2.929,6.768,4.393,10.607,4.393c3.838,0,7.678-1.465,10.606-4.393c5.858-5.858,5.858-15.355,0-21.213
		L239.245,210.533z"
                                />
                            </g>
                        </svg>
                    ) : (
                        <button
                            onClick={async function () {
                                setLoading(true);
                                try {
                                    const newRepos = await fetchRepos(
                                        data.user.repos_url,
                                        fetched_repos_count / 4 + 1,
                                        abortSignal,
                                    );
                                    setNewRepos([...additionalRepos, ...newRepos]);
                                } catch (error) {
                                    setPopupError(error);
                                    clearTimeout(popupErrorTimeout.current);
                                    popupErrorTimeout.current = setTimeout(
                                        () => removeError(),
                                        4000,
                                    );
                                }
                                setLoading(false);
                            }}
                        >
                            Show more
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

function Search({ onSearch, isProfileActive }) {
    const [searchTerm, setSearchTerm] = useState('');
    return (
        <search className={'flex-centered ' + (isProfileActive ? 'is-profile-active' : '')}>
            <div>
                <div className="logo-box">
                    <svg
                        viewBox="0 0 98 96"
                        className="icon"
                        width="98"
                        height="96"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            fill="#7a74ff"
                            d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
                        />
                    </svg>
                    <h1>GitHub profile Search</h1>
                </div>
                <form
                    className="stack-300 font-size-300"
                    onSubmit={(event) => {
                        event.preventDefault();
                        searchTerm && onSearch(searchTerm);
                    }}
                >
                    <div className="search-bar">
                        <input
                            type="search"
                            placeholder="Search"
                            id="search-input"
                            value={searchTerm}
                            onChange={function (event) {
                                setSearchTerm(event.target.value);
                            }}
                        />
                        <button>
                            <svg
                                className="svg-icon svg-icon--magnifying-glass"
                                viewBox="0 0 511.986 511.986"
                            >
                                <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                                <g
                                    id="SVGRepo_tracerCarrier"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <g id="SVGRepo_iconCarrier">
                                    {' '}
                                    <g>
                                        {' '}
                                        <g>
                                            {' '}
                                            <path d="M209.297,5.229C93.887,5.229,0,99.121,0,214.526C0,329.93,93.887,423.822,209.297,423.822 c115.409,0,209.297-93.892,209.297-209.297C418.593,99.121,324.706,5.229,209.297,5.229z M209.297,402.893 c-103.862,0-188.367-84.5-188.367-188.367c0-103.866,84.505-188.367,188.367-188.367c103.861,0,188.367,84.501,188.367,188.367 C397.664,318.392,313.158,402.893,209.297,402.893z" />{' '}
                                        </g>{' '}
                                    </g>{' '}
                                    <g>
                                        {' '}
                                        <g>
                                            {' '}
                                            <rect
                                                x="431.726"
                                                y="348.717"
                                                transform="matrix(0.7071 -0.7071 0.7071 0.7071 -179.4635 440.6595)"
                                                width="20.927"
                                                height="176.488"
                                            />{' '}
                                        </g>{' '}
                                    </g>{' '}
                                </g>
                            </svg>
                        </button>
                    </div>
                    <label htmlFor="search-input" className="flex-centered">
                        Search for an exisiting GitHub user
                    </label>
                </form>
            </div>
        </search>
    );
}

function App() {
    const [profile_promise, setPromise] = useState(null);
    const [request_id, setID] = useState(0);
    const [popupError, setError] = useState(null);
    const abortController = useRef(new AbortController());

    function handleSearch(username) {
        setID((count) => count + 1);
        abortController.current.abort();
        abortController.current = new AbortController();
        setPromise(fetchProfile(username, abortController.current.signal));
    }

    function setPopupError(error) {
        setError(error);
    }

    function removeError() {
        setError(null);
    }

    return (
        <main>
            <p className={`popup-error ${!popupError ? "isHidden" :""}`} role='alert' >{popupError ? popupError.message : ""}</p>
            <Search onSearch={handleSearch} isProfileActive={!!profile_promise} />
            <section className={`profile-section bg-primary ${profile_promise ? 'active' : ''}`}>
                {profile_promise && (
                    <ErrorBoundary key={request_id} fallback={ProfileErrorFallback}>
                        <Suspense fallback={<ProfileLoadingSkeleton />}>
                            <Profile
                                promise={profile_promise}
                                abortSignal={abortController.current.signal}
                                setPopupError={setPopupError}
                                removeError={removeError}
                            />
                        </Suspense>
                    </ErrorBoundary>
                )}
            </section>
        </main>
    );
}

export default App;
