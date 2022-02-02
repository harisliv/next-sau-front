import { FC, useContext, useEffect, useRef, useState } from "react";
import classes from "./Topbar.module.scss";
import userImg from "../../assets/user/userImg.png";
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const Topbar: FC = () => {
  const ref= useRef<HTMLDivElement | null>(null)
  const [showModal, setShowModal] = useState(false);
  const { data: session, status } = useSession();

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
        {session && (
          <div ref={ref}>
            <Image src={userImg} alt="User" onClick={() => setShowModal(oldState => !oldState)}/>
            {showModal && <div id={classes.modal}>
                <ul>
                  <li><a>Theme Light</a></li>
                  <li onClick={() => {signOut();setShowModal(false)}}><a>Log Out</a></li>
                </ul>
            </div>}
          </div>
        )}
        <Link href="/" ><a>Language</a></Link>
        {session && (
          <Link href="/" ><a>Admin</a></Link>
        )}
        {!session && (
          <Link href="/register"><a>Register</a></Link>
        )}
        {!session && (
          <Link href="/login"><a>Login</a></Link>
        )}
      </ul>
    </nav>
  );
};

export default Topbar;
