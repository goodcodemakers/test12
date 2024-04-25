import React, { useState, useEffect } from 'react';
function Main() {
    return(
        <div>
            <h1>재고 관리 시스템</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="productName">제품명:</label>
                    <input
                        type="text"
                        id="productName"
                        required
                    />
                    </div>
                <div className="form-group">
                    <label htmlFor="quantity">수량:</label>
                    <input
                        type="number"
                        id="quantity"
                        required
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='note'>비고</label>
                    <input
                        type="text"
                        id="note"
                    />
                </div>
            </form>
        </div>
        
    );
    
}
export default Main;