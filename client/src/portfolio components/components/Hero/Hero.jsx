import React, { useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import Header from "../Header/Header";
import {
  HeroWrapper,
  HeroLeft,
  HeroRight,
  Image,
  ScrollDown,
  ScrollLink,
} from "./HeroElements";
import { TypeAnimation } from "react-type-animation";
import ScrollAnimation from "react-animate-on-scroll";

function Hero({ data }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showSubtitle1, setShowSubtitle1] = useState(false);
  const [showScrollDown, setShowScrollDown] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const sequence = data["tags"].map((tag) => tag["value"]);

  return (
    <main>
      <Dropdown data={data} isOpen={isOpen} toggle={toggle} />
      <Header toggle={toggle} logo={data["logoName"]} />
      {/* <HeroContainer> */}
      <HeroWrapper>
        <HeroLeft>
          <ScrollAnimation animateIn="fadeIn">
            <TypeAnimation
              cursor={false}
              sequence={["Hi, I'm ", () => setShowSubtitle1(true)]}
              speed={{ type: "keyStrokeDelayInMs" }}
              wrapper="h1"
              repeat={0}
            />
            {showSubtitle1 && (
              <TypeAnimation
                cursor={false}
                sequence={[data["fullName"], () => setShowSubtitle(true)]}
                speed={{ type: "keyStrokeDelayInMs", value: 150 }}
                wrapper="h2"
                repeat={0}
              />
            )}
            {showSubtitle && (
              <TypeAnimation
                cursor={true}
                sequence={[
                  ...sequence,
                  () => setShowScrollDown(true),
                  "my projects are really cool, go check them out!",
                  1000,
                  "See ya! :)",
                  2000,
                ]}
                speed={10}
                deletionSpeed={65}
                wrapper="h5"
                repeat={Infinity}
              />
            )}
            {showScrollDown && (
              <ScrollAnimation animateIn="flipInX" offset={0}>
                <ScrollDown to="projects" id="scrollDown">
                  <ScrollLink>
                    Scroll down
                    <svg
                      version="1.1"
                      id="Layer_1"
                      fill="#ffffff"
                      x="10px"
                      y="10px"
                      viewBox="0 0 79.37 122.88"
                      height="35px"
                      width="35px"
                      style={{ marginLeft: "10px" }}
                    >
                      <g>
                        <path d="M50.2,121.63c6.71-1.85,12.72-5.44,17.51-10.23c7.19-7.19,11.65-17.11,11.65-28.03V39.68c0-10.92-4.46-20.84-11.65-28.03 C60.52,4.46,50.6,0,39.68,0C28.77,0,18.84,4.46,11.65,11.65C4.46,18.84,0,28.77,0,39.68v43.68c0,10.92,4.46,20.84,11.65,28.03 c5.59,5.59,12.82,9.53,20.89,11.01C37.42,123.3,45.7,122.87,50.2,121.63L50.2,121.63L50.2,121.63z M39.23,92.06 c4.15,0,7.55-3.4,7.55-7.55v-7.78c0-4.15-3.4-7.55-7.55-7.55c-4.15,0-7.55,3.4-7.55,7.55v7.78C31.68,88.66,35.07,92.06,39.23,92.06 L39.23,92.06z M61.08,104.77c-5.49,5.49-13.07,8.91-21.4,8.91c-8.33,0-15.9-3.41-21.4-8.91c-5.49-5.49-8.91-13.07-8.91-21.4V39.68 c0-8.33,3.41-15.9,8.91-21.4c5.49-5.49,13.07-8.91,21.4-8.91c8.33,0,15.9,3.41,21.4,8.91c5.49,5.49,8.91,13.07,8.91,21.4v43.68 C69.99,91.7,66.58,99.27,61.08,104.77L61.08,104.77L61.08,104.77z" />
                      </g>
                    </svg>
                  </ScrollLink>
                </ScrollDown>
              </ScrollAnimation>
            )}
          </ScrollAnimation>
        </HeroLeft>

        <HeroRight>
          <ScrollAnimation animateIn="bounceIn">
            <Image src={data["hero_url"]} alt="man-svgrepo" />
          </ScrollAnimation>
        </HeroRight>
      </HeroWrapper>
      {/* </HeroContainer> */}
    </main>
  );
}

export default Hero;
