import React from "react";
import { Link } from 'react-router-dom'

const Header = (props) => {

  const { authenticatedUser } = props.context
  console.log(authenticatedUser)

  return (
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo">
          <Link to="/">Courses</Link>
        </h1>
        <nav>
          {
            authenticatedUser
            ? <ul class="header--signedin">
                <li>Welcome, {`${authenticatedUser.firstName} ${authenticatedUser.lastName}`}!</li>
                <li><Link to="/signout">Sign Out</Link></li>
              </ul>
            : <ul className="header--signedout">
                <li><Link to="/signup">Sign Up</Link></li>
                <li><Link to="/signin">Sign In</Link></li>
              </ul>
          }
        </nav>
      </div>
    </header>
  );
};

export default Header