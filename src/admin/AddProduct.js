import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth';
import {Link} from 'react-router-dom';
import {createProduct, getCategories} from './apiAdmin'

const AddProduct = () => {
    const { user, token } = isAuthenticated();
    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        shipping: '',
        quantity: '',
        photo: '',
        loading: false,
        error: '',
        createdProduct: '',
        redirectToProfile: false,
        formData: ''
    });
    
    const {
        name,
        description,
        price,
        categories,
        category,
        shipping,
        quantity,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } = values
    
    // load categories and set form data
    const init = () => {
        getCategories().then(data => {
            if(data.error) {
                setValues({...values, error: data.error});
            }else{
                setValues({
                  ...values,
                  categories: data,
                  formData: new FormData()
                });
            }
        });
    };

    useEffect(() => {
        init();
    }, [])

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value
        formData.set(name, value)
        setValues({...values, [name]: value});
    }

    const clickSubmit = (event) => {
        event.preventDefault()
        setValues({...values, error: '', loading: true})

        createProduct(user._id, token, formData)
        .then(data => {
            if(data.error) {
                setValues({...values, error: data.error})
            }else{
                setValues({
                    ...values, 
                     name: '',
                      description: '',
                      photo: '',
                      price : '',
                      quantity: '',
                      loading: false,
                      createdProduct: data.name

                })
            }
        })
    };

    const newPostForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}>
            <h4>Adicionar Imagem</h4>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input onChange={handleChange('photo')} 
                           type="file" 
                           name="photo" 
                           aceept="image/*" />
                </label>
            </div>
        

        <div className="form-group">
            <label className="text-muted">Nome</label>
            <input onChange={handleChange('name')} 
            type="text" 
            className="form-control" 
            value={name} />
        </div>

        <div className="form-group">
            <label className="text-muted">Descrição</label>
            <input onChange={handleChange('description')} 
            className="form-control" 
            value={description} />
        </div>

        <div className="form-group">
            <label className="text-muted">Preço</label>
            <input onChange={handleChange('price')} 
            type="number" 
            className="form-control" 
            value={price} />
        </div>

        <div className="form-group">
            <label className="text-muted">Categoria</label>
            <select 
                    onChange={handleChange('category')} 
                    className="form-control" 
            >  
            <option>Selecionar Categoria</option>    
                {categories &&
                      categories.map((c,i) => (
                      <option key={i} value={c._id}>
                          {c.name}
                      </option>
                      ))}
            </select>
        </div>

        <div className="form-group">
            <label className="text-muted">Frete</label>
            <select 
                    onChange={handleChange('shipping')} 
                    className="form-control" 
            >
            <option>Selecionar Opcao</option>       
                <option value="0">Não</option>
                <option value="1">Sim</option>
            </select>
        </div>

        <div className="form-group">
            <label className="text-muted">Quantidade</label>
            <input onChange={handleChange('quantity')} 
            type="number" 
            className="form-control" 
            value={quantity} />
        </div>
         
        <button className="btn btn-outline-primary">Criar Produto</button> 

        </form>
    );

    const showError = () => (
        <div
           className="alert alert-danger"
           style={{ display: error ? '' : "none"}}
        >
            {error}
        </div> 
    );

    const showSuccess = () => (
        <div
           className="alert alert-info"
           style={{ display: createdProduct ? '' : "none"}}
        >
            <h2>{`${createdProduct}`} produto criado!</h2>
        </div> 
    );

    const showLoading = () => (
        loading && (<div className="alert.alert-sucess">
            <h2>Carregando...</h2>
        </div>
        )
    );

    return (
        <Layout title="Criar Produto" 
        description={` Seja bem vindo ${user.name}, pronto para criar um produto`} 
     >    
     
     <div className="row">         
         <div className="col-md-8 offset-md-2">
           {showLoading()}
           {showSuccess()}
           {showError()}  
           {newPostForm()}
         </div>
     </div>

     </Layout>
    )
}

export default AddProduct