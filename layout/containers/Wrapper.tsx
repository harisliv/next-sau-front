import { FC } from "react";
import classes from "./Wrapper.module.scss"

const Wrapper: FC = (props) => {
    return (
        <div className={classes.wrapper}>
            {props.children}
        </div>
    )
}

export default Wrapper