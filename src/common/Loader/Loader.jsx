import React from "react";
import { Flex, Spin } from "antd";

const Loader = () => {
  return (
    <div className="loader">
      <Flex align="center" gap="middle">
        <Spin size="large" />
      </Flex>
    </div>
  );
};

export default Loader;
