import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FibonacciPage } from "../fibonacci-page/fibonacci-page";
import { ListPage } from "../list-page/list-page";
import { MainPage } from "../main-page/main-page";
import { QueuePage } from "../queue-page/queue-page";
import { StringComponent } from "../string-page/string-page";
import { SortingPage } from "../sorting-page/sorting-page";
import { StackPage } from "../stack-page/stack-page";
import styles from "./app.module.css";

function App() {
  return (
    <div className={styles.app}>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/recursion" element={<StringComponent />} />
          <Route path="/fibonacci" element={<FibonacciPage />} />
          <Route path="/sorting" element={<SortingPage />} />
          <Route path="/stack" element={<StackPage />} />
          <Route path="/queue" element={<QueuePage />} />
          <Route path="/list" element={<ListPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
