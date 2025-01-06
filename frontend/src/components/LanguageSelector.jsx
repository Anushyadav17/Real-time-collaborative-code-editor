import { useState, useEffect, useRef } from "react";
import { LANGUAGE_VERSIONS } from "../constants";

const languages = Object.entries(LANGUAGE_VERSIONS);

const LanguageSelector = ({ language, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);  // Ref to detect clicks outside the menu
  const buttonRef = useRef(null); // Ref for the button element

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (selectedLanguage) => {
    onSelect(selectedLanguage);
    setIsOpen(false);
  };

  // Close the dropdown when clicking outside the LanguageSelector
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current && !menuRef.current.contains(event.target) &&
        buttonRef.current && !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        style={{
          boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
        }}
        className="flex bg-richblack-800 p-1 gap-x-2 px-4 rounded-lg text-white hover:bg-richblack-700 focus:outline-none"
        onClick={toggleMenu}
        aria-expanded={isOpen}
        aria-controls="language-menu"
      >
        <span className="font-medium">Choose language: </span>
        <span className="text-green-400">{language}</span>
      </button>
      {isOpen && (
        <div
          id="language-menu"
          ref={menuRef}
          className="absolute w-[45%] md:w-[30%] bg-richblack-800 text-white rounded-md shadow-lg z-50 divide-y divide-richblack-700 overflow-hidden top-12 left-0 right-0 mx-auto"
        >
          {languages.map(([lang, version]) => (
            <div
              key={lang}
              className={`px-4 py-2 cursor-pointer rounded-md transition-all duration-300 ${
                lang === language ? "bg-gray-700" : "hover:bg-gray-800"
              }`}
              onClick={() => handleSelect(lang)}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">{lang}</span>
                {lang === language && (
                  <span className="text-sm text-successGreen-500">Selected</span>
                )}
              </div>
              <span className="text-sm text-gray-400">({version})</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
