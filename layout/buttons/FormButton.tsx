import { FC } from "react";
import classes from "./Button.module.scss"

interface FormButtonInterface {
  modifier: string;
  buttonType: string;
  title: string;
}

const FormButton: FC<FormButtonInterface> = (props) => {
  return (
    <div className="input_container top_margin_medium">
      <input
        className={`${classes.button} ${classes[props.modifier]}`}
        type={props.buttonType}
        value={props.title}
      />
    </div>
  );
};

export default FormButton;
