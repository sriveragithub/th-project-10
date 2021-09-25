import React from "react";
import { Link } from 'react-router-dom'

// header component that is always render on every page. stores the authenticatedUser info so a user can tell when they are signed in
const Header = (props) => {

  const { authenticatedUser } = props.context

  return (
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo">
          <Link to="/">Courses</Link>
        </h1>
        <nav>
          {
            authenticatedUser
            ? <ul className="header--signedin">
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