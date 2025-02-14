import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../slices/example.slice";

function Homepage() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <div className="flex items-center justify-center h-screen gap-4">
      <button
        className="btn btn-success"
        aria-label="Increment value"
        onClick={() => dispatch(increment())}
      >
        Increment
      </button>
      <span className="text-6xl">
        <span>{count}</span>
      </span>
      <button
        className="btn btn-error"
        aria-label="Decrement value"
        onClick={() => dispatch(decrement())}
      >
        Decrement
      </button>
    </div>
  );
}

export default Homepage;
