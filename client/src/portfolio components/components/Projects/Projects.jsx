import React from "react";
import ProjectCard from "./ProjectCard/ProjectCard";
import ScrollAnimation from "react-animate-on-scroll";
function Projects({ data }) {
  if (!data) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div class="wrapper">
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="shadow"></div>
          <div class="shadow"></div>
          <div class="shadow"></div>
        </div>
      </div>
    );
  }
  const style = {
    height: "10px",
    border: "0",
    boxShadow: "0 10px 10px -10px #8c8c8c inset",
  };
  return (
    <>
      <div className="ProjectWrapper" id="projects">
        <div className="Container">
          <ScrollAnimation animateIn="fadeIn">
            <div className="SectionTitle">
              Projects and Certificates
              <hr style={style} />
            </div>
          </ScrollAnimation>
          <ProjectCard data={data || []} />
        </div>
      </div>
    </>
  );
}

export default Projects;
