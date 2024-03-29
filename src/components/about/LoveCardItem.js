import React, {
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
} from "react";
import "../../assets/LoveCard.css";

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const updateMousePosition = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);

    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);
  return mousePosition;
};

const getDimensionObject = (node) => {
  const rect = node.getBoundingClientRect();
  return {
    width: rect.width,
    height: rect.height,
  };
};

const useSize = () => {
  const [dimensions, setDimensions] = useState({});
  const [node, setNode] = useState(null);

  const ref = useCallback((node) => {
    setNode(node);
  }, []);

  useLayoutEffect(() => {
    if (node) {
      const measure = () => setDimensions(getDimensionObject(node));
      measure();
    }
  }, [node]);

  return [ref, dimensions];
};

function LoveCardItem(props) {
  const [isHovered, setIsHovered] = useState(false);
  const { x, y } = useMousePosition();

  const xPos = isHovered ? x : 1000;
  const yPos = isHovered ? y : 1000;
  let [refimg, { width: widthimg, height: heightimg }] = useSize();
  let [refdiv] = useSize();

  return (
    <>
      <div
        ref={refdiv}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`text-sm lg:text-base flex justify-center z-10 rounded-2xl outline-1 outline px-4 lg:px-6 py-1 lg:my-2 ${
          isHovered ? "italic" : ""
        } ${isHovered ? "outline-green" : "outline-black"}`}
      >
        <p
          className={`pointer-events-none ${
            isHovered ? "text-green font-bold" : ""
          }`}
        >
          {props.text}
        </p>
      </div>
      <div style={{ position: "fixed", top: "0", left: "0" }}>
        <img
          className={`love-pic${isHovered ? " is-hovered" : ""}`}
          src={props.src}
          ref={refimg}
          alt={props.text}
          style={{
            transform: `translate(${xPos - widthimg / 2}px, ${
              yPos - heightimg / 2
            }px)`,
          }}
        />
      </div>
    </>
  );
}

export default LoveCardItem;
