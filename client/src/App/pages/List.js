import React, { useState, useEffect } from 'react';

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
      .then((res) => res.json())
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
        <div>
          {/* Render the list of items */}
          {list.map((item) => {
            return <div>{item}</div>;
          })}
        </div>
      ) : (
        <div>
          <h2>No List Items Found</h2>
        </div>
      )}
      <div>TEST</div>
    </div>
  );
}

export default List;
