import Link from "next/link";
import { FC } from "react";
import classes from "./Button.module.scss"

const LinkButton: FC<{modifier: string, url: string, text:string}> = ({modifier, url, text}) => {
    return (
        <div className="input_container top_margin_medium">
          <Link href={url}><a className={`${classes.button} ${classes[modifier]}`} >{text}</a></Link>
        </div>
    )
}

export default LinkButton;