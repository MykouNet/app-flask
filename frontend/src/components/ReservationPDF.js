import React from 'react';
import { Document, Page, View, Text, PDFDownloadLink, Image, StyleSheet  } from '@react-pdf/renderer';
import styled from '@react-pdf/styled-components';

import { STATIC_URL } from '../Constantes';


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

const styles = StyleSheet.create({
  page: { backgroundColor: 'tomato', textAlign: 'center' },
  section: { color: 'white', textAlign: 'left', margin: 30 }
});

const MyDocument = (props) => {
    if (!props)
        return null
//    console.log("info props image", props.image)
    console.log("info props date", typeof props.dateReservation)
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View>
                    <Heading> Réservation d'un engin </Heading>
                    <Label style={styles.section}>ID Réservation : <Text>{props.idReservation}</Text></Label>
                    <Label style={styles.section}>ID Matricule :   <Text>{props.idMatricule}</Text></Label>
                    <Label style={styles.section}>ID Engin :       <Text>{props.idEngin}</Text></Label>
                    <Label style={styles.section}>Date de Début :  <Text>{props.dateDebut}</Text></Label>
                    <Label style={styles.section}>Date de Fin :    <Text>{props.dateFin}</Text></Label>
                    <Label style={styles.section}>Date de Réservation : <Text>{new Intl.DateTimeFormat('en-GB', {
                            year: 'numeric',
                            month: 'long',
                            day: '2-digit'
                        }).format(new Date(props.dateReservation))}</Text></Label>
                       <Image src={STATIC_URL + '/uploads/produits/' + props.image} />
                </View>
            </Page>
        </Document>
    )
}

const ReservationPDF = (props) => {
    return (
        <PDFDownloadLink document={MyDocument(props.data)} fileName="res.pdf">Download</PDFDownloadLink>
    )
}
export default ReservationPDF