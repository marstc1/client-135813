import React, { useState } from "react";
import { submitActions } from "../../constants/submit-actions";
import { defaultCards, availableCards } from "../../constants/cards";
import { Button, Checkbox, Col, Divider, Form, Input, Modal, Row } from "antd";
import {
  CoffeeOutlined,
  ImportOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { createRoom, joinRoom } = submitActions;

const LoginForm = ({
  handleCreateRoomClick,
  handleJoinRoomClick,
  roomNotFound,
  visible,
  name,
}) => {
  const [selectedCards, setSelectedCards] = useState(defaultCards);
  const [submitAction, setSubmitAction] = useState(createRoom);
  const [rememberMe, setRememberMe] = useState({
    checked: name,
    disabled: false,
  });

  const updateSelectedCards = (checkedValues) => {
    setSelectedCards(checkedValues);
  };

  const updateRememberMe = ({ target }) => {
    setRememberMe(target.checked);
  };

  const submitForm = (values) => {
    console.log(values, rememberMe, selectedCards);
    const { name, roomNumber } = values;

    if (submitAction === joinRoom) {
      return handleJoinRoomClick(name, roomNumber, rememberMe);
    }

    return handleCreateRoomClick(name, selectedCards, rememberMe);
  };

  return (
    <Modal
      centered
      className='login-modal'
      closable={false}
      maskClosable={false}
      keyboard={false}
      visible={visible}
      footer={null}>
      <Row justify='center'>
        <Col style={{ maxWidth: "300px" }}>
          <div
            className='logo'
            style={{
              marginBottom: "2em",
              height: "180px",
              width: "220px",
            }}>
            <span>1 3 5 8 13</span>
          </div>

          <Form
            autoComplete='off'
            name='normal_login'
            className='login-form'
            size='large'
            onFinish={submitForm}>
            <Form.Item
              name='name'
              initialValue={name}
              rules={[
                {
                  required: true,
                  message: "Please enter your Name!",
                },
              ]}>
              <Input
                prefix={<UserOutlined className='site-form-item-icon' />}
                placeholder='Name'
              />
            </Form.Item>

            <Divider>Choose</Divider>

            <Form.Item
              name='roomNumber'
              style={{ width: "45%", display: "inline-block" }}
              rules={[
                {
                  required: submitAction === joinRoom,
                  message: "Room number required",
                },
              ]}
              hasFeedback
              validateStatus={roomNotFound && "error"}
              help={roomNotFound && "Room not found"}>
              <Input
                prefix={<ImportOutlined className='site-form-item-icon' />}
                placeholder='135813'
                type='text'
                maxLength='6'
              />
            </Form.Item>

            <Form.Item
              className='right'
              style={{ width: "50%", display: "inline-block" }}>
              <Button
                onClick={() => setSubmitAction(joinRoom)}
                type='primary'
                htmlType='submit'
                className='login-form-button'>
                JOIN ROOM
              </Button>
            </Form.Item>

            <Divider style={{ marginBottom: "0" }}>or</Divider>

            <Form.Item>
              <Checkbox.Group
                name='cards'
                style={{ width: "100%" }}
                defaultValue={selectedCards}
                onChange={updateSelectedCards}>
                <Row className='cards-container'>
                  {availableCards.map((card) => (
                    <Col span={4} key={card}>
                      <Checkbox className='checkbox-card' value={card}>
                        {card === "C" ? <CoffeeOutlined /> : card}
                      </Checkbox>
                    </Col>
                  ))}
                </Row>
              </Checkbox.Group>
            </Form.Item>

            <Row justify='space-between' align='bottom'>
              <Form.Item>
                <Checkbox
                  defaultChecked={rememberMe.checked}
                  disabled={rememberMe.disabled}
                  onChange={updateRememberMe}>
                  Remember me
                </Checkbox>
              </Form.Item>

              <Form.Item>
                <Button
                  onClick={() => setSubmitAction(createRoom)}
                  type='primary'
                  htmlType='submit'
                  className='login-form-button'>
                  CREATE ROOM
                </Button>
              </Form.Item>
            </Row>
          </Form>
        </Col>
      </Row>
    </Modal>
  );
};

export { LoginForm };
