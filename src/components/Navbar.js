import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ExternalURLButton from "./buttons/ExternalURLButton";
import Button from "./buttons/Button";
import { useLocation } from "react-router-dom";
import resume from "../assets/Claire_Resume.pdf";
import { IoCloseSharp } from "react-icons/io5";
import { IoMdMenu } from "react-icons/io";

function Navbar() {
  const location = useLocation();
  const [active, setActive] = useState(null);
  const [show, setShow] = useState(true);
  const [showOverlay, setShowOverlay] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);
  const [isAboutHovered, setIsAboutHovered] = useState(false);
  const [isHomeHovered, setIsHomeHovered] = useState(false);
  const [isMenuHovered, setIsMenuHovered] = useState(false);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 768;

  useEffect(() => {
    setActive(location.pathname);
  }, [location]);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        if (window.scrollY > lastScrollY) {
          // if scroll down hide the navbar
          setShow(false);
        } else if (window.scrollY === 0) {
          setShow(true);
        } else {
          // if scroll up show the navbar
          setShow(true);
        }

        // remember current page location to use in the next move
        setLastScrollY(window.scrollY);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);

      // cleanup function
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastScrollY]);

  function Overlay(props) {
    const active = props;
    return (
      <>
        {props.show ? (
          <div
            onClick={() => setShowOverlay(false)}
            className="fixed h-[100vh] w-[100vw] -ml-[6%] bg-bg-gray z-30 flex flex-col justify-center items-center gap-8"
          >
            <Link to="/">
              <Button
                onMouseEnter={() => {
                  setIsHomeHovered(true);
                }}
                onMouseLeave={() => {
                  setIsHomeHovered(false);
                }}
                text="home"
                isHovered={isHomeHovered}
                className={`${
                  isHomeHovered
                    ? "bg-light-green border-light-green px-[3rem]"
                    : active === "/"
                      ? "bg-green border-green px-[3rem]"
                      : "border-green px-[3rem]"
                }`}
              />
            </Link>
            <Link to="/about">
              <Button
                onMouseEnter={() => {
                  setIsAboutHovered(true);
                }}
                onMouseLeave={() => {
                  setIsAboutHovered(false);
                }}
                text="about"
                isHovered={isAboutHovered}
                className={`${
                  isAboutHovered
                    ? "bg-light-green border-light-green px-[3rem]"
                    : active === "/about"
                      ? "bg-green border-green px-[3rem]"
                      : "border-green px-[3rem]"
                }`}
              />
            </Link>
            <ExternalURLButton
              text="resume"
              url={resume}
              isButton={true}
              className="px-[3rem]"
              hasBg={false}
            />
          </div>
        ) : null}
      </>
    );
  }

  return (
    <>
      {isMobile ? (
        <>
          <div
            className={`mt-[0.5rem] z-50 w-[90%] transition duration-100 ease-in flex justify-end fixed ${
              show ? "opacity-100" : "opacity-0"
            }`}
          >
            <Button
              text={showOverlay ? "close" : "menu"}
              onMouseEnter={() => {
                setIsMenuHovered(true);
              }}
              onMouseLeave={() => {
                setIsMenuHovered(false);
              }}
              onClick={() => setShowOverlay(!showOverlay)}
              isHovered={isMenuHovered}
              className={`${
                isMenuHovered
                  ? "bg-light-green border-light-green pl-[1.25rem] pr-[1rem]"
                  : "border-green pl-[1.25rem] pr-[1rem]"
              }`}
              icon={showOverlay ? <IoCloseSharp /> : <IoMdMenu />}
            />
            {/* <div
              onMouseEnter={() => {
                setIsHovered(true);
              }}
              onMouseLeave={() => {
                setIsHovered(false);
              }}
              onClick={() => setShowOverlay(!showOverlay)}
              style={{
                transform: isHovered ? "skewX(-11deg)" : "",
                borderRadius: "1.2rem",
                marginTop: "1rem",
                padding: "0.25rem 3rem",
                border: isHovered ? "1px solid #c2e772" : "1px solid #00D287",
                display: "inline-block",
                backgroundColor: isHovered ? "#c2e772" : "transparent",
              }}
            >
              <p style={isHovered ? { transform: "skewX(11deg)" } : {}}>
                {showOverlay ? "close" : "menu"}
              </p>
            </div> */}
          </div>
          <Overlay show={showOverlay} active={active} />
        </>
      ) : (
        <div
          className={`mt-[0.5rem] -ml-[2%] flex justify-between fixed w-[92%] transition duration-100 ease-in ${
            show ? "opacity-100" : "opacity-0"
          }`}
        >
          <Link to="/">
            <Button
              onMouseEnter={() => {
                setIsHomeHovered(true);
              }}
              onMouseLeave={() => {
                setIsHomeHovered(false);
              }}
              text="home"
              isHovered={isHomeHovered}
              className={`${
                isHomeHovered
                  ? "bg-light-green border-light-green px-[3rem]"
                  : active === "/"
                    ? "bg-green border-green px-[3rem]"
                    : "border-green px-[3rem]"
              }`}
            />
          </Link>
          <div className="flex gap-4">
            <Link to="/about">
              <Button
                onMouseEnter={() => {
                  setIsAboutHovered(true);
                }}
                onMouseLeave={() => {
                  setIsAboutHovered(false);
                }}
                text="about"
                isHovered={isAboutHovered}
                className={`${
                  isAboutHovered
                    ? "bg-light-green border-light-green px-[3rem]"
                    : active === "/about"
                      ? "bg-green border-green px-[3rem]"
                      : "border-green px-[3rem]"
                }`}
              />
            </Link>
            <ExternalURLButton
              text="resume"
              url={resume}
              isButton={true}
              className="px-[3rem]"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
