import React from "react";
import { List } from "antd";

import { CheckOutlined, CoffeeOutlined } from "@ant-design/icons";

const Room = ({ connectedUsers, showVotes }) => {
  return (
    <List
      size='large'
      style={{ width: "100%" }}
      header='Room Members'
      bordered
      dataSource={connectedUsers}
      renderItem={(item) => (
        <List.Item>
          {item.name}
          {item.vote && (
            <span className='right'>
              {showVotes ? (
                item.vote === "C" ? (
                  <CoffeeOutlined style={{ color: "#00b2b2" }} />
                ) : (
                  item.vote
                )
              ) : (
                <CheckOutlined style={{ color: "#00b2b2" }} />
              )}
            </span>
          )}
        </List.Item>
      )}
    />
  );
};

export { Room };
