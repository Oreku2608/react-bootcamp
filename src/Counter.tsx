import { useState } from "react";

export const Counter = () => {
  const [counter, setCounter] = useState(0);
  const increment = () => {
    setCounter((old) => old + 1);
  };
  const decrement = () => {
    setCounter((old) => old - 1);
  };
  return (
    <>
      <h1>Counter: {counter}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </>
  );
};
