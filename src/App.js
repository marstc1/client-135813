import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { notification, Row, Col } from "antd";
import io from "socket.io-client";

import { LoginForm } from "./components/LoginForm/LoginForm";
import { Header } from "./components/Header";
import { Cards } from "./components/Cards/Cards";
import { Room } from "./components/Room/Room";
import { Results } from "./components/Results/Results";
import { Footer } from "./components/Footer/Footer";

import "./App.css";
import { SmileOutlined } from "@ant-design/icons";

const ENDPOINT = "https://server-135813.herokuapp.com/";
let socket;

const App = () => {
  const [connected, setConnected] = useState(false);
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [roomMembers, setRoomMembers] = useState();
  const [cards, setCards] = useState();
  const [lockCards, setLockCards] = useState(false);
  const [results, setResults] = useState([
    { name: "1", count: 0 },
    { name: "3", count: 1 },
    { name: "5", count: 0 },
    { name: "8", count: 3 },
    { name: "13", count: 5 },
  ]);
  const [showResults, setShowResults] = useState(false);
  const [showVotes, setShowVotes] = useState(false);

  useEffect(() => {
    if (connected) {
      return console.log("Connected");
    }

    return () => {
      socket.emit("disconnect");
    };
  }, [connected]);

  const openNotification = (message, description) => {
    notification.open({
      message,
      description,
      icon: <SmileOutlined style={{ color: "#00b2b2" }} />,
    });
  };

  const handleJoinRoom = (name, roomNumber, rememberMe) => {
    socket = io(ENDPOINT);

    socket.emit("joinRoom", { name, roomNumber }, (name, cards) => {
      setConnected(true);
      setName(name);
      setRoom(roomNumber);
      setCards(cards);
    });

    initialiseSocketEvents(socket);
  };

  const handleCreateRoom = (name, selectedCards, rememberMe) => {
    socket = io(ENDPOINT);

    socket.emit(
      "createRoom",
      { name, selectedCards },
      (name, roomNumber, cards) => {
        setConnected(true);
        setName(name);
        setRoom(roomNumber);
        setCards(cards);
      }
    );

    initialiseSocketEvents(socket);
  };

  const sendVote = (card) => {
    setLockCards(true);
    console.info("Vote sent");
    socket.emit("sendVote", { card }, (err) => {
      console.info("Vote received");
      if (err) {
        console.log("Error:", err);
      }
    });
  };

  const resetVotes = () => {
    socket.emit("reset", (err) => {
      console.info("Reset request received");
      if (err) {
        console.log("Error:", err);
      }
    });
  };

  const initialiseSocketEvents = (socket) => {
    socket.on("updateCards", (cards) => {
      setCards(cards);
    });

    socket.on("message", (message) => {
      openNotification(message.user, message.text);
    });

    socket.on("updateConnectedUsers", (connectedUsers) => {
      setRoomMembers(connectedUsers);
    });

    socket.on("updateShowVotes", (showVotes) => {
      setShowVotes(showVotes);
    });

    socket.on("updateResults", (results) => {
      setResults(results);
    });

    socket.on("updateShowResults", (showResults) => {
      setShowResults(showResults);
    });

    socket.on("updateLockCards", (lockCards) => {
      setLockCards(lockCards);
    });
  };

  return (
    <Router>
      <Route
        path='/'
        exact
        render={(routeProps) => (
          <div className='App'>
            <LoginForm
              {...routeProps}
              visible={!room}
              name={name}
              handleJoinRoomClick={handleJoinRoom}
              handleCreateRoomClick={handleCreateRoom}
              roomNotFound={false}
            />

            {room && cards && (
              <>
                <Header name={name} roomNumber={room} />
                <Row
                  className='content'
                  justify='center'
                  style={{ minHeight: "480px" }}>
                  <Row className='container'>
                    {!showResults && (
                      <Col xs={24} md={16} style={{ textAlign: "center" }}>
                        <Cards
                          cards={cards}
                          handleOnClick={sendVote}
                          disabled={lockCards}
                        />
                      </Col>
                    )}

                    {showResults && results && (
                      <Col xs={24} md={16}>
                        <Results results={results} resetHandler={resetVotes} />
                      </Col>
                    )}

                    {roomMembers && (
                      <Col xs={24} md={8}>
                        <Row style={{ width: "100%" }}>
                          <Room
                            connectedUsers={roomMembers}
                            showVotes={showVotes}
                          />
                        </Row>
                      </Col>
                    )}
                  </Row>
                </Row>
                <Footer />
              </>
            )}
          </div>
        )}
      />
    </Router>
  );
};

export default App;
