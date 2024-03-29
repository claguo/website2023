import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./buttons/Button";
import FilterButton from "./buttons/CategoryButton";
import { IoMdArrowForward } from "react-icons/io";

function ProjectCard(props) {
  const [isHovered, setIsHovered] = useState(false);
  const { project } = props;
  const src = `./imgs/${project.path}.png`;

  return (
    <>
      <Link
        to={`/${project.path}`}
        onMouseEnter={() => {
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
        }}
        className={`flex flex-col gap-4 mb-28 lg:flex-row lg:justify-between lg:gap-12 lg:items-end lg:mb-36
      ${isHovered ? "italic" : ""}`}
      >
        <img
          src={src}
          alt={project.alt}
          className={`${
            isHovered ? "lg:-skew-x-[7deg]" : ""
          } w-100 lg:w-[46%] aspect-video rounded-lg`}
        />
        <div className="flex flex-col gap-[0.5rem]">
          <h3
            className={`font-[2rem] font-sans font-normal text-md lg:text-lg ${
              isHovered ? "text-green italic" : ""
            }`}
          >
            {project.title}
          </h3>
          <div className="flex flex-wrap">
            {project.categories.map((category) => (
              <FilterButton text={category} />
            ))}
          </div>
          <p>{project.description}</p>
          <div style={{ alignSelf: "flex-end" }}>
            <Button
              className="lg:hidden gap-[0.5rem] pl-[1rem] pr-[0.5rem] bg-light-green border-light-green"
              text="view project"
              icon={<IoMdArrowForward />}
            />
          </div>
        </div>
      </Link>
    </>
  );
}

export default ProjectCard;
