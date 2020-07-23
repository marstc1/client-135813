import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

let socket;

const Vote = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [cards, setCards] = useState(["1", "3", "5", "8", "13"]);

  const ENDPOINT = "localhost:5000";

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    console.log("Joining room");
    socket.emit("join", { name, room }, () => {});

    socket.on("message", (message) => {
      console.log(message);
    });

    socket.on("updateCards", (message) => {
      console.log(message);
    });

    return () => {
      socket.emit("disconnect");
    };
  }, [ENDPOINT, location.search]);

  const sendVote = (event, vote) => {
    event.preventDefault();

    if (vote) {
      socket.emit("sendVote", vote, () => console.log("Vote sent"));
    }
  };

  return (
    <div className='outerContainer'>
      <div className='container'>
        {cards.map((card) => (
          <button key={card} onClick={(event) => sendVote(event, card)}>
            {card}
          </button>
        ))}
      </div>
    </div>
  );
};

export { Vote };
