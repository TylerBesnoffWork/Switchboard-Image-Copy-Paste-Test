import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <button onClick={() => navigate("/text")}>Text Example</button>
      <button onClick={() => navigate("/image")}>Image Example</button>
      <button onClick={() => navigate("/switchboard")}>Switchboard Example</button>
    </>
  );
};

export default Home;
