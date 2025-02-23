import "./App.css";
import ProgressBar from "./components/ProgressBar";

function App() {
  const bars = [1, 4, 5, 10, 15, 25, 40, 50, 65, 75, 90, 100];
  return (
    <>
      <h1>Progress Bar</h1>
      {bars.map((bar) => (
        <ProgressBar progress={bar} key={bar} />
      ))}
    </>
  );
}

export default App;
