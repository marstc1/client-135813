import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "antd";
import { UserOutlined } from "@ant-design/icons";
import QuickResponseCode from "qrcode.react";

import logo from "../../images/logo-hr.gif";

const propTypes = {
  name: PropTypes.string.isRequired,
  roomNumber: PropTypes.string.isRequired,
};

const Header = ({ name, roomNumber }) => {
  const inviteUrl = `https://www.135813.com/${roomNumber}`;

  return (
    <Row className='header' justify='center'>
      <Row className='container' justify='space-between' align='middle'>
        <Col xs={24} sm={8}>
          <a href='/'>
            <img
              className='logo'
              alt="1 3 5 8 13 ... we dropped a two but you don't have to!"
              src={logo}
            />
          </a>
        </Col>

        <Col xs={24} sm={8}>
          <Row justify='space-between' align='top'>
            <Col>
              <Row>
                <h1>Room {roomNumber}</h1>
              </Row>
              <Row>
                <span className='small'>{inviteUrl}</span>
              </Row>
            </Col>

            <Col>
              <Row>
                <QuickResponseCode value={inviteUrl} size={80} />
              </Row>
              <Row justify='center' style={{ marginTop: "0" }}>
                <span className='small'>Scan me!</span>
              </Row>
            </Col>
          </Row>

          <Row>
            <span
              style={{
                padding: "0.2rem 0.4rem",
                backgroundColor: "#00b2b2",
                borderRadius: "50%",
                color: "#fff",
                margin: "0rem 0.5rem 0 0",
              }}>
              <UserOutlined />
            </span>
            <span
              style={{
                fontWeight: "bold",
                lineHeight: "1.8rem",
              }}>
              {name}
            </span>
          </Row>
        </Col>
      </Row>
    </Row>
  );
};

Header.propTypes = propTypes;

export { Header };
