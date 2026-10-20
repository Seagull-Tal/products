import { useState } from 'react';
import './App.css';
import ProductItem from './components/ProductItem/ProductItem';

const MAX_COUNT = 25;

function App() {
  const data = [
    { id: 1, name: 'Велосипед', price: 1000, count: 1 },
    { id: 2, name: 'Самокат', price: 700, count: 1 },
    { id: 3, name: 'Ролики', price: 1300, count: 2 },
    { id: 4, name: 'Сноуборд', price: 19000, count: 4 },
  ];

  const [products, setProducts] = useState(data);

  const addProduct = () => {
    const answer = prompt('Введите название и цену, например: Велосипед 1000');

    if (!answer || !answer.trim()) return;

    const parts = answer.trim().split(' ');
    const price = Number(parts[parts.length - 1]);
    const name = parts.slice(0, -1).join(' ');

    if (!name || isNaN(price)) {
      alert('Неверный формат. Пример: Велосипед 1000');
      return;
    }

    const newProduct = {
      id: Date.now(),
      name: name,
      price: price,
      count: 1,
    };

    setProducts([...products, newProduct]);
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((item) => item.id !== id));
  };

  const changeCount = (id, delta) => {
    const product = products.find((item) => item.id === id);
    const newCount = product.count + delta;

    // Больше 25 записать нельзя
    if (newCount > MAX_COUNT) return;

    // Если count стал 0 — удаляем товар
    if (newCount === 0) {
      deleteProduct(id);
      return;
    }

    setProducts(
        products.map((item) =>
            item.id === id ? { ...item, count: newCount } : item
        )
    );
  };

  return (
      <div className="app">
        <button className="add-btn" onClick={addProduct}>
          Добавить товар
        </button>
        <div className="list">
          {products.map((item) => (
              <ProductItem
                  key={item.id}
                  name={item.name}
                  price={item.price}
                  count={item.count}
                  onIncrement={() => changeCount(item.id, 1)}
                  onDecrement={() => changeCount(item.id, -1)}
                  onDelete={() => deleteProduct(item.id)}
              />
          ))}
        </div>
      </div>
  );
}

export default App;