import { useEffect, useState, useRef, useCallback } from "react";

import { styles } from "../../constants/styles";
import { navLinks } from "../../constants";
import { logo, menu, close } from "../../assets";
import { config } from "../../constants/config";

const Navbar = () => {
  const [active, setActive] = useState<string | null>();
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const rafRef = useRef<number>(0);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      // Use rAF for smooth, non-blocking scroll updates
      if (rafRef.current) return;
      
      rafRef.current = requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        lastScrollY.current = scrollTop;
        
        setScrolled(scrollTop > 100);
        if (scrollTop <= 100) {
          setActive("");
        }

        // Section highlighting
        const sections = document.querySelectorAll("section[id]");
        sections.forEach((current) => {
          const sectionId = current.getAttribute("id");
          // @ts-ignore
          const sectionHeight = current.offsetHeight;
          const sectionTop =
            current.getBoundingClientRect().top - sectionHeight * 0.2;

          if (sectionTop < 0 && sectionTop + sectionHeight > 0) {
            setActive(sectionId);
          }
        });

        rafRef.current = 0;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const handleLogoClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <nav
      className={`${
        styles.paddingX
      } fixed top-0 z-20 flex w-full items-center py-5 transition-colors duration-300 ${
        scrolled ? "bg-primary/95 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
        <a
          href="#"
          className="flex items-center gap-2"
          onClick={(e) => {
            e.preventDefault();
            handleLogoClick();
          }}
        >
          <img src={logo} alt="logo" className="h-9 w-9 object-contain" />
          <p className="flex cursor-pointer text-[18px] font-bold text-white ">
            {config.html.title}
          </p>
        </a>

        <ul className="hidden list-none flex-row gap-10 sm:flex">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.id ? "text-white" : "text-secondary"
              } cursor-pointer text-[18px] font-medium transition-colors duration-200`}
            >
              <a href={`#${nav.id}`} className="hover-link">
                <span className="hover-in">
                  {nav.title}
                  <div className="text-white">{nav.title}</div>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="flex flex-1 items-center justify-end sm:hidden">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="h-[28px] w-[28px] object-contain"
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } black-gradient absolute right-0 top-20 z-10 mx-4 my-2 min-w-[140px] rounded-xl p-6`}
          >
            <ul className="flex flex-1 list-none flex-col items-start justify-end gap-4">
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins cursor-pointer text-[16px] font-medium ${
                    active === nav.id ? "text-white" : "text-secondary"
                  }`}
                  onClick={() => {
                    setToggle(false);
                  }}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
