import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import { useState } from "react";
import AddItem from "./AddItem";
import SearchItem from "./SearchItem";

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

  const [newItem, setNewItem] = useState("");
  const [search, setSearch] = useState("");

  const addItem = (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const newItem = { id, checked: false, item };
    const listItems = [...items, newItem];
    setAndSaveItems(listItems);
  };

  const setAndSaveItems = (newItems) => {
    setItems(newItems);
    localStorage.setItem("shoppinglist", JSON.stringify(newItems));
  };

  const handleCheck = (id) => {
    const newItems = items.map((item) => {
      if (item.id === id) {
        item.checked = !item.checked;
      }
      return item;
    });
    setAndSaveItems(newItems);
  };

  const handleDelete = (id) => {
    const newItems = items.filter((item) => item.id !== id);
    setAndSaveItems(newItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem.trim()) return;
    console.log(newItem);
    addItem(newItem);
    setNewItem("");
  };

  return (
    <div className="App">
      <Header title="Grocery List" />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem search={search} setSearch={setSearch} />
      <Content
        items={items.filter((item) =>
          item.item.toLowerCase().includes(search.toLowerCase())
        )}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
      <Footer listCount={items.length} />
    </div>
  );
}

export default App;
