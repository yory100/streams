import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client
                .init({
                    clientId:
                        '249268370345-samqoh8roe44sci49a0rlf4jqto7a1b4.apps.googleusercontent.com',
                    scope: 'email'
                })
                .then(() => {
                    this.auth = window.gapi.auth2.getAuthInstance();
                    this.onAuthChange(this.auth.isSignedIn.get());
                    this.auth.isSignedIn.listen(this.onAuthChange);
                });
        });
    }

    onSignInClick = () => {
        this.auth.signIn();
    };

    onSignOutClick = () => {
        this.auth.signOut();
    };

    onAuthChange = isSignedIn => {
        if (isSignedIn) {
            const id = this.auth.currentUser.get().getId();
            this.props.signIn(id);
        } else {
            this.props.signOut();
        }
    };

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            return (
                <button
                    className='ui red google button'
                    onClick={this.onSignOutClick}
                >
                    <i className='google icon' />
                    Sign Out
                </button>
            );
        } else {
            return (
                <button
                    className='ui blue google button'
                    onClick={this.onSignInClick}
                >
                    <i className='google icon' />
                    Sign In
                </button>
            );
        }
    }

    render() {
        return <div>{this.renderAuthButton()}</div>;
    }
}

const mapStateToProps = state => {
    return { isSignedIn: state.auth.isSignedIn };
};

export default connect(
    mapStateToProps,
    { signIn, signOut }
)(GoogleAuth);
