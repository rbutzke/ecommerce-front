import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import Layout from "./Layout";
import { getCart } from './cartHelpers';
import Card from './Card';

const Cart = () => {
    const [items, setItems] = useState([])

    useEffect(() => {
        setItems(getCart())
    }, [])

    const showItems = items => {
        return (
            <div>
                <h2>Seu Carrinho tem {`${items.length}`} items </h2>
                <hr />
                {items.map((product, i) => 
                (<Card 
                      key={i} 
                      product={product}
                      showAddToCardButton = {false} />))}
            </div>
        );
    };
    
    const noItemsMessage = () => (
        <h2>
            Carrinho Vazio. <br /> <Link to='/shop'>Continue a compra</Link>
        </h2>
    );

    return (
        <Layout title="Carrinho de Compras" 
                description="Gerecie seu carrinho , adicionando , removendo e continue comprando" 
                className="container-fluid">

            <div className='row'>
                <div className='col-6'>
                    {items.length > 0 ? showItems(items) : noItemsMessage()}
                </div>

                <div className='col-6'>
                    <p>Mostrar opcoes de checkout</p>
                </div>
            </div>

        </Layout>
     );
};

export default Cart;