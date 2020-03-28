import React , { useEffect, useState, useDebugValue} from 'react'
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native'
import styles from './styles'
import { Feather} from '@expo/vector-icons'
import {useNavigation} from '@react-navigation/native'
import logoImg from '../../assets/logo.png'
import api from '../../services/api'

export default function Incidents() {

    const navigation = useNavigation()
    const [incidents, setIncidents] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)

    function navigateToDetail(incident) {
        navigation.navigate('Details',  {incident})
    }

    async function loadIncidents() {
        if (loading) {
            return
        }

        if (total > 0 && incidents.length === total) {
            return
        }
        setLoading(true)

        const response = await api.get('incidents', {
            params: {page}
        })

        setIncidents([... incidents, ... response.data])
        setTotal(response.headers['x-total-count'])
        setPage(page + 1)
        setLoading(false)
    }

    useEffect(() => {
        loadIncidents()
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>
                <Text style={styles.headerText}>
                    Total Incidents: <Text style={styles.headerTextBold}>{total}</Text>
                </Text>
            </View>

            <Text style={styles.title}> Welcome </Text>
            <Text style={styles.description}>Choose one incident and be the hero</Text>

            <FlatList
                style={styles.incidentList}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false} 
                data={incidents}
                onEndReached={loadIncidents}
                renderItem={({item: incident}) => (
                    <View style ={styles.incident}>
                        <Text style={styles.incidentProperty}>
                            ONG'S NAME:
                        </Text>
                        <Text style={styles.incidentValue}>
                            {incident.name}
                        </Text>

                        <Text style={styles.incidentProperty}>
                            INCIDENT DESCRIPTION:
                        </Text>
                        <Text style={styles.incidentValue}>
                            {incident.description}
                        </Text>

                        <Text style={styles.incidentProperty}>
                            VALUE:
                        </Text>
                        <Text style={styles.incidentValue}>
                            {Intl.NumberFormat('en', {style: 'currency', currency: 'USD'}).format(incident.value)}
                        </Text>
                    <TouchableOpacity style = {styles.detailsButton} onPress={() => navigateToDetail(incident)}>
                        <Text style = {styles.detailsButtonText}>
                            More details
                        </Text>
                        <Feather name="arrow-right" size={16} color = "#e02041"/>
                    </TouchableOpacity>
                </View>
                )}
            />
       </View>
    )
}