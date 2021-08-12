import "./styles.css";
import { useState, useEffect } from "react";

// https://randomuser.me/api/?results=20
// page = 1, per_page = 15
//
// useUsersInfo should accept page, per_page = 15 -  1  - 1 to 15
// page 2 - 16 to 30

// return function to retrieve the users info
// and data

// useUsersInfo returns the data, retrieveUsers func

export const useDebounce = (fn, interval) => {
  let timer;
  const debounceFn = (...args) => {
    let context = this;
    let arg = [...args];
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, arg);
    }, interval);
  };
  return debounceFn;
};

export const useThrottle = (fn, interval) => {
  let timer = true;
  const throttleFn = (...args) => {
    let context = this;
    let arg = [...args];
    if (timer) {
      timer = false;
      setTimeout(() => {
        timer = true;
        fn.apply(context, arg);
      }, interval);
    }
  };
  return throttleFn;
};

export const useUsersInfo = (initialValue) => {
  const [data, setData] = useState(initialValue);

  // useDebounce
  const handleData = () => {
    console.log("test");
    // fetch(`https://randomuser.me/api/?results=${initialValue}`)
    //   .then((res) => res.json())
    //   .then((data) => setData(data));
  };
  const debouncedfn = useThrottle(handleData, 2000);

  return [data, debouncedfn];
};

export default function App() {
  const [value, setValue] = useState(0);

  const [data, handleData] = useUsersInfo(value);

  return (
    <div className="App">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={handleData}>fetch</button>
      <pre>{JSON.stringify(data, 0, 4)}</pre>
    </div>
  );
}
