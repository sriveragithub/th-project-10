import React, { useState } from "react";

const CreateCourse = (props) => {

  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [time, setTime] = useState('')
  const [materials, setMaterials] = useState('')
  const [errors, setErrors] = useState([])

  const submit = (e) => {
    e.preventDefault()
    console.log(title, desc, time, materials)
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
                onChange={e => {setDesc(e.target.value)}}
              ></textarea>
            </div>
            <div>
              <label htmlFor="estimatedTime">Estimated Time</label>
              <input
                id="estimatedTime"
                name="estimatedTime"
                type="text"
                onChange={e => {setTime(e.target.value)}}
              />

              <label htmlFor="materialsNeeded">Materials Needed</label>
              <textarea id="materialsNeeded" name="materialsNeeded" onChange={e => {setMaterials(e.target.value)}}></textarea>
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
