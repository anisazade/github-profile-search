import { Component } from 'react';

export default class ErrorBoundary extends Component {
    state = { error: null };

    static getDerivedStateFromError(error) {
        return { error };
    }

    render() {
        if (this.state.error) {
            const ErrorfallbackCompoenent = this.props.fallback;
            
            return <ErrorfallbackCompoenent error_message={this.state.error.message} />;
        }

        return this.props.children;
    }
}

export function ProfileErrorFallback({ error_message }) {
    return (
        <div className="error-box">
            <p role="alert" >{error_message}</p>
        </div>
    );
}
