import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Interface from "./components/Interface";
import "bootstrap/dist/css/bootstrap.min.css";
import "./scss/custom.scss";

const App = () => {
  return (
    <div>
      <Header />
      <Interface />
      <Footer />
    </div>
  );
};

export default App;
