import { FC, useContext, useEffect, useRef, useState } from "react";
import { authContext } from "../../context/authContext";
import classes from "./Topbar.module.scss";
import userImg from "../../assets/user/userImg.png";
import Image from "next/image";
import Link from "next/link";

const Topbar: FC = () => {
  const ref= useRef<HTMLDivElement | null>(null)
  const context = useContext(authContext);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const checkIfClickedOutside = (event:MouseEvent) => {
      if (showModal && ref.current && !ref.current.contains(event.target as Element)) {
        setShowModal(false)
      }
    }
    document.addEventListener("mousedown", checkIfClickedOutside)
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [showModal])

  return (
    <nav className={classes.topbar}>
      <ul className={classes.topbar_menu}>
        {context.isLoggedIn && (
          <div ref={ref}>
            <Image src={userImg} alt="User" onClick={() => setShowModal(oldState => !oldState)}/>
            {showModal && <div id={classes.modal}>
                <ul>
                  <li><a>Theme Light</a></li>
                  <li onClick={() => {context.onLogOut();setShowModal(false)}}><a>Log Out</a></li>
                </ul>
            </div>}
          </div>
        )}
        <Link href="/" ><a>Language</a></Link>
        {context.isLoggedIn && (
          <Link href="/" ><a>Admin</a></Link>
        )}
        {!context.isLoggedIn && (
          <Link href="/register"><a>Register</a></Link>
        )}
        {!context.isLoggedIn && (
          <Link href="/login"><a>Login</a></Link>
        )}
      </ul>
    </nav>
  );
};

export default Topbar;
