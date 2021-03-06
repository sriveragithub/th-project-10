import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import axios from 'axios'

// render all courses
const Courses = () => {
  
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // axios call to get a list of all courses and set their data to a variable that can be mapped through for rendering
  useEffect(() => {
    axios.get(`http://localhost:5000/api/courses`)
      .then(res => {
        setData(res.data.courses)
      })
      .catch(err => console.log('Error fetching and parsing data', err))
      .finally(() => setIsLoading(false))
  }, [])

  // mapping data into our course Links
  let courses;
  if (data.length) {
    courses = data.map((course) => {
      return (
        <Link className="course--module course--link" to={`/courses/${course.id}`} key={course.id}>
          <h2 className="course--label">Course</h2>
          <h3 className="course--title">{course.title}</h3>
        </Link>
      );
    });
  } else {
    courses = <p>No courses found!</p>
  }

  return (
    <main>
      <div className="wrap main--grid">
        {
          isLoading
          ? <p>Fetching data! One moment...</p>
          : courses
        }

        <Link
          className="course--module course--add--module"
          to="/courses/create"
        >
          <span className="course--add--title">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 13 13"
              className="add"
            >
              <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
            </svg>
            New Course
          </span>
        </Link>
      </div>
    </main>
  );
};

export default Courses