import './App.css';
import ProductForm from './components/Productform';
import { ProductLists } from './components/ProductListing';


function App() {
  return (
    <div className="App">
      <ProductForm />
      <br/>
      <br/>
      <ProductLists />
    </div>
  );
}

export default App;
