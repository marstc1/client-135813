import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import { CoffeeOutlined } from "@ant-design/icons";

const propTypes = {
  cards: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleOnClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

const Cards = ({ cards, handleOnClick, disabled }) => {
  return cards.map((card) => (
    <Button
      className='btn-card'
      disabled={disabled}
      key={card}
      onClick={() => handleOnClick(card)}>
      {card === "C" ? <CoffeeOutlined /> : card}
    </Button>
  ));
};

Cards.propTypes = propTypes;

export { Cards };
