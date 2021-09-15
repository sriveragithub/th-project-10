import React, { useState, useEffect } from "react";
import axios from 'axios'

const Courses = () => {
  
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    axios.get(`http://localhost:5000/api/courses`)
      .then(res => {
        setData(res.data.courses)
        console.log(res.data.courses)
      })
      .catch(err => console.log('Error fetching and parsing data', err))
      .finally(() => setIsLoading(false))
  }, [])

  let courses;
  if (data.length) {
    courses = data.map((course) => {
      return (
        <a className="course--module course--link" href="course-detail.html" key={course.id}>
          <h2 className="course--label">Course</h2>
          <h3 className="course--title">{course.title}</h3>
        </a>
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

        <a
          className="course--module course--add--module"
          href="create-course.html"
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
        </a>
      </div>
    </main>
  );
};

export default Courses