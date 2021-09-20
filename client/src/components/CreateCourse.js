import React, { useState } from "react";
import axios from 'axios'

const CreateCourse = (props) => {

  console.log(props)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [estimatedTime, setEstimatedTime] = useState('')
  const [materialsNeeded, setMaterialsNeeded] = useState('')
  const [userId, setUserId] = useState(props.context.authenticatedUser ? props.context.authenticatedUser.id : null)
  const [errors, setErrors] = useState([])

  const submit = async (e) => {
    e.preventDefault()
    console.log(title, description, estimatedTime, materialsNeeded, userId)

    const body = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId
    }

    await axios.post('http://localhost:5000/api/courses',
    body,
    {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      auth: {
        username: props.context.authenticatedUser.emailAddress,
        password: props.context.hashedPassword
      }
    })
      .then((errors) => {
      if (errors.length) {
        console.log(errors);
        setErrors(errors);
      } else {
        console.log(`Course "${title}" successfully created`);
        props.history.push("/");
      }
    })
    .catch((error) => {
      console.log(error);
      props.history.push("/error");
    });

  }

  const cancel = () => {
    props.history.push('/')
  }

  return (
    <main>
      <div className="wrap">
        <h2>Create Course</h2>
        {
          errors.length
          ? <div className="validation--errors">
              <h3>Validation Errors</h3>
              <ul>
                <li>Please provide a value for "Title"</li>
                <li>Please provide a value for "Description"</li>
              </ul>
            </div>
          : <></>
        }
        <form onSubmit={submit}>
          <div className="main--flex">
            <div>
              <label htmlFor="courseTitle">Course Title</label>
              <input id="courseTitle" name="courseTitle" type="text" onChange={e => {setTitle(e.target.value)}} />

              <p>By Joe Smith</p>

              <label htmlFor="courseDescription">Course Description</label>
              <textarea
                id="courseDescription"
                name="courseDescription"
                onChange={e => {setDescription(e.target.value)}}
              ></textarea>
            </div>
            <div>
              <label htmlFor="estimatedTime">Estimated Time</label>
              <input
                id="estimatedTime"
                name="estimatedTime"
                type="text"
                onChange={e => {setEstimatedTime(e.target.value)}}
              />

              <label htmlFor="materialsNeeded">Materials Needed</label>
              <textarea id="materialsNeeded" name="materialsNeeded" onChange={e => {setMaterialsNeeded(e.target.value)}}></textarea>
            </div>
          </div>
          <button className="button" type="submit">
            Create Course
          </button>
          <button
            className="button button-secondary"
            onClick={cancel}
          >
            Cancel
          </button>
        </form>
      </div>
    </main>
  );
};

export default CreateCourse;
