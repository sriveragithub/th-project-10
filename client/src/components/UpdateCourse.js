import React, { useState, useEffect } from "react";
import axios from 'axios'

const UpdateCourse = (props) => {

  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [title, setTitle] = useState(data.title)
  const [description, setDescription] = useState(data.description)
  const [estimatedTime, setEstimatedTime] = useState(data.estimatedTime)
  const [materialsNeeded, setMaterialsNeeded] = useState(data.materialsNeeded)
  const [userId, setUserId] = useState(props.context.authenticatedUser ? props.context.authenticatedUser.id : null)
  const [errors, setErrors] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:5000/api/courses/${props.match.params.id}`)
      .then(res => {
        setData(res.data)
        setTitle(res.data.title)
        setDescription(res.data.description)
        setEstimatedTime(res.data.estimatedTime)
        setMaterialsNeeded(res.data.materialsNeeded)
        console.log(res.data)
      })
      .catch(err => console.log('Error fetching and parsing data', err))
      .finally(() => setIsLoading(false))
  }, [props.match.params.id])

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

    await axios.put(`http://localhost:5000/api/courses/${props.match.params.id}`,
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
        console.log(`Course "${title}" successfully updated!`);
        props.history.push("/");
      }
      })
      .catch((error) => {
        console.log(error);
        setErrors(error);
      });
  }

  const cancel = () => {
    props.history.push(`/courses/${props.match.params.id}`)
  }

  return (
    <main>
      <div className="wrap">
        <h2>Update Course</h2>
        {
          isLoading
          ? <p>Loading courses details! One moment...</p>
          : <form onSubmit={submit}>
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
              <div className="main--flex">
                <div>
                  <label htmlFor="courseTitle">Course Title</label>
                  <input
                    id="courseTitle"
                    name="courseTitle"
                    type="text"
                    defaultValue={data.title}
                    onChange={e => {setTitle(e.target.value)}}
                  />

                  <p>By Joe Smith</p>

                  <label htmlFor="courseDescription">Course Description</label>
                  <textarea 
                    id="courseDescription" 
                    name="courseDescription" 
                    onChange={e => {setDescription(e.target.value)}}
                    defaultValue={data.description}
                  />
                </div>
                <div>
                  <label htmlFor="estimatedTime">Estimated Time</label>
                  <input
                    id="estimatedTime"
                    name="estimatedTime"
                    type="text"
                    defaultValue={data.estimatedTime}
                    onChange={e => {setEstimatedTime(e.target.value)}}
                  />

                  <label htmlFor="materialsNeeded">Materials Needed</label>
                  <textarea 
                    id="materialsNeeded" 
                    name="materialsNeeded" 
                    onChange={e => {setMaterialsNeeded(e.target.value)}} 
                    defaultValue={data.materialsNeeded}
                  />
                </div>
              </div>
              <button className="button" type="submit">
                Update Course
              </button>
              <button
                className="button button-secondary"
                onClick={cancel}
              >
                Cancel
              </button>
            </form>
        }
      </div>
    </main>
  );
};

export default UpdateCourse;
