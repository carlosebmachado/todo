import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { format } from 'date-fns';

// import typeIcons from '../utils/typeicons'
import api from '../services/api';
import SessionStore from '../utils/SessionStore';

import Header from '../components/Header';
// import Footer from '../components/Footer';
import TypeIcon from '../components/styled-components/TypeIcon';
import TypeIconWrapper from '../components/styled-components/TypeIconWrapper';
import constants from '../constants';

export default function Task(props) {
  const [token, setToken] = useState('');
  const [redirectHome, setRedirectHome] = useState(false);
  const [redirectSync, setRedirectSync] = useState(false);
  const [type, setType] = useState('');
  const [done, setDone] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [hour, setHour] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  // save task
  async function handleSave() {
    // data validation
    if (!type)
      return alert('The Task type is missing');
    else if (!title)
      return alert('The Task title is missing');
    else if (!description)
      return alert('The Task description is missing');
    else if (!date)
      return alert('The Task date is missing');
    else if (!hour)
      return alert('The Task hour is missing');

    // if id has setted, we update
    if (props.match.params.id) {
      await api(token).put(`/task/${props.match.params.id}`, {
        macaddress: isConnected,
        done,
        type,
        title,
        description,
        when: `${date}T${hour}:00.000`
      })
        .then(() => {
          setRedirectHome(true);
        })
        .catch(error => {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log('Error', error.message);
          }
          console.log(error.config);
        });
      // else insert
    } else {
      await api(token).post('/task', {
        macaddress: isConnected,
        type,
        title,
        description,
        when: `${date}T${hour}:00.000`
      })
        .then(() => {
          setRedirectHome(true);
        })
        .catch(error => {
          alert(error);
        })
        .catch(error => {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log('Error', error.message);
          }
          console.log(error.config);
        });
    }
  }

  async function handleDelete() {
    const res = window.confirm('Do you really want to remove the task?');
    if (res === true) {
      await api(token).delete(`/task/${props.match.params.id}`)
        .then(() => {
          setRedirectHome(true);
        })
        .catch(error => {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log('Error', error.message);
          }
          console.log(error.config);
        });
    }
  }

  function handleClickNotification() {
    setRedirectHome(true);
  }

  // trigger loadTasks based on filterActivated
  useEffect(() => {

    async function loadTask() {
      if (props.match.params.id) {
        await api.get(`/task/${props.match.params.id}`)
          .then(response => {
            setType(response.data.type);
            setTitle(response.data.title);
            setDone(response.data.done);
            setDescription(response.data.description);
            setDate(format(new Date(response.data.when), 'yyyy-MM-dd'));
            setHour(format(new Date(response.data.when), 'HH:mm'));
          })
          .catch(error => {
            if (error.response) {
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              console.log(error.request);
            } else {
              console.log('Error', error.message);
            }
            console.log(error.config);
          });
      }
    }

    if (!isConnected) {
      SessionStore.getData()
        .then(response => {
          if (!response.token) {
            setRedirectSync(true);
            return;
          }
          setIsConnected(true);
          setToken(response.token);
        });
    }

    loadTask();
  }, [props.match.params.id, isConnected]);

  return (
    <Container>
      {redirectHome && <Redirect to="/" />}
      {redirectSync && <Redirect to="/sync" />}

      <Header clickNotification={handleClickNotification} />

      <Form>
        <TypeIcons>
          {
            Array.from(Array(9).keys()).map((i) => (
              i > 1 &&
              <button key={(i).toString()} onClick={() => setType(i)}>
                <TypeIconWrapper active={i === type} style={{ padding: 8 }}>
                  <TypeIcon size={25} type={i} />
                </TypeIconWrapper>
              </button>
            ))
          }
        </TypeIcons>

        <Input>
          <span>Title</span>
          <input type="text" placeholder="task title..." onChange={e => setTitle(e.target.value)} value={title} />
        </Input>

        <TextArea>
          <span>Description</span>
          <textarea rows={5} placeholder="task description..." onChange={e => setDescription(e.target.value)} value={description} />
        </TextArea>

        <Input>
          <span>Date</span>
          <input type="date" placeholder="task date..." onChange={e => setDate(e.target.value)} value={date} />
        </Input>

        <Input>
          <span>Hour</span>
          <input type="time" placeholder="task date..." onChange={e => setHour(e.target.value)} value={hour} />
        </Input>

        <Options>
          <div>
            <input type="checkbox" onChange={e => setDone(!done)} checked={done} />
            <span>DONE</span>
          </div>
          {props.match.params.id && <button onClick={handleDelete}>DELETE</button>}
        </Options>

        <Save>
          <button onClick={handleSave}>SAVE</button>
        </Save>

      </Form>

      {/* <Footer /> */}

    </Container>
  );
}

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  /* overflow: auto; */
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${constants.colors.light100};
`;

export const Form = styled.div`
  width: 50%;
  margin-bottom: 70px;
`

export const TypeIcons = styled.div`
  width: 80%;
  margin: 20px auto;
  display: flex;
  justify-content: center;
  align-items: center;

  .inactive {
    opacity: 0.5;
  }

  button {
    margin: 0 10px;
    background: none;
    border: none;
    cursor: pointer;
  }

`

export const Input = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 20px 0;

  span {
    color: #707070;
    margin-bottom: 5px;
  }

  input {
    font-size: 1.2rem;
    padding: 10px;
    border: none;
    color: #414141;
    border-bottom: 1px solid ${constants.colors.primary};
    border-radius: 8px;

    &:focus {
      outline: none;
      border-bottom: 2px solid ${constants.colors.primary};
    }
  }

`

export const TextArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 20px 0;

  span {
    color: #707070;
    margin-bottom: 5px;
  }
  
  textarea {
    font-size: 1.2rem;
    padding: 10px;
    border: 1px solid ${constants.colors.primary};
    border-radius: 8px;
    resize: vertical;
    /* font-family: sans-serif; */

    &:focus {
      outline: none;
      border: 2px solid ${constants.colors.primary};
    }

    &::-webkit-resizer {
      color: ${constants.colors.primary};
    }
  }
`

export const Options = styled.div`
  display: flex;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${constants.colors.primary};
    text-transform: uppercase;
    font-weight: bold;
    font-size: 1.1rem;

    span {
      margin-left: 5px;
    }
  }

  button {
    font-weight: bolder;
    font-size: 1.1rem;
    color: #344955;
    border: none;
    background: none;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      opacity: 0.75;
    }
  }
`

export const Save = styled.div`
  width: 100%;
  margin-top: 30px;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.75;
  }

  button {
    width: 100%;
    background-color: ${constants.colors.primary};
    border: none;
    color: white;
    font-weight: bold;
    font-size: 1.1rem;
    border-radius: 20px;
    padding: 8px 0 6px 0;
    cursor: pointer;
  }
`
