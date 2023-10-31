import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const storedGroceryList = localStorage.getItem('groceryList');
  const initialGroceryList = storedGroceryList ? JSON.parse(storedGroceryList) : [];

  const [groceryList, setGroceryList] = useState<{ item: string; purchased: boolean }[]>(
    initialGroceryList
  );
  const [groceryItem, setGroceryItem] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setGroceryItem(e.target.value);
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (groceryItem.trim() !== '') {
      setGroceryList([...groceryList, { item: groceryItem, purchased: false }]);
      setGroceryItem('');
      submitalert();
    } else {
      erroralert();
    }
  }

  const handleDelete = (index: number) => {
    const updatedList = [...groceryList];
    updatedList.splice(index, 1);
    setGroceryList(updatedList);
    deletealert();
  }

  const handleCheckbox = (index: number) => {
    const updatedList = [...groceryList];
    updatedList[index].purchased = !updatedList[index].purchased;
    setGroceryList(updatedList);
  }

  const submitalert = () => {
    toast.success('Item Added To The List!', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  const deletealert = () => {
    toast.success('Item Deleted', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  const erroralert = () => {
    toast.error('Please Provide Value', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  useEffect(() => {
    localStorage.setItem('groceryList', JSON.stringify(groceryList));
  }, [groceryList]);

  return (
    <section className='section-center'>
      <form className='grocery-form' onSubmit={handleSubmit}>
        <p className='header1'>Grocery Bud</p>
        <div className='form-control'>
          <input
            type='text'
            className='grocery'
            value={groceryItem}
            onChange={handleInputChange}
          />
          <button type='submit' className='submit-btn'>
            Add Item
          </button>
        </div>
      </form>
      <div className='grocery-container'>
        <ul>
          {groceryList.map((itemData, index) => (
            <li key={index} className={`grocery-item ${itemData.purchased ? 'purchased' : ''}`}>
              <div>
                <input
                  type="checkbox"
                  onChange={() => handleCheckbox(index)}
                  checked={itemData.purchased}
                />
                <span className='title'>{itemData.item}</span>
              </div>
              <button
                className='delete-btn'
                onClick={() => handleDelete(index)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      <ToastContainer/>
    </section>
  );
}

export default App;
