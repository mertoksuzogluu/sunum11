import Deck from "./components/Deck";

export default function App() {
  return (
    <div style={{ position: "fixed", inset: 0, overflow: "hidden", background: "#03101f" }}>
      <Deck />
    </div>
  );
}
