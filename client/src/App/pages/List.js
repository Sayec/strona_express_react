import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function List() {
  // Initialize the state
  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //       list: [],
  //     };
  //   }
  const [list, setList] = useState([]);

  // Fetch the list on first mount
  useEffect(() => getList(), []);

  // Retrieves the list of items from the Express app
  const getList = () => {
    fetch('/api/getList')
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((list) => {
        console.log(list);
        setList([...list]);
      });
  };

  return (
    <div className="App">
      <h1>List of Items</h1>
      {/* Check to see if any items are found*/}
      <div>${list.length}</div>
      {list.length ? (
        <div className="list-container">
          {/* Render the list of items */}
          {list.map((item) => {
            return <div className="list-element">{item}</div>;
          })}
          <div class="list-element flex-dummy"></div>
          <div class="list-element flex-dummy"></div>
          <div class="list-element flex-dummy"></div>
        </div>
      ) : (
        <div>
          <h2>No List Items Found</h2>
        </div>
      )}
      <div>TEST</div>
      <Link to={'./'}>
        <button variant="raised">Home</button>
      </Link>
    </div>
  );
}

export default List;
