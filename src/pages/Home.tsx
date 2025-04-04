import { Link, useLocation } from "react-router";
import PageMeta from "../components/common/PageMeta";
import styled from "styled-components";
import { MdAdminPanelSettings, MdDarkMode } from "react-icons/md";
import { FaSchoolFlag } from "react-icons/fa6";
import { GiTeacher } from "react-icons/gi";
import { CiLight } from "react-icons/ci";
import { useTheme } from "../context/ThemeContext";
import { useRef } from "react";
export default function Home() {
  const params = useLocation();
  const themeData = useTheme();

  //How to reference
  const howToRef = useRef(null);
  return (
    <>
      <PageMeta
        title="SIMS - Student Internals Management System "
        description="SIMS - Student Internals Management System"
      />
      <div className="snap-y snap-mandatory overflow-y-scroll h-screen ">
        {/* Hero Section with Navbar */}
        <section className="relative h-screen snap-always snap-center">
          <nav className="bg-transparent absolute w-full z-10">
            <div className="lg:p-2.5 my-1 p-4 lg:flex justify-center items-center lg:mx-8">
              {/* Logo */}
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/9/92/Sims_diamond_logo.png"
                alt="SIMS"
                className="h-12"
              />
              {/* Links */}
              <div className="lg:block hidden lg:flex-row flex-col lg:space-x-8 ml-auto">
                {[
                  { to: "/", label: "Home" },
                  { to: "/admin", label: "Admin" },
                  { to: "/department", label: "Department" },
                  { to: "/faculty", label: "Faculty" },
                  { to: "", label: "How to" },
                ].map((link) => (
                  <Link
                  key={link.to}
                  to={link.to}
                  className={`text-gray-600 dark:text-gray-25 text-xl hover:text-gray-900 dark:hover:text-gray-100 ${
                    link.to === params.pathname ? "font-bold underline" : ""
                  }`}
                  onClick={() => {
                    if (link.to === "" && howToRef.current) {
                    howToRef.current.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  >
                  {link.label}
                  </Link>
                ))}
              </div>
              <div className="ml-4 mt-1">
                {themeData.theme === "light" ? (
                  <button
                    className="rounded-2xl"
                    onClick={() => themeData.toggleTheme()}
                  >
                    <CiLight size={28} />
                  </button>
                ) : (
                  <button
                    className=" rounded-2xl"
                    onClick={() => themeData.toggleTheme()}
                  >
                    <MdDarkMode size={28} />
                  </button>
                )}
              </div>
            </div>
          </nav>
          <div className="h-screen grid lg:grid-cols-2 grid-cols-1 lg:gap-8 px-12 mx-auto bg-blue-200 dark:bg-blue-300">
            {/* Text */}
            <div className="flex text-gray-900 flex-col justify-center items-center lg:items-start col-span-1 lg:mt-0 mt-20">
              <h1 className="lg:text-9xl text-6xl font-bold">SIMS</h1>
              <p className="text-3xl text-gray-600 text-center">
                Student Internals Management System
              </p>
              <div className="hidden lg:block">
                <p className="text-md text-justify mt-4 text-gray-600 dark:text-gray-25">
                  Effortlessly manage internal marks, faculty assignments, and
                  academic records—all in one place.
                </p>
                <p className="text-md text-justify text-gray-600 dark:text-gray-25">
                  Designed for educational institutions, SIMS ensures accuracy,
                  transparency, and seamless collaboration between faculty,
                  departments, and administrators.
                </p>
              </div>
            </div>
            {/* Image */}
            <div className="col-span-1 flex justify-center items-center">
              <img src="/SIMS_hero.svg" alt="" className="size-4/5" />
            </div>
          </div>
        </section>
        {/* Portals */}
        <section className="p-10 h-screen snap-always snap-center">
          {/* Title */}
          <h1 className="text-4xl underline text-center font-bold m-10 text-gray-900 dark:text-gray-25">
            Portals that we offer
          </h1>
          {/* Cards */}
          <div className="lg:grid grid-cols-3 p-10 content-center gap-8 justify-center uppercase">
            {/* Admin Portal */}
            <Link to="/admin">
              <StyledWrapper className="flex justify-center items-center">
                <div className="card wallet">
                  <div className="overlay" />
                  <div className="circle">
                    <MdAdminPanelSettings className="cardIcon" size={50} />
                    {/* <FaBuilding className="cardIcon" size={40} /> */}
                  </div>
                  <p className="font-bold text-xl">Admin</p>
                </div>
              </StyledWrapper>
            </Link>
            {/* Department Portal */}
            <Link to="/department">
              <StyledWrapper className="flex justify-center items-center">
                <div className="card wallet">
                  <div className="overlay" />
                  <div className="circle">
                    <FaSchoolFlag className="cardIcon" size={50} />
                  </div>
                  <p className="font-bold text-xl">Department</p>
                </div>
              </StyledWrapper>
            </Link>
            {/* Faculty Portal */}
            <Link to="/faculty">
              <StyledWrapper className="flex justify-center items-center">
                <div className="card wallet">
                  <div className="overlay" />
                  <div className="circle">
                    <GiTeacher className="cardIcon" size={50} />
                  </div>
                  <p className="font-bold text-xl">Faculty</p>
                </div>
              </StyledWrapper>
            </Link>
          </div>
        </section>
        {/* Highlights Section */}
        <section
          ref={howToRef}
          className="p-10 h-3/4 snap-always snap-start bg-blue-200"
        >
          {/* Title */}
          <h1 className="text-4xl underline text-center font-bold m-10">
            Features that we promise to deliver
          </h1>
          {/* Cards */}
          <StyledCardWrapper>
            <div className="container mx-auto p-10"></div>
          </StyledCardWrapper>
        </section>
        {/* Footer */}
        <footer className="text-center backdrop:backdrop-blur-2xl text-base-content p-4">
          <aside>
            <p className="text-gray-900 dark:text-gray-25">
              Copyright © {new Date().getFullYear()} - All right reserved by
              SIMS
            </p>
          </aside>
        </footer>
      </div>
    </>
  );
}

const StyledCardWrapper = styled.div`
  .container {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #0000 18.75%, #3b82f6 0 31.25%, #0000 0),
      linear-gradient(45deg, #0000 18.75%, #3b82f6 0 31.25%, #0000 0),
      linear-gradient(135deg, #0000 18.75%, #3b82f6 0 31.25%, #0000 0),
      linear-gradient(45deg, #0000 18.75%, #3b82f6 0 31.25%, #0000 0);
    background-size: 60px 60px;
    background-position: 0 0, 0 0, 30px 30px, 30px 30px;
    animation: slide 4s linear infinite;
  }

  @keyframes slide {
    to {
      background-position: 60px 0, 60px 0, 90px 30px, 90px 30px;
    }
  }
`;

const StyledWrapper = styled.div`
  .wallet {
    --bg-color: #469fff;
    --bg-color-light: #469fff;
    --text-color-hover: #fff;
    --box-shadow-color: #7592ff;
  }

  .card {
    width: 340px;
    height: 321px;
    background: #fff;
    border-radius: 10px;
    border-top-right-radius: 10px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    box-shadow: 0 14px 26px rgba(0, 0, 0, 0.04);
    transition: all 0.3s ease-out;
    text-decoration: none;
  }

  .card:hover {
    transform: translateY(-5px) scale(1.005) translateZ(0);
    box-shadow: 0 24px 36px rgba(0, 0, 0, 0.11),
      0 24px 46px var(--box-shadow-color);
  }

  .card:hover .overlay {
    transform: scale(5) translateZ(0);
  }

  .card:hover .cardIcon {
    transform: scale(2) translateZ(0);
  }

  .card:hover .circle {
    border-color: var(--bg-color-light);
    background: var(--bg-color);
  }

  .card:hover .circle:after {
    background: var(--bg-color-light);
  }

  .card:hover p {
    color: var(--text-color-hover);
  }

  .card p {
    font-size: 17px;
    color: #4c5656;
    margin-top: 30px;
    z-index: 1000;
    transition: color 0.3s ease-out;
  }

  .circle {
    width: 131px;
    height: 131px;
    border-radius: 50%;
    background: #fff;
    border: 2px solid var(--bg-color);
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 1;
    transition: all 0.3s ease-out;
  }

  .circle:after {
    content: "";
    width: 118px;
    height: 118px;
    display: block;
    position: absolute;
    background: var(--bg-color);
    border-radius: 50%;
    top: 5px;
    left: 5px;
    transition: opacity 0.3s ease-out;
  }

  .circle svg {
    z-index: 10000;
    transform: translateZ(0);
  }

  .overlay {
    width: 118px;
    position: absolute;
    height: 118px;
    border-radius: 50%;
    background: var(--bg-color);
    top: 70px;
    left: 110px;
    z-index: 0;
    transition: transform 0.3s ease-out;
  }
`;
