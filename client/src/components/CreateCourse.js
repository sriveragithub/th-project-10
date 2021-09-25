import React, { useState } from "react";
import Data from '../Data'

// createCourse functional component using hooks to gather all info needed for submission
const CreateCourse = (props) => {

  const data = new Data()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [estimatedTime, setEstimatedTime] = useState('')
  const [materialsNeeded, setMaterialsNeeded] = useState('')
  const [userId] = useState(props.context.authenticatedUser ? props.context.authenticatedUser.id : null)
  const [errors, setErrors] = useState([])

  // submit function that calls createCourse from our data class constructor
  const submit = async (e) => {
    e.preventDefault()

    const body = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId
    }

    await data.createCourse(body, props.context.authenticatedUser.emailAddress, props.context.hashedPassword)
      .then((errors) => {
        if (errors.length) {
          setErrors(errors);
        } else {
          console.log(`Course "${title}" successfully created`);
          props.history.push("/");
        }
      })
  }

  // cancel button to push user back to home page
  const cancel = () => {
    props.history.push('/')
  }

  // ternary operator checks for any validation errors upon submission
  return (
    <main>
      <div className="wrap">
        <h2>Create Course</h2>
        {
          errors.length
          ? <div className="validation--errors">
              <h3>Validation Errors</h3>
              <ul>
                {
                  errors.map((err, i) => {
                    return <li key={i}>{err}</li>
                  })
                }
              </ul>
            </div>
          : <></>
        }
        <form onSubmit={submit}>
          <div className="main--flex">
            <div>
              <label htmlFor="courseTitle">Course Title</label>
              <input id="courseTitle" name="courseTitle" type="text" onChange={e => {setTitle(e.target.value)}} />

              <p>By {props.context.authenticatedUser.firstName} {props.context.authenticatedUser.lastName}</p>

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
