import AddColumn from './AddColumn';
import './App.css';
import Column from './Column';
function App() {
  return (
    <div className="App">
      <Column items = {[{name:' Изучить js',id:0},{name:'Изучить js',id:1},{name:'Изучить js',id:2},{name:'Изучить js',id:3}]} header="JS"/>
      <Column items = {[{name:'Изучить js',id:0},{name:'Изучить js',id:1},{name:'Изучить js',id:2},{name:'Изучить js',id:3}]}  header="CSS"/>
       <Column items = {[{name:'Изучить js',id:0},{name:'Изучить js',id:1},{name:'Изучить js',id:2},{name:'Изучить js',id:3},{name:'Изучить js',id:4},{name:'Изучить js',id:5}]}  header="HTML"/>
      <AddColumn/>

    </div>
  );
}

export default App;
