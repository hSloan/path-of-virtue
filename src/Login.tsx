import React, { useState } from 'react';
import { Button, Card, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import axios from 'axios';

const serverUrl = process.env.REACT_APP_SERVER_URL;

interface LoginProps {
  onLogin: (role: string) => void;
}

function Login(props: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (isLoginMode) {
        // Log in request
        const response = await axios.post(`${serverUrl}/api/auth`, { username, password });
        const { token, role} = response.data;
        localStorage.setItem('authToken', token);
        props.onLogin(role);
      } else {
        // Register request
        await axios.post(`${serverUrl}/api/register`, { username, password });
        const response = await axios.post(`${serverUrl}/api/auth`, { username, password });
        const { token, role} = response.data;
        localStorage.setItem('authToken', token);
        props.onLogin(role);
      }
    } catch (error) {
      // Show error message on failure
      setErrorMessage('Invalid username or password');
    }
  };

  return (
    <div className="ui container mt-5" style={{ backgroundColor: '#e5dbc5' }}>
      <Grid centered>
        <Grid.Column mobile={16} tablet={8} computer={6}>
          <Card fluid>
            <Header as="h2" textAlign="center" style={{ backgroundColor: '#507a4c', color: '#fff', padding: '1rem' }}>
              The Path of Virtue
            </Header>
            <Card.Content>
              {errorMessage && <Message negative>{errorMessage}</Message>}
              <Form onSubmit={handleSubmit}>
                <Segment stacked>
                  <Form.Field>
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      id="username"
                      autoComplete="username"
                      required
                      value={username}
                      onChange={(event) => setUsername(event.target.value)}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                    />
                  </Form.Field>
                  <Button type="submit" fluid color="green" style={{ marginTop: '1rem' }}>
                    {isLoginMode ? 'Log in' : 'Sign up'}
                  </Button>
                </Segment>
              </Form>
              <Message>
                {isLoginMode ? 'New to us? ' : 'Already have an account? '}
                <a href="#" onClick={() => setIsLoginMode(!isLoginMode)}>
                  {isLoginMode ? 'Sign up' : 'Log in'}
                </a>
              </Message>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
    </div>
  );
}

export default Login;
