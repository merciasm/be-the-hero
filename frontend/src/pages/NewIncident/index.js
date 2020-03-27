import React, {useState} from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import logoImg from '../../assets/logo.svg'
import './styles.css'
import { Link, useHistory } from 'react-router-dom'
import api from '../../services/api'

export default function NewIncident() {
    const [title, setTitle] = useState('')
    const [description, setDescrip] = useState('')
    const [value, setValue] = useState('')
    const ongId = localStorage.getItem('ongId')
    const history = useHistory()

    async function handleNewIncident(e) {
        e.preventDefault()
        const data = {
            title,
            description,
            value,
        }

        try {

            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId,
                }
            })
            history.push('/profile')

        } catch (e) {
            alert('Error')
        }
    }

    return (
        <div className="new-incident-container">
        <div className="content">
        <section className="form">
            <img src={logoImg} alt = "logo"/>
                <h1>Register new incident</h1>
                <p>Describe the detailed incident to find a hero.</p>
            
                <Link to="/profile" className="back-link">
                    <FiArrowLeft size={16} color="#E02041"/>
                    Go back
                </Link>
        </section>

        <form onSubmit={handleNewIncident}>
            <input placeholder="Incident title"
            value = {title}
            onChange = {e => setTitle(e.target.value)}
            />
            <textarea placeholder="Detailed Description"
            value = {description}
            onChange = {e => setDescrip(e.target.value)}
            />
        
            <input placeholder="Value $"
            value = {value}
            onChange = {e => setValue(e.target.value)}
            />

            <button className="button" type="submit">Register</button>
        </form>

        </div>
    </div>
    )
}