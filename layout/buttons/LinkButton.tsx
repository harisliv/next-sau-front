import Link from "next/link";
import { FC } from "react";
import classes from "./Button.module.scss"

const LinkButton: FC<{modifier: string}> = ({modifier}) => {
    return (
        <div className="input_container top_margin_medium">
          <Link href="/"><a className={`${classes.button} ${classes[modifier]}`} >Create account </a></Link>
        </div>
    )
}

export default LinkButton;