import { useEffect } from "react";
import { useState } from "react";
import Tours from "./Tours";
import Loading from "./assets/Loading";

const url = "https://course-api.com/react-tours-project";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [tours, setTours] = useState([]);

  const fetchTours = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const tours = await response.json();
      setIsLoading(false);
      setTours(tours);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const removeTour = (id) => {
    const filteredTours = tours.filter((tour) => tour.id !== id);
    setTours(filteredTours);
  };

  useEffect(() => {
    fetchTours();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (tours.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>No tours left</h2>
          <button
            className="btn"
            onClick={fetchTours}
            style={{ marginTop: "30px" }}
          >
            Refresh
          </button>
        </div>
      </main>
    );
  }
  return (
    <main>
      <Tours tours={tours} removeTour={removeTour} />;
    </main>
  );
};
export default App;
