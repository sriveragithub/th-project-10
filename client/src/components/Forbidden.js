import React from "react";

// component to display when a user attempts to access a page they shouldn't
const Forbidden = () => {
  return (
    <main>
        <div className="wrap">
            <h2>Forbidden</h2>
            <p>Oh oh! You can't access this page.</p>
        </div>
    </main>
  );
};

export default Forbidden;
