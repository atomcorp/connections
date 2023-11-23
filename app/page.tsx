import Game from "@/components/Game";

export default function Home() {
  return (
    <div
      style={{
        display: "grid",
        placeContent: "center",
        height: "100%",
      }}
    >
      <Game />
    </div>
  );
}
