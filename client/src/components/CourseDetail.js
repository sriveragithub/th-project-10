import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import axios from 'axios'

const CourseDetail = (props) => {

  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated] = useState(props.context.authenticatedUser)
  const [errors, setErrors] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:5000/api/courses/${props.match.params.id}`)
      .then(res => {
        setData(res.data)
        console.log(res.data)
        console.log(res.data.User.id)
      })
      .catch(err => console.log('Error fetching and parsing data', err))
      .finally(() => setIsLoading(false))
  }, [props.match.params.id])

  let materials
  if (!isLoading) {
    if (data.materialsNeeded) {
      const fixedMaterialsString = data.materialsNeeded.replace(/\*/g, '').trim()
      const materialsArray = fixedMaterialsString.split('\n')
      materials = materialsArray.map((material, i) => <li key={i}>{material}</li>)  
    }
  }

  const deleteCourse = async (e) => {
    e.preventDefault()
    console.log(`deleting course`)

    await axios.delete(`http://localhost:5000/api/courses/${props.match.params.id}`,
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
        console.log(`Course successfully deleted!`);
        props.history.push("/");
      }
      })
      .catch((error) => {
        console.log(error);
        setErrors(error);
      });
  }

  return (
    <main>
      <div className="actions--bar">
        <div className="wrap">
        {
          isAuthenticated
          ? <>
            <Link className="button" to={`/courses/${props.match.params.id}/update`}>
              Update Course
            </Link>
          </>
          : null
        }
        {
          isLoading
          ? null
          : !isAuthenticated
            ? null
            : isAuthenticated.id === data.User.id
              ? <a className="button" onClick={deleteCourse}>
                  Delete Course
                </a>
              : null
        }
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
