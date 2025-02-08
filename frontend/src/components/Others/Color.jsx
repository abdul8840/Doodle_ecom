// Color.js
import React, { useState } from "react";
import { Box } from "@mui/material";

const Color = ({ colorData, setColor, selectedColor }) => {
  return (
    <Box className="flex gap-3">
      {colorData?.map((item, index) => (
        <Box
          key={index}
          onClick={() => setColor(item?._id)}
          className={`w-10 h-10 rounded-full border-2 cursor-pointer ${
            selectedColor === item?._id ? "border-black" : "border-gray-300"
          }`}
          style={{
            backgroundColor: item?.title,
          }}
        ></Box>
      ))}
    </Box>
  );
};

export default Color;