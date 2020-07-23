import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  return (
    <div className='container'>
      <h1>Join</h1>
      <div>
        <input
          placeholder='Name'
          className='input'
          type='text'
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div>
        <input
          placeholder='Room'
          className='input'
          type='text'
          onChange={(event) => setRoom(event.target.value)}
        />
      </div>
      <Link
        onClick={(event) => (!name || !room ? event.preventDefault() : null)}
        to={`/vote?name=${name}&room=${room}`}>
        <button className='btn' type='submit'>
          Join
        </button>
      </Link>
    </div>
  );
};

export { Login };
