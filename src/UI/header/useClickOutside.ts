import { useEffect } from "react";

const useClickOutside = (
  ref: React.RefObject<HTMLElement>,
  callback: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
};

export default useClickOutside;

// import { useEffect, useState, useRef, RefObject } from "react";

// type UseDetectCloseReturnType = [
//   isOpen: boolean,
//   ref: RefObject<HTMLDivElement>,
//   removeHandler: () => void
// ];

// const useClickOutside = (initialState: boolean): UseDetectCloseReturnType => {
//   const [isOpen, setIsOpen] = useState<boolean>(initialState);
//   const ref = useRef<HTMLDivElement>(null);

//   const removeHandler = () => {
//     setIsOpen(false);
//   };

//   useEffect(() => {
//     const onClick = (e: MouseEvent) => {
//       if (ref.current !== null && !ref.current.contains(e.target as Node)) {
//         removeHandler();
//       }
//     };

//     if (isOpen) {
//       window.addEventListener("click", onClick);
//     }

//     return () => {
//       window.removeEventListener("click", onClick);
//     };
//   }, [isOpen]);

//   return [isOpen, ref, removeHandler];
// };

// export default useClickOutside;

// import { useEffect, useRef, useState } from "react";

// type UseClickOutsideReturnType = [React.RefObject<HTMLElement>, boolean];

// const useClickOutside = (initialState: boolean): UseClickOutsideReturnType => {
//   const ref = useRef<HTMLElement>(null);
//   const [isOutside, setIsOutside] = useState(initialState);

//   const handleClickOutside = (e: MouseEvent) => {
//     if (ref.current && !ref.current.contains(e.target as Node)) {
//       setIsOutside(true);
//     } else {
//       setIsOutside(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return [ref, isOutside];
// };

// export default useClickOutside;
