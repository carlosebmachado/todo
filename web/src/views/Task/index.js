import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import * as S from './styles';
import { format } from 'date-fns';

import typeIcons from '../../utils/typeicons'
import api from '../../services/api';
import isConnected from '../../utils/isConnected';

import Header from '../../components/Header';
import Footer from '../../components/Footer';


function Task(props) {
  const [redirectHome, setRedirectHome] = useState(false);
  const [redirectSync, setRedirectSync] = useState(false);
  const [type, setType] = useState('');
  const [done, setDone] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [hour, setHour] = useState('');

  // save task
  async function handleSave() {
    // data validation
    if (!type)
      return alert('The Task type is missing.');
    else if (!title)
      return alert('The Task title is missing.');
    else if (!description)
      return alert('The Task description is missing.');
    else if (!date)
      return alert('The Task date is missing.');
    else if (!hour)
      return alert('The Task hour is missing.');

    // if id has setted, we update
    if (props.match.params.id) {
      await api.put(`/task/${props.match.params.id}`, {
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
      await api.post('/task', {
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
      await api.delete(`/task/${props.match.params.id}`)
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
      setRedirectSync(true);
    }

    loadTask();
  }, [props.match.params.id]);

  return (
    <S.Container>
      {redirectHome && <Redirect to="/" />}
      {redirectSync && <Redirect to="/sync" />}

      <Header clickNotification={handleClickNotification} />

      <S.Form>
        <S.TypeIcons>
          {
            typeIcons.map((icon, index) => (
              index > 0 &&
              <button key={index.toString()} onClick={() => setType(index)}>
                <img src={icon} alt="Task type icon" className={type && type !== index ? 'inactive' : undefined} />
              </button>
            ))
          }
        </S.TypeIcons>

        <S.Input>
          <span>Title</span>
          <input type="text" placeholder="task title..." onChange={e => setTitle(e.target.value)} value={title} />
        </S.Input>

        <S.TextArea>
          <span>Description</span>
          <textarea rows={5} placeholder="task description..." onChange={e => setDescription(e.target.value)} value={description} />
        </S.TextArea>

        <S.Input>
          <span>Date</span>
          <input type="date" placeholder="task date..." onChange={e => setDate(e.target.value)} value={date} />
        </S.Input>

        <S.Input>
          <span>Hour</span>
          <input type="time" placeholder="task date..." onChange={e => setHour(e.target.value)} value={hour} />
        </S.Input>

        <S.Options>
          <div>
            <input type="checkbox" onChange={e => setDone(!done)} checked={done} />
            <span>DONE</span>
          </div>
          {props.match.params.id && <button onClick={handleDelete}>DELETE</button>}
        </S.Options>

        <S.Save>
          <button onClick={handleSave}>SAVE</button>
        </S.Save>

      </S.Form>

      <Footer />

    </S.Container>
  );
}

export default Task;
