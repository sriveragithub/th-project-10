import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import axios from 'axios'

const CourseDetail = ({match}) => {

  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    axios.get(`http://localhost:5000/api/courses/${match.params.id}`)
      .then(res => {
        setData(res.data)
        console.log(res.data)
      })
      .catch(err => console.log('Error fetching and parsing data', err))
      .finally(() => setIsLoading(false))
  }, [match.params.id])

  let materials
  if (!isLoading) {
    if (data.materialsNeeded) {
      const fixedMaterialsString = data.materialsNeeded.replace(/\*/g, '').trim()
      const materialsArray = fixedMaterialsString.split('\n')
      materials = materialsArray.map((material, i) => <li key={i}>{material}</li>)  
    }
  }
  

  return (
    <main>
      <div className="actions--bar">
        <div className="wrap">
          <Link className="button" to={`/courses/${match.params.id}/update`}>
            Update Course
          </Link>
          <a className="button" href="#">
            Delete Course
          </a>
          <Link className="button button-secondary" to="/">
            Return to List
          </Link>
        </div>
      </div>

      {
        isLoading
        ? <p>Loading course details! One moment...</p>
        : <div className="wrap">
            <h2>Course Detail</h2>
            <form>
              <div className="main--flex">
                <div>
                  <h3 className="course--detail--title">Course</h3>
                  <h4 className="course--name">{data.title}</h4>
                  <p>By {`${data.User.firstName} ${data.User.lastName}`}</p>

                  <p>
                    {data.description}
                  </p>

                </div>
                <div>
                  <h3 className="course--detail--title">Estimated Time</h3>
                  <p>{data.estimatedTime}</p>

                  <h3 className="course--detail--title">Materials Needed</h3>
                  <ul className="course--detail--list">
                    {materials}
                  </ul>
                </div>
              </div>
            </form>
          </div>
      }
    </main>
  );
};

export default CourseDetail;
