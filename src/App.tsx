import router from "./router/index";
import { useRoutes } from "react-router-dom";
function App() {
  function BeforeRouterEnter() {
    const outlet = useRoutes(router);
    return outlet;
  }

  return (
    <>
      <div>
        <BeforeRouterEnter />
      </div>
    </>
  );
}

export default App;
