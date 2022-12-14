import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import fetchToken from '../components/fetchToken';
import { userLoginAction } from '../redux/actions';
import './login.css';
import logo from '../images/logoLogin.png';
import '../App.css';
import Settings from './Settings';

class Login extends React.Component {
    state = {
      email: '',
      name: '',
      disabled: true,
      settings: false,
    }

    validEmail = (email) => /[a-z0-9.]+@[a-z0-9]+\.[a-z]/.test(email);

    setOnChange = ({ target: { name, value } }) => {
      this.setState({
        [name]: value,
      }, () => {
        const { email, name: validName } = this.state;
        if (this.validEmail(email) && validName.length >= 1) {
          this.setState({ disabled: false });
        } else {
          this.setState({ disabled: true });
        }
      });
    }

    toSettings = () => {
      this.setState({ settings: true });
    }

    closeSettings = () => {
      this.setState({ settings: false });
    }

    setOnclick = async () => {
      const { history, dispatchLogin } = this.props;
      const require = await fetchToken();
      const { token } = require;
      const { name, email } = this.state;
      dispatchLogin({ name, email });
      await localStorage.setItem('token', token);
      history.push('/trivia/game');
    }

    render() {
      const { name, email, disabled, settings } = this.state;
      return (
        <div className="App">
          <header className="App-header">
            <img src={ logo } className="App-logo" alt="logo" />
            <form className="form-login">
              <label className="input-name" htmlFor="name">
                Name:
                <input
                  name="name"
                  value={ name }
                  data-testid="input-player-name"
                  type="text"
                  id="name"
                  onChange={ this.setOnChange }
                />
              </label>
              <label className="input-email" htmlFor="email">
                E-mail:
                <input
                  name="email"
                  value={ email }
                  data-testid="input-gravatar-email"
                  type="email"
                  id="email"
                  onChange={ this.setOnChange }
                />
              </label>
              <div className="buttons">
                <button
                  className="button-play"
                  data-testid="btn-play"
                  type="button"
                  disabled={ disabled }
                  onClick={ this.setOnclick }
                >
                  Play
                </button>
                <button
                  className="button-settings"
                  data-testid="btn-settings"
                  type="button"
                  onClick={ this.toSettings }
                >
                  Settings
                </button>
              </div>
            </form>
            {settings && <Settings
              closeSettings={ this.closeSettings }
            />}
          </header>
        </div>
      );
    }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchLogin: (user) => dispatch(userLoginAction(user)),
});

Login.propTypes = {
  dispatchLogin: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
