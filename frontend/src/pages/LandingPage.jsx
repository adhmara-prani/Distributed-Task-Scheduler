import React from "react";
import { useNavigate } from "react-router-dom";
import DarkVeil from "../animations/DarkVeil.jsx";
import CardNav from "../animations/CardNav.jsx";
import logo from "../assets/cab-svgrepo-com.svg";

const LandingPage = () => {
  const nav = useNavigate();

  const handleGetStarted = () => {
    nav("/login");
  };

  const items = [
    {
      label: "About",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        { label: "Company", ariaLabel: "About Company" },
        { label: "Careers", ariaLabel: "About Careers" },
      ],
    },
    {
      label: "Contact",
      bgColor: "#271E37",
      textColor: "#fff",
      links: [
        { label: "Email", ariaLabel: "Email us" },
        { label: "Twitter", ariaLabel: "Twitter" },
        { label: "LinkedIn", ariaLabel: "LinkedIn" },
      ],
    },
  ];

  return (
    <section className="relative min-h-screen bg-[#09122C] overflow-hidden">
      <DarkVeil hueShift={150} scanlineFrequency={0.5} />
      {/* Nav */}

      <div className="relative z-10 flex min-h-screen flex-col">
        <nav>
          <CardNav
            logo={logo}
            logoAlt="Dispatch"
            items={items}
            baseColor="#fff"
            menuColor="#000"
            buttonBgColor="#111"
            buttonTextColor="#fff"
            ease="power3.out"
            onGetStarted={handleGetStarted}
          />
        </nav>

        {/* Main */}
        <main className="flex-1 flex items-center justify-center text-center">
          <div>
            <h1
              className="text-white
          font-bold
          text-3xl
          sm:text-4xl
          md:text-5xl
          lg:text-6xl
          max-w-3xl"
            >
              Smart and Safe rides just for you
              <h1 className="text-[16px] mt-4 text-center">
                Because sometimes the hardest part isn’t responding — it’s
                choosing who to send
              </h1>
            </h1>

            <div className="text-white flex gap-10 justify-center items-center mt-5 w-full h-10">
              <button className="bg-green-500 md:inline-flex border-0 rounded-3xl px-8 items-center h-full font-medium cursor-pointer transition-colors duration-300">
                Learn More
              </button>
              <button
                onClick={handleGetStarted}
                className="md:inline-flex border-0 rounded-3xl px-8 items-center h-full font-medium cursor-pointer transition-colors duration-300 bg-[#152860]"
              >
                Get Started
              </button>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};

export default LandingPage;
