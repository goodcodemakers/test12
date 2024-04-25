// Main.js
import React, { useState, useEffect } from 'react';

function Main() {
    const [productName, setProductName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [note, setNote] = useState('');
    const [stockItems, setStockItems] = useState([]);

    useEffect(() => {
        fetchStockItems();
    }, []);

    const fetchStockItems = () => {
        fetch('/stockItems')
            .then(response => response.json())
            .then(data => setStockItems(data))
            .catch(error => console.error('Error fetching stock items:', error));
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        if (!productName.trim() || !quantity.trim()) {
            alert('제품명과 수량은 필수 입력 항목입니다.');
            return;
        }

        const newStockItem = {
            productName: productName.trim(),
            quantity: parseInt(quantity),
            note: note.trim()
        };

        fetch('/stockItems', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newStockItem),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Stock item added successfully:', data);
            fetchStockItems(); // 재고 목록 갱신
            setProductName('');
            setQuantity('');
            setNote('');
        })
        .catch(error => console.error('Error adding stock item:', error));
    };

    const handleDeleteItem = (id) => {
        fetch(`/stockItems/${id}`, {
            method: 'DELETE',
        })
        .then(() => {
            console.log('Stock item deleted successfully:', id);
            fetchStockItems(); // 재고 목록 갱신
        })
        .catch(error => console.error('Error deleting stock item:', error));
    };

    return (
        <div className="container">
            <h1>재고 관리 시스템</h1>
            <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                    <label htmlFor="productName">제품명:</label>
                    <input
                        type="text"
                        id="productName"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="quantity">수량:</label>
                    <input
                        type="number"
                        id="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="note">비고:</label>
                    <textarea
                        id="note"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn">등록</button>
            </form>
            <h2>재고 목록</h2>
            <ul>
                {stockItems.map(item => (
                    <li key={item._id}>
                        {item.productName} - {item.quantity}개 - {item.note}
                        <button onClick={() => handleDeleteItem(item._id)} className="btn btn-delete">삭제</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Main;
