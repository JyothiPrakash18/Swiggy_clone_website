import React, {   useEffect, useState } from 'react';
import SideMenu from './SideMenu';
import ProductList from './ProductList';
import CartItems from './CartItems';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getBranchInfo } from '../../store/apis/branchesApis';

const Products = () => {
    const dispatch = useDispatch();
    const {  id} = useParams();
    const [loader, setLoader] = useState(true);
    const {category, subCategory, products} = useSelector(state => state.branches);
    console.log( category, subCategory, products)
    const { items } = useSelector((state) => state.products);


    const fetchBranchDetails = async () => {
        try {
            setLoader(true);
            console.log('Fetching branch details for id:', id);
            await dispatch(getBranchInfo({id}));
            setLoader(false);
        } catch (error) {
            console.error('Error fetching branch details:', error);
        }
    };
    

    useEffect(() => {
        fetchBranchDetails(id);
        return () => {
            // eventHandling.remove();
        };
    }, [id, dispatch]); 

    return (
        <div className="page_container body_bg_color">
            <section className="product_listing">
                <div className="mi_container">
                    {items.length > 0 ?
                    <>
                    <div className="product_list_grid three_column">
                        <SideMenu />
                        <ProductList id={id}/>
                        <CartItems page='productPage' id={id}/>     
                    </div>
                    </>
                     :
                    <>
                    <div className="product_list_grid">
                        <SideMenu />
                        <ProductList />
                    </div>
                    </> }
                    
                </div>
            </section>
        </div>
    );
};

export default Products;
