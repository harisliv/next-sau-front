import { FC } from "react";
import classes from "./Footer.module.scss";
import tweeter from "../../assets/social/tweeter.png";
import facebook from "../../assets/social/facebook.png";
import youtube from "../../assets/social/youtube.png";
import instagram from "../../assets/social/instagram.png";
import Image from "next/image";

const Footer: FC = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.logo}>
        <h4 className={classes.news}>News</h4>
        <h4>Portal</h4>
      </div>
      <small>&copy; 2015 - 2021 All rights reserved. </small>
      <h4 className={classes.content_heading}>Follow us</h4>
      <div className={classes.social_container}>
        <div className={classes.socail_container_background}>
          <div className={classes.socail_container_img}>
            <Image src={tweeter} alt="Tweeter" />
          </div>
        </div>
        <div className={classes.socail_container_background}>
          <div className={classes.socail_container_img}>
            <Image src={facebook} alt="Facebook" />
          </div>
        </div>
        <div className={classes.socail_container_background}>
          <div className={classes.socail_container_img}>
            <Image src={youtube} alt="Youtube" />
          </div>
        </div>
        <div className={classes.socail_container_background}>
          <div className={classes.socail_container_img}>
            <Image src={instagram} alt="instagram" />
          </div>
        </div>
      </div>
      <div className={classes.footer_navigation}>
        <ul>
          <li className={classes.footer_list_heading}>CATEGORIES</li>
          <li>Economy</li>
          <li>Sports</li>
          <li>Lifestyle</li>
        </ul>
        <ul>
          <li className={classes.footer_list_heading}>ABOUT</li>
          <li>Economy</li>
          <li>Sports</li>
          <li>Lifestyle</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
