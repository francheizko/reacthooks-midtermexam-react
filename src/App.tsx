import React, { useState } from 'react';

function App() {
  const [groceryList, setGroceryList] = useState<{ item: string; purchased: boolean }[]>(
    []
  );
  const [groceryItem, setGroceryItem] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroceryItem(e.target.value);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (groceryItem.trim() !== '') {
      setGroceryList([...groceryList, { item: groceryItem, purchased: false }]);
      setGroceryItem('');
      showConfirmation(); 
    }
  }

  const handleDelete = (index: number) => {
    const updatedList = [...groceryList];
    updatedList.splice(index, 1);
    setGroceryList(updatedList);
  }

  const handleCheckbox = (index: number) => {
    const updatedList = [...groceryList];
    updatedList[index].purchased = !updatedList[index].purchased;
    setGroceryList(updatedList);
  }

  const showConfirmation = () => {
    window.alert('Item added to the basket. Enjoy your shopping!'); 
  }

  return (
    <section className='section-center'>
      <form className='grocery-form' onSubmit={handleSubmit}>
        <h3>grocery bud</h3>
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
    </section>
  );
}

export default App;
