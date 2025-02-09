import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import AddItem from "./AddItem";
import SearchItem from "./SearchItem";
import apiRequest from "./apiRequest";

function App() {
  const API_URL = "http://localhost:3500/items";

  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [search, setSearch] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw Error("Did not recieve expected data");
        }
        const listItems = await response.json();
        setItems(listItems);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchItems();
  }, []);

  const addItem = async (item) => {
    const id = items.length ? parseInt(items[items.length - 1].id, 0) + 1 : 1;
    const newItem = { id, checked: false, item };
    console.log(newItem);
    const listItems = [...items, newItem];
    setItems(listItems);

    const postOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    };

    const result = await apiRequest(API_URL, postOptions);

    if (result) setFetchError(result);
  };

  const handleCheck = async (id) => {
    let theItem = null;
    const newItems = items.map((item) => {
      if (item.id === id) {
        item.checked = !item.checked;
        theItem = item;
      }
      return item;
    });

    setItems(newItems);

    const updateOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ checked: theItem.checked }),
    };

    const result = await apiRequest(`${API_URL}/${theItem.id}`, updateOptions);

    if (result) setFetchError(result);
  };

  const handleDelete = async (id) => {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);

    const deleteOptions = { method: "DELETE" };

    const result = await apiRequest(`${API_URL}/${id}`, deleteOptions);

    if (result) setFetchError(result);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem.trim()) return;
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
      <main>
        {isLoading && <p>Loading...</p>}

        {fetchError && <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>}
        {!fetchError && !isLoading && (
          <Content
            items={items.filter((item) =>
              item.item.toLowerCase().includes(search.toLowerCase())
            )}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
          />
        )}
      </main>
      <Footer listCount={items.length} />
    </div>
  );
}

export default App;
