import { FC } from "react";
import classes from './Main.module.scss';

const Main: FC = (props) => {
  return <main className={classes.main}>{props.children}</main>;
};

export default Main;
