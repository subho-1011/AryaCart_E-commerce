import { PiMoonStarsDuotone } from "react-icons/pi";
import { IoSunnyOutline } from "react-icons/io5";
import { PiMonitorDuotone } from "react-icons/pi";

const themes = [
  { mode: "dark", Icon: PiMoonStarsDuotone ,id:1},
  { mode: "light", Icon: IoSunnyOutline  ,id:2},
  { mode: "system", Icon: PiMonitorDuotone ,id:3},
];

import { useEffect, useRef, useState } from "react";

function ThemeSwitcher() {
  const [isSwitcherOpen, setIsSwitcherOpen] = useState(false);
  const [theme, setTheme] = useState();
  const ref = useRef()
  useEffect(() => {
    //just filling the theme state to not be empty
    if (!theme) {
      setTheme(themes.find((i) => i.mode === localStorage.theme));
    }
    //checking if localstorage has any data about theme
    if (!localStorage.theme) {
      localStorage.theme = "system";
    }
    
    if (
      localStorage.theme === "dark" ||
      (localStorage.theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
      ) {
        document.documentElement.classList.add("dark");
      } else if (localStorage.theme === "light") {
        document.documentElement.classList.remove("dark");
      }


      const checkIfClickedOutside = e => {
        if (ref.current && !ref.current.contains(e.target)) {
          setIsSwitcherOpen(false);
        }
      }
      document.addEventListener("click", checkIfClickedOutside)
      return () => {
        document.removeEventListener("click", checkIfClickedOutside)
      }
    }, [theme]);
    const themeHandler = () => {
      setIsSwitcherOpen((prev) => !prev)
    }
    return (
      <div ref={ref} className="relative  text-2xl border bg-white dark:bg-grayshade-400 border-grayshade-200 h-max p-1 leading-none rounded-md">
      <button onClick={themeHandler}>
        {theme && <theme.Icon className={"text-sky-500"} />}
      </button>
      <ul className={`${!isSwitcherOpen ? "hidden" : ""} z-50 w-max absolute top-12 -right-12 bg-white dark:bg-grayshade-500 border border-grayshade-300 p-5 rounded-xl`}>
        {themes.map((theme) => (
          <Theme
            key={theme.id}
            Icon={theme.Icon}
            mode={theme.mode}
            setTheme={setTheme}
          />
        ))}
      </ul>
    </div>
  );
}


function Theme({Icon,mode,setTheme}) {
    const selectThemeHandler = () => {
        // if (mode === 'system') {
        //     localStorage.removeItem('theme')
        //     setTheme({Icon,mode})
        //     return;
        // }
        localStorage.theme = `${mode}`
        setTheme({Icon,mode})
    }
  return (
    <li className={`${localStorage.theme === mode && "text-sky-500"} cursor-pointer my-2 w-full flex items-center justify-start`} onClick={selectThemeHandler}>
       <Icon className="mr-4"/>        
       <span>{mode}</span>
    </li>
  )
}

export default Theme
