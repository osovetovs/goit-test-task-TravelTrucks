import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import Loader from "./components/Loader/Loader";
import NotFound from "./pages/NotFound/NotFound";

const Home = lazy(() => import("./pages/Home/Home"));
const Catalog = lazy(() => import("./pages/Catalog/Catalog"));
const Camper = lazy(() => import("./pages/Camper/Camper"));

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/catalog" element={<Catalog />} />

        <Route path="/catalog/:id/*" element={<Camper />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default App;