import React, {useState} from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import logoImg from '../../assets/logo.svg'
import './styles.css'
import { Link, useHistory } from 'react-router-dom'
import api from '../../services/api'

export default function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [whats, setWhats] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    
    const history = useHistory()

    async function handleRegister(e) {
        e.preventDefault()

        const data = {
            name,
            email,
            whats,
            city,
            state,
        }

        try {
            const response = await api.post('ongs', data)

            alert(`Your ID access: ${response.data.id}`)
            history.push('/')
        } catch(e) {
            console.log(e)
        }
    }

    return (
        <div className="register-container">
            <div className="content">
            <section className="form">
                <img src={logoImg} alt = "logo"/>
                    <h1>Register yourself</h1>
                    <p>Login and help people find your ONG's incidents</p>
                
                    <Link to="/" className="back-link">
                        <FiArrowLeft size={16} color="#E02041"/>
                        I'm not registered
                    </Link>
            </section>

            <form onSubmit={handleRegister}>
                <input placeholder="ONG's name" 
                value={name} 
                onChange={e => setName(e.target.value)}
                />
                <input type="email" placeholder="E-mail"
                value={email} 
                onChange={e => setEmail(e.target.value)}
                />
                <input placeholder="WhatsApp"
                value={whats} 
                onChange={e => setWhats(e.target.value)}
                />
            
                <div className="input-group">
                    <input placeholder="City"
                    value={city} 
                    onChange={e => setCity(e.target.value)}
                    />
                    <input placeholder="State" style={{ width: 100 }}
                    value={state} 
                    onChange={e => setState(e.target.value)}
                />
                </div>

                <button className="button" type="submit">Register</button>
            </form>

            </div>
        </div>
    )
}