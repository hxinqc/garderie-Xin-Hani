import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

function Topbar() {
  return (
    <Wrapper>
      <TopCenter>
        <NavigationList>
          <LiDiv>
            <NavigationLink to="/">HOME</NavigationLink>
          </LiDiv>

          <LiDiv>
            <NavigationLink to="/Search">SEARCH</NavigationLink>
          </LiDiv>

          <LiDiv>
            <NavigationLink to="/Enrolment">ENROLMENT</NavigationLink>
          </LiDiv>

          <LiDiv>
            <NavigationLink to="/Teachers">TEACHERS</NavigationLink>
          </LiDiv>

          <LiDiv>
            <NavigationLink to="/Children">CHILDREN</NavigationLink>
          </LiDiv>

          <LiDiv>
            <NavigationLink to="/Classes">CLASSES</NavigationLink>
          </LiDiv>

          <LiDiv>
            <NavigationLink to="/Foods">FOOD</NavigationLink>
          </LiDiv>

          <LiDiv>
            <NavigationLink to="/Activities">ACTIVITY</NavigationLink>
          </LiDiv>

          <LiDiv>
            <NavigationLink to="/Enroled">ENROLED</NavigationLink>
          </LiDiv>

          <LiDiv>
            <NavigationLink to="/Admins">ADMINS</NavigationLink>
          </LiDiv>
        </NavigationList>
      </TopCenter>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 50px;
  background-color: white;
  color: white;
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  font-family: "Josefin Sans", sans-serif;
  z-index: 999;
`;

const TopLeft = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TopCenter = styled.div`
  flex: 8;
  display: flex;
  margin: 10;
  padding: 0;
  list-style: none;
`;

const TopRight = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavigationList = styled.ul`
  list-style-type: none;
  display: flex;
`;

const LiDiv = styled.li`
  list-style-type: none;
  margin: 20px;
  font-size: 15px;
  font-weight: 300;
  cursor: pointer;
  color: #57d7fc;
`;
const LeftLiDiv = styled.li`
  list-style-type: none;
  margin-right: 1px;
  font-size: 10px;
  font-weight: 300;
  cursor: pointer;
  color: #57d7fc;
`;

const IconeDiv = styled.div`
  font-size: 20px;
  margin-right: 10px;
  color: #444;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IDiv = styled.div`
  margin: 10px;
`;

const NavigationLink = styled(NavLink)`
  position: relative;
  text-decoration: none;
  padding: 0 10px;
  color: #57d7fc;
  &.active {
    color: #fe4660;
  }
  &:after {
    content: "";
    position: absolute;
    background-color: currentColor;
    left: 0;
    right: 0;
    bottom: -5px;
    width: 50%;
    margin: auto;
    height: 3px;
    transform: scaleX(0);
    transform-origin: center center;
    border-radius: 2px;
  }
  &.active:after {
    /* transition: transform 250ms, opacity 150ms; */
    transform: scaleX(1);
    opacity: 1;
  }
`;

export default Topbar;
