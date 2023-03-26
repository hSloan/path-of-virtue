import React from 'react';
import { Container, Header, Button, Dropdown, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

interface Props {
  role: string;
  onLogout: () => void;
}

function Dashboard(props: Props) {
  return (
    <Container>
      <Header as="h2" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#507a4c', color: '#fff', padding: '1rem' }}>
        <Dropdown icon={<Icon name="bars" size="large" style={{ cursor: 'pointer' }} />} direction="right">
          {props.role === 'Instructor' ? (
          <Dropdown.Menu>
            <Link to="/group-sessions-instructor"><Dropdown.Item text="Group Sessions" /></Link>
            <Link to="/private-lesson-availability"><Dropdown.Item text="Private Lesson Availability" /></Link>
            <Link to="/payment-information"><Dropdown.Item text="Payment Information" /></Link>
          </Dropdown.Menu>
          ) : (
          <Dropdown.Menu>
            <Link to="/group-sessions-student"><Dropdown.Item text="Group Sessions" /></Link>
            <Link to="/private-lessons"><Dropdown.Item text="Private Lessons" /></Link>
            <Link to="/payment-information"><Dropdown.Item text="Payment Information" /></Link>
          </Dropdown.Menu>
          )}
        </Dropdown>
        The Path of Virtue
        <Link to="/" onClick={props.onLogout}>
          <Button color="red" style={{ marginTop: '1rem' }}>
            Sign Out
          </Button>
        </Link>
      </Header>
      {props.role === 'Instructor' ? (
        <p style={{ marginTop: '2rem' }}>You have made it to the instructor dashboard!</p>
      ) : (
        <p style={{ marginTop: '2rem' }}>You have made it to the student dashboard!</p>
      )}
    </Container>
  );
}

export default Dashboard;
