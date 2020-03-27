import React, {useEffect, useState} from 'react'
import { FiPower, FiTrash2 } from 'react-icons/fi'
import logoImg from '../../assets/logo.svg'
import './styles.css'
import { Link, useHistory } from 'react-router-dom'
import api from '../../services/api'
export default function Profile() {
    const ongName = localStorage.getItem('ongName')
    const ongId = localStorage.getItem('ongId')
    const [incidents, setIncidents] = useState([])

    const history = useHistory()

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data)
        } )
    }, [ongId])

    async function handleDelete(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            })

            setIncidents(incidents.filter(incident => incident.id !== id))
        }catch (e) {
            alert('Error')
        }
    }

    function handleLogout() {
        localStorage.clear()
        history.push('/')
    }

    return (
        <div className="profile-container">
            <header>
            <img src={logoImg} alt = "logo"/>
            <span>Welcome, {ongName}</span>

            <Link to="/incident/new" className="button">
                Register new Incident
            </Link>
            <button type="button" onClick={handleLogout}><FiPower size={18} color="#E02041"/></button>
            </header>

            <h1>Registered incident</h1>
            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                    <strong>INCIDENT:</strong>
                    <p>{incident.title}</p>

                    <strong>Detailed Description</strong>
                    <p> {incident.description}</p>

                    <strong>Value</strong>
                    <p> {Intl.NumberFormat('EN-US', { style: 'currency', currency: 'USD'}).format(incident.value) }</p>

                    <button type="button" onClick={() => handleDelete(incident.id)}>
                        <FiTrash2 size={20} color="#a8a8b3"/>
                    </button>
                </li>
                ))}
            </ul>
        </div>
    )
}