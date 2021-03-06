import React from 'react'
import { Document, Page, View, Text, PDFDownloadLink, Image } from '@react-pdf/renderer'
import styled from '@react-pdf/styled-components';

import { STATIC_URL } from '../Constantes'

const DOWNLOAD_URL = 'http://localhost:3000'


const Heading = styled.Text`
  margin: 10px;
  font-size: 22px;
  font-family: 'Helvetica';
`;

const Label = styled.Text`
  margin: 10px;
  font-size: 12px;
  font-family: 'Helvetica';
`;

const MyDocument = (props) => {

    if (!props)
        return null
    console.log("info", DOWNLOAD_URL + '/static/uploads/produits/' + props.image)
    const source = {
        uri: `${DOWNLOAD_URL}/static/uploads/produits/${props.image}`,
        method: 'GET',
        headers: {'Access-Control-Allow-Origin': '*'}
    }
    return (
        <Document>
            <Page size="A4">
                <View>
                    <Heading> Réservation d'un engin </Heading>
                    <Label>ID Réservation : <Text>{props.idReservation}</Text></Label>
                    <Label>ID Matricule :   <Text>{props.idMatricule}</Text></Label>
                    <Label>ID Engin :       <Text>{props.idEngin}</Text></Label>
                    <Label>Date de Début :  <Text>{props.dateDebut}</Text></Label>
                    <Label>Date de Fin :    <Text>{props.dateFin}</Text></Label>
                    <Label>Date de Réservation : <Text>{props.dateReservation}</Text></Label>
                    <Image source={source} />
                </View>
            </Page>
        </Document>
    )
}

const ReservationPDF = (props) => {
    return (
        <PDFDownloadLink document={MyDocument(props.data)} fileName="res.pdf">Download PDF</PDFDownloadLink>
    )
}
export default ReservationPDF