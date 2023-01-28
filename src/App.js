import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { AnimatePresence } from "framer-motion";

import Particles from "react-particles";
import { loadFull } from "tsparticles";

import Down from "./components/down";
import Footer from "./components/footer";
import Header from "./components/header";
import { useSwipeable } from "react-swipeable";

const Layout = ({ children }) => {
  const routes = ["/", "/skills", "/experience", "/contact"];

  const [nextRoute, setNextRoute] = useState("");
  const [prevRoute, setPrevRoute] = useState("");

  const router = useRouter();

  useEffect(() => {
    const routeIndex = routes.indexOf(router.route);
    const nextRouteIndex = routeIndex + 1;

    if (routeIndex != -1 && nextRouteIndex < routes.length) {
      setNextRoute(routes[nextRouteIndex]);
    }

    // find prev route

    const prevRouteIndex = routeIndex - 1;

    if (routeIndex != -1 && prevRouteIndex != -1) {
      setPrevRoute(routes[prevRouteIndex]);
    }

  }, [router.route]);

  const handlers = useSwipeable({
    onSwipedUp: (eventData) => { router.push(nextRoute) },
    onSwipedDown: (eventData) => { router.push(prevRoute) },
    delta: 125,                             // min distance(px) before a swipe starts. *See Notes*
    preventScrollOnSwipe: false,           // prevents scroll during swipe (*See Details*)
    trackTouch: true,                      // track touch input
    trackMouse: true,                     // track mouse input
    rotationAngle: 0,                      // set a rotation angle
    swipeDuration: 250,               // allowable duration of a swipe (ms). *See Notes*
    touchEventOptions: { passive: true },  // options for touch listeners (*See Details*)
  });

  // const router = useRouter();

  const [showFooter, setShowFooter] = useState(false);
  const [showAngle, setShowAngle] = useState(true);

  useEffect(() => {
    if (router.route == "/contact" || router.route == "/404") {
      showAngle && setShowAngle(false);
      !showFooter && setShowFooter(true);
    } else {
      !showAngle && setShowAngle(true);
      showFooter && setShowFooter(false);
    }
  }, [router.route]);

  const particlesInit = useCallback(async engine => {
    // console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async container => {
    // await console.log(container);
  }, []);


  return (
    <main className="main noselect" {...handlers}>
      <Header />
      {children}

      {showAngle && <Down />}
      {showFooter && <Footer />}
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          fpsLimit: 90,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: false,
            },
            modes: {
              push: {
                quantity: 1,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#BEBEBE",
            },
            links: {
              color: "#BEBEBE",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            collisions: {
              enable: false,
            },
            move: {
              directions: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 0.7,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 600,
              },
              value: 25,
            },
            opacity: {
              value: 1,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
      />
    </main >
  );
};

export default Layout;
