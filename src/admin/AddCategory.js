import React, {useState} from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth';
import {Link} from 'react-router-dom';
import {createCategory} from './apiAdmin'

const AddCategory = () => {
    const [name, setName] = useState('')
    const [error, setError] = useState(false)
    const [sucess, setSucess] = useState(false)

    // destructure user and token from localstorage
    const {user, token} = isAuthenticated();

    const handleChange = (e) => {
        setError('')
        setName(e.target.value)
    }

    const clickSubmit = (e) => {
        e.preventDefault()
        setError('')
        setSucess(false)
        // make request to api crete category
        createCategory(user._id, token, {name}).
            then(data => {
              if(data.error) {
                 setError(true); 
              }else{
                  setError("");
                  setSucess(true);
              }
            });
    }

    const newCategoryForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Nome</label>
                <input type="text" 
                  className="form-control" 
                  onChange={handleChange} 
                  value={name}
                  autoFocus
                  required
               />
               <button className="btn btn-outline-primary">
                   Criar Categoria
               </button>
            </div>
        </form>
    );

    const showSucess = () => {
        if(sucess) {
            return <h3 className="text-success">Categoria {name} Criada</h3>
        }
    };

    const showError = () => {
        if(error) {
            return <h3 className="text-danger">Categoria já Existente</h3>
        }
    };

    const goBack = () => (
        <div className="mt-5">
            <Link to="/admin/dashboard" className="text-warning">
               Voltar ao Dashboard 
            </Link>
        </div>
    );

    return (

            <Layout title="Criar Categoria" 
               description={` Seja bem vindo ${user.name}, pronto para criar uma categoria`} 
            >    
            
            <div className="row">         
                <div className="col-md-8 offset-md-2">
                   {showSucess()}
                   {showError()}
                   {newCategoryForm()}
                   {goBack()}
                </div>
            </div>
    
            </Layout>
    
    );
};

export default AddCategory;