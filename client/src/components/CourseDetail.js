import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'

const CourseDetail = (props) => {

  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated] = useState(props.context.authenticatedUser)

  useEffect(() => {
    axios.get(`http://localhost:5000/api/courses/${props.match.params.id}`)
      .then(res => {
        setData(res.data)
      })
      .catch(err => {
        console.log('Error fetching and parsing data', err)
        props.history.push('/notfound')
      })
      .finally(() => setIsLoading(false))
  }, [props.match.params.id, props.history])

  const deleteCourse = async (e) => {
    e.preventDefault()

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
      } else {
        console.log(`Course successfully deleted!`);
        props.history.push("/");
      }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <main>
      <div className="actions--bar">
        <div className="wrap">
        {
          isLoading
          ? null
          : !isAuthenticated
            ? null
            : props.context.authenticatedUser.id === data.User.id
            ? <Link className="button" to={`/courses/${props.match.params.id}/update`}>
                Update Course
              </Link>
            : <Link className="button" to={`/forbidden`}>
                Update Course
              </Link>
        }
        {
          isLoading
          ? null
          : !isAuthenticated
            ? null
            : isAuthenticated.id === data.User.id
              ? <button className="button" onClick={deleteCourse}>
                  Delete Course
                </button>
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

                  <ReactMarkdown>
                    {data.description}
                  </ReactMarkdown>

                </div>
                <div>
                  <h3 className="course--detail--title">Estimated Time</h3>
                  <p>{data.estimatedTime}</p>

                  <h3 className="course--detail--title">Materials Needed</h3>
                  <ReactMarkdown>
                    {data.materialsNeeded}
                  </ReactMarkdown>
                </div>
              </div>
            </form>
          </div>
      }
    </main>
  );
};

export default CourseDetail;
