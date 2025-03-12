import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Loading = ({ loading }) => {
  const style = {
    display: "block",
    margin: "100px auto",
  };
  return (
    <ClipLoader
      color="#FFFFFF"
      loading={loading}
      cssOverride={style}
      size={150}
    />
  );
};

export default Loading;
