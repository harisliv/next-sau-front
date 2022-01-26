import { FC } from "react";

const EmptySpace: FC<{ pixels: string }> = (props) => {
  return <div style={{ marginTop: props.pixels }}></div>;
};

export default EmptySpace;
