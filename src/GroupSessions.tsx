import React from 'react';
import { Container, Header, Button, Form, Grid, Message } from 'semantic-ui-react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const serverUrl = process.env.REACT_APP_SERVER_URL;

interface FormValues {
  name: string;
  description: string;
  date: string;
  price: number;
}

interface GroupSessionsProps {
  onLogout: () => void;
}

function GroupSessions(props: GroupSessionsProps) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await axios.post(`${serverUrl}/api/group-sessions`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
      });

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
       <Header as="h2" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#507a4c', color: '#fff', padding: '1rem' }}>
        Group Sessions
        <Button color="red" style={{ marginTop: '1rem', marginLeft: '1rem' }} onClick={props.onLogout}>
          Sign Out
        </Button>
      </Header>
      <Grid centered>
        <Grid.Column mobile={16} tablet={10} computer={8}>
          <Form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: '2rem' }}>
            <Form.Field>
              <label htmlFor="name">Name</label>
              <input type="text" id="name" required {...register("name", { required: true })} />
              {errors.name && <Message negative>Please provide a name for the group session</Message>}
            </Form.Field>
            <Form.Field>
              <label htmlFor="description">Description</label>
              <textarea id="description" {...register("description", { required: true })} />
            </Form.Field>
            <Form.Field>
              <label htmlFor="date">Date</label>
              <input type="date" id="date" required {...register("date")} />
              {errors.date && <Message negative>Please provide a date for the group session</Message>}
            </Form.Field>
            <Form.Field>
              <label htmlFor="price">Price</label>
              <input type="number" id="price" required {...register("price", { required: true })} />
              {errors.price && <Message negative>Please provide a price for the group session</Message>}
            </Form.Field>
            <Button type="submit" color="green" style={{ marginTop: '1rem' }}>
              Create Group Session
            </Button>
          </Form>
        </Grid.Column>
      </Grid>
    </Container>
  );
}

export default GroupSessions;
