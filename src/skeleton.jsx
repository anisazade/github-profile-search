export default function ProfileLoadingSkeleton() {
    return (
        <div className="profile stack-500 skeleton flow-centered" role="status">
            <UserInfoSkeleton />
            <RepositorySkeleton />
            <span className="sr-only">Loading GitHub profile...</span>
        </div>
    );
}

function UserInfoSkeleton() {
    return (
        <>
            <div className="flex-500" aria-hidden="true">
                <div className="avatar-box shimmer-animation"></div>
                <div className="flex-400 profile__stats font-size-300">
                    <div className="shimmer-animation stat-box" />
                    <div className="shimmer-animation stat-box" />
                    <div className="shimmer-animation stat-box" />
                </div>
            </div>
            <div className="stack-300" aria-hidden="true">
                <div className="shimmer-animation name-box" />
                <p className="shimmer-animation bio-box font-size-300" />
            </div>
        </>
    );
}

function RepositorySkeleton() {
    return (
        <div className="repos-section">
            <div className="repo-list" aria-hidden="true">
                <div className="repo-box shimmer-animation" />
                <div className="repo-box shimmer-animation" />
                <div className="repo-box shimmer-animation" />
                <div className="repo-box shimmer-animation" />
            </div>
        </div>
    );
}
