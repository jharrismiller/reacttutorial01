import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import { useState } from "react";

function App() {

  const [items, setItems] = useState(
    localStorage.getItem("shoppinglist")
      ? JSON.parse(localStorage.getItem("shoppinglist"))
      : [
          { id: 1, checked: false, item: "Item A" },
          { id: 2, checked: true, item: "Item B" },
          { id: 3, checked: false, item: "Item C" },
        ]
  );

  const handleCheck = (id) => {
    const newItems = items.map((item) => {
      if (item.id === id) {
        item.checked = !item.checked;
      }
      return item;
    });
    setItems(newItems);
    localStorage.setItem("shoppinglist", JSON.stringify(newItems));
  };

  const handleDelete = (id) => {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
  };

  return (
    <div className="App">
      <Header title="Grocery List" />
      <Content
        items={items}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
      <Footer listCount={items.length}/>
    </div>
  );
}

export default App;
