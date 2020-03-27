import React, {useState} from 'react'
import { FiLogIn } from 'react-icons/fi'
import heroesImg from '../../assets/heroes.png'
import logoImg from '../../assets/logo.svg'
import './styles.css'
import { Link, useHistory} from 'react-router-dom'
import api from '../../services/api'

export default function Login() {
    const [id, setId] = useState('')
   const history = useHistory()

    async function handleLogin(e) {
        e.preventDefault()

        try {
            const response = await api.post('/sessions', {id})
            console.log(response.data.name)
            localStorage.setItem('ongId', id)
            localStorage.setItem('ongName', response.data.name)
            history.push('/profile')
        } catch (e){
            alert('Could not log in')
        }
    }
    return (
        <div className="login-container">
            <section className="form">
                <img src={logoImg} alt = "logo"/>
                <form onSubmit={handleLogin}>
                    <h1>Login</h1>
                    
                    <input placeholder= "Your ID"
                    value ={id}
                    onChange={e => setId(e.target.value)}
                    />
                    <button type ="submit" class = "button">Login</button>

                    <Link to="/register" className="back-link">
                        <FiLogIn size={16} color="#E02041"/>
                        I'm not registered
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt= "Heroes"/>
        </div>
    )
}