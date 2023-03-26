import React from 'react';
import { Container, Header } from 'semantic-ui-react';

interface Props {
  role: string;
  // onLogout: () => void;
}

function Dashboard(props: Props) {
  return (
    <Container>
      <Header as="h2" textAlign="center" style={{ backgroundColor: '#507a4c', color: '#fff', padding: '1rem' }}>
        The Path of Virtue
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
