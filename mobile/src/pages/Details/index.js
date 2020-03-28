import React from 'react'
import { FlatList, View, TouchableOpacity, Image, Text, Linking } from 'react-native'
import styles from './styles'
import logoImg from '../../assets/logo.png'
import { Feather} from '@expo/vector-icons'
import {useNavigation, useRoute} from '@react-navigation/native'
import * as MailComporse from 'expo-mail-composer'

export default function Detail() {
    const navigation = useNavigation()
    const route = useRoute()
    const incident = route.params.incident
    const message = `Hello ${incident.name}, I want to help in the incdient "${incident.title}" with the value of ${Intl.NumberFormat('en', {style: 'currency', currency: 'USD'}).format(incident.value)}`

    function navigateBack() {
        navigation.goBack()
    }

    function sendEmail() {
        MailComporse.composeAsync({
            subject: `Incident: ${incident.title}}`,
            recipients: [incident.email],
            body: message,
        })
    }

    function sendWhats() {
        Linking.openURL(`whatsapp://semd?phone=${incident.whats}&text=${message}`)
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>
                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#e82041"/>
                </TouchableOpacity>
            </View>

            <View style={styles.incident}>
                <Text style={[styles.incidentProperty, {marginTop:0}]}>
                    ONG'S NAME:
                </Text>
                <Text style={styles.incidentValue}>
                    {incident.name} de {incident.city}/{incident.state}
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
            </View>

            <View style={styles.contactBox}>
                    <Text style={styles.heroTitle}>Save the day!</Text>
                    <Text style={styles.heroTitle}>Be the hero of this incident</Text>
                    <Text style={styles.heroDescription}>Contact us:</Text>
                
                    <View style={styles.actions}>
                        <TouchableOpacity style={styles.action} onPress={sendWhats}>
                            <Text style={styles.actionText}>WhatsApp</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.action} onPress={sendEmail}>
                            <Text style={styles.actionText}>E-mail</Text>
                        </TouchableOpacity>
                    </View>
                </View>
        </View>
    )
}