import styles from './ProductItem.module.css';

function ProductItem({ name, price, count, onIncrement, onDecrement, onDelete }) {
    return (
        <div className={styles.card} onDoubleClick={onDelete}>
            <h2 className={styles.name}>{name}</h2>
            <p className={styles.price}>Price: {price}</p>
            <div
                className={styles.counter}
                onDoubleClick={(e) => e.stopPropagation()}
            >
                <button className={styles.btn} onClick={onDecrement}>-</button>
                <span>{count}</span>
                <button className={styles.btn} onClick={onIncrement}>+</button>
            </div>
        </div>
    );
}

export default ProductItem;