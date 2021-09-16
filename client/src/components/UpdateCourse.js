import React, { useState, useEffect } from "react";
import axios from 'axios'

const UpdateCourse = (props) => {

  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [title, setTitle] = useState(data.title)
  const [desc, setDesc] = useState(data.description)
  const [time, setTime] = useState(data.estimatedTime)
  const [materials, setMaterials] = useState(data.materialsNeeded)

  useEffect(() => {
    axios.get(`http://localhost:5000/api/courses/${props.match.params.id}`)
      .then(res => {
        setData(res.data)
        setTitle(res.data.title)
        setDesc(res.data.description)
        setTime(res.data.estimatedTime)
        setMaterials(res.data.materialsNeeded)
        console.log(res.data)
      })
      .catch(err => console.log('Error fetching and parsing data', err))
      .finally(() => setIsLoading(false))
  }, [])

  const submit = (e) => {
    e.preventDefault()
    console.log(title, desc, time, materials)
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
                    onChange={e => {setDesc(e.target.value)}}
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
                    onChange={e => {setTime(e.target.value)}}
                  />

                  <label htmlFor="materialsNeeded">Materials Needed</label>
                  <textarea 
                    id="materialsNeeded" 
                    name="materialsNeeded" 
                    onChange={e => {setMaterials(e.target.value)}} 
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
