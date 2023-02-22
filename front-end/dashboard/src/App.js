import homePage from './pages/homePage';
import resultPage from './pages/resultPage';
import Route from './Route';
import './pages/App.css';

function App(){
    return (
      <div>
        <Route path = "/">
          {homePage()}
        </Route>
        <Route path = "/result">
          {resultPage()}
        </Route>
      </div>
    );
}

export default App;