import { Link, useLocation } from "react-router";
import PageMeta from "../components/common/PageMeta";
import styled from "styled-components";
import { MdAdminPanelSettings, MdDarkMode, MdMenu } from "react-icons/md";
import { FaSchoolFlag } from "react-icons/fa6";
import { GiTeacher } from "react-icons/gi";
import { CiLight } from "react-icons/ci";
import { useTheme } from "../context/ThemeContext";
import { useRef, useState } from "react";

export default function Home() {
  const params = useLocation();
  const themeData = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const howToRef = useRef(null);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/admin", label: "Admin" },
    { to: "/department", label: "Department" },
    { to: "/faculty", label: "Faculty" },
    { to: "", label: "How to" },
  ];

  return (
    <>
      <PageMeta
        title="SIMS - Student Internals Management System"
        description="SIMS - Student Internals Management System"
      />
      <div className="snap-y snap-mandatory overflow-y-scroll h-screen">
        {/* Hero Section with Navbar */}
        <section className="relative h-screen snap-always snap-center">
          <nav className="bg-transparent absolute w-full z-10">
            <div className="lg:p-2.5 p-4 flex justify-between items-center lg:mx-8">
              {/* Logo */}
              <img
                src={"/images/logo/logo-icon.svg"}
                alt="SIMS"
                className="h-10 lg:h-12"
              />
              
              {/* Mobile Menu Button */}
              <div className="lg:hidden flex items-center">
                <button
                  className="text-gray-600 dark:text-gray-25 mr-4"
                  onClick={toggleMobileMenu}
                >
                  <MdMenu size={28} />
                </button>
                <div className="ml-2">
                  {themeData.theme === "light" ? (
                    <button onClick={() => themeData.toggleTheme()}>
                      <CiLight size={28} />
                    </button>
                  ) : (
                    <button onClick={() => themeData.toggleTheme()}>
                      <MdDarkMode size={28} />
                    </button>
                  )}
                </div>
              </div>
              
              {/* Desktop Links */}
              <div className="hidden lg:flex lg:flex-row items-center space-x-8 ml-auto">
                {navLinks.map((link) => (
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
                <div className="ml-4">
                  {themeData.theme === "light" ? (
                    <button onClick={() => themeData.toggleTheme()}>
                      <CiLight size={28} />
                    </button>
                  ) : (
                    <button onClick={() => themeData.toggleTheme()}>
                      <MdDarkMode size={28} />
                    </button>
                  )}
                </div>
              </div>
            </div>
            
            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <div className="lg:hidden bg-white dark:bg-gray-800 shadow-lg rounded-lg mx-4 mt-2 p-4">
                <div className="flex flex-col space-y-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={`text-gray-600 dark:text-gray-25 text-lg hover:text-gray-900 dark:hover:text-gray-100 ${
                        link.to === params.pathname ? "font-bold underline" : ""
                      }`}
                      onClick={() => {
                        if (link.to === "" && howToRef.current) {
                          howToRef.current.scrollIntoView({ behavior: "smooth" });
                        }
                        setMobileMenuOpen(false);
                      }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </nav>
          
          <div className="h-screen grid lg:grid-cols-2 grid-cols-1 lg:gap-8 px-4 lg:px-12 mx-auto bg-blue-200 dark:bg-blue-300">
            {/* Text */}
            <div className="flex text-gray-900 flex-col justify-center items-center lg:items-start col-span-1 lg:mt-0 mt-24 px-4">
              <h1 className="lg:text-9xl text-5xl md:text-6xl font-bold">SIMS</h1>
              <p className="lg:text-3xl text-xl md:text-2xl text-gray-600 text-center lg:text-left">
                Student Internals Management System
              </p>
              <div className="mt-4">
                <p className="text-sm md:text-md text-justify text-gray-600 dark:text-gray-25">
                  Effortlessly manage internal marks, faculty assignments, and
                  academic records—all in one place.
                </p>
                <p className="text-sm md:text-md text-justify text-gray-600 dark:text-gray-25 mt-2">
                  Designed for educational institutions, SIMS ensures accuracy,
                  transparency, and seamless collaboration between faculty,
                  departments, and administrators.
                </p>
              </div>
            </div>
            {/* Image */}
            <div className="col-span-1 flex justify-center items-center lg:mt-0 mt-4">
              <img 
                src="/SIMS_hero.svg" 
                alt="" 
                className="w-full max-w-md lg:max-w-full lg:size-4/5" 
              />
            </div>
          </div>
        </section>
        
        {/* Portals */}
        <section className="p-4 lg:p-10 h-auto lg:h-screen snap-always snap-center">
          {/* Title */}
          <h1 className="text-2xl lg:text-4xl underline text-center font-bold my-6 lg:m-10 text-gray-900 dark:text-gray-25">
            Portals that we offer
          </h1>
          {/* Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 p-4 lg:p-10 content-center gap-8 justify-center uppercase">
            {/* Admin Portal */}
            <Link to="/admin">
              <StyledWrapper className="flex justify-center items-center">
                <div className="card wallet">
                  <div className="overlay" />
                  <div className="circle">
                    <MdAdminPanelSettings className="cardIcon" size={50} />
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
          className="p-4 lg:p-10 h-auto lg:h-3/4 snap-always snap-start bg-blue-200 dark:bg-blue-400"
        >
          {/* Title */}
          <h1 className="text-2xl lg:text-4xl underline text-center font-bold my-6 lg:m-10 text-gray-900 dark:text-gray-25">
            Features that we promise to deliver
          </h1>
          {/* Cards */}
          <StyledCardWrapper>
            <div className="container mx-auto p-4 lg:p-10"></div>
          </StyledCardWrapper>
        </section>
        
        {/* Footer */}
        <footer className="text-center backdrop:backdrop-blur-2xl text-base-content p-4 bg-white dark:bg-gray-800">
          <aside>
            <p className="text-gray-900 dark:text-gray-25 text-sm lg:text-base">
              Copyright © {new Date().getFullYear()} - All right reserved by SIMS
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
    width: 100%;
    max-width: 340px;
    height: 280px;
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    box-shadow: 0 14px 26px rgba(0, 0, 0, 0.04);
    transition: all 0.3s ease-out;
    text-decoration: none;
    margin: 0 auto;
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
    width: 110px;
    height: 110px;
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
    width: 100px;
    height: 100px;
    display: block;
    position: absolute;
    background: var(--bg-color);
    border-radius: 50%;
    top: 3px;
    left: 3px;
    transition: opacity 0.3s ease-out;
  }

  .circle svg {
    z-index: 10000;
    transform: translateZ(0);
  }

  .overlay {
    width: 100px;
    position: absolute;
    height: 100px;
    border-radius: 50%;
    background: var(--bg-color);
    top: 60px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 0;
    transition: transform 0.3s ease-out;
  }

  @media (max-width: 768px) {
    .card {
      height: 250px;
    }
    
    .circle {
      width: 90px;
      height: 90px;
    }
    
    .circle:after {
      width: 80px;
      height: 80px;
    }
    
    .overlay {
      width: 80px;
      height: 80px;
    }
  }
`;