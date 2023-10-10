import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { format, set } from 'date-fns';

import api from '../services/api';
import SessionStore from '../utils/SessionStore';
import constants from '../constants';

import Loading from '../components/Loading';
import Header from '../components/Header';
import TypeIcon from '../components/styled-components/TypeIcon';
import TypeIconWrapper from '../components/styled-components/TypeIconWrapper';
import ErrorMessage, { errorMessageTimeout } from '../components/ErrorMessage';


export default function Task(props) {
  const [errorMessage, setErrorMessage] = useState('');
  const [isBusy, setIsBusy] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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
    setIsBusy(true);

    // data validation
    if (!type) {
      setErrorMessage('The Task type is missing.');
      setTimeout(() => {
        setErrorMessage('');
      }, errorMessageTimeout);
      return;
    }
    if (!title) {
      setErrorMessage('The Task title is missing.');
      setTimeout(() => {
        setErrorMessage('');
      }, errorMessageTimeout);
      return;
    }

    var taskBody = {
      type,
      title,
    };

    if (description) {
      taskBody.description = description;
    }

    if (date) {
      if (hour) {
        taskBody.when = `${date}T${hour}:00.000`;
      } else {
        taskBody.when = `${date}T00:00:00.000`;
      }
    }

    // if id has setted, update
    if (props.match.params.id) {
      await api(token).put(`/task/${props.match.params.id}`, taskBody)
        .then(() => {
          setRedirectHome(true);
        })
        .catch(_ => {
          alert('Error updating task');
        })
        .finally(() => {
          setIsBusy(false);
        });
      // else insert
    } else {
      await api(token).post('/task', taskBody)
        .then(() => {
          setRedirectHome(true);
        })
        .catch(_ => {
          alert('Error inserting task');
        })
        .finally(() => {
          setIsBusy(false);
        });
    }
  }

  async function handleDelete() {
    const confirm = window.confirm('Do you really want to remove the task?');
    if (confirm) {
      await api(token).delete(`/task/${props.match.params.id}`)
        .then(() => {
          setRedirectHome(true);
        })
        .catch(_ => {
          alert('Error deleting task');
        })
        .finally(() => {
          setIsBusy(false);
        });
    }
  }

  function handleClickNotification() {
    setRedirectHome(true);
  }

  useEffect(() => {
    async function loadTask() {
      if (!props.match.params.id) {
        setIsLoading(false);
        return;
      }

      if (!isConnected || !token) {
        return;
      }

      if (!isLoading) {
        return;
      }

      await api(token).get(`/task/${props.match.params.id}`)
        .then(response => {
          setType(response.data.type);
          setTitle(response.data.title);
          setDone(response.data.done);
          setDescription(response.data.description);
          setDate(format(new Date(response.data.when), 'yyyy-MM-dd'));
          setHour(format(new Date(response.data.when), 'HH:mm'));
        })
        .catch(_ => {
          alert('Error loading task');
        })
        .finally(() => {
          setIsLoading(false);
        });
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
        })
        .catch(_ => {
          setRedirectSync(true);
        });
    }

    loadTask();
  }, [props.match.params.id, isConnected, isLoading, token]);

  return (isLoading ?
    <Loading />
    :
    <Container>
      <Loading show={isBusy} opacity={.75} />

      {redirectHome && <Redirect to="/home" />}
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

        <div style={{ display: 'flex' }}>
          <Input style={{ marginRight: 15 }}>
            <span>Date</span>
            <input type="date" onChange={e => setDate(e.target.value)} value={date} />
          </Input>

          <Input>
            <span>Time</span>
            <input type="time" onChange={e => setHour(e.target.value)} value={hour} />
          </Input>
        </div>

        <Options>
          <div>
            <input type="checkbox" onChange={_ => setDone(!done)} checked={done} />
            <span>DONE</span>
          </div>
          {props.match.params.id && <button onClick={handleDelete}>DELETE</button>}
        </Options>

        {errorMessage && <ErrorMessage error={errorMessage} />}

        <Save>
          <button onClick={handleSave}>SAVE</button>
        </Save>

      </Form>

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
