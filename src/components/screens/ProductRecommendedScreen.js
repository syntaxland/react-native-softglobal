// ProductRecommendedScreen.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProductRecommendations } from '../../actions/productActions';

function ProductRecommendedScreen() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductRecommendations());
    }, [dispatch]);

    const recommendations = useSelector((state) => state.productRecommendations.recommendations);

    return (
        <div>
            <h2>Product Recommendations</h2>
            <ul>
                {recommendations.map((product) => (
                    <li key={product.id}>{product.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default ProductRecommendedScreen;
