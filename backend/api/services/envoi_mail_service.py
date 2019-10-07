import smtplib
import email.message


def EnvoiMail(motDePasse, idMat):

    email_login = 'mouradkassa@gmail.com'
    email_passwd = 'S0fteam01'

    msg = email.message.Message()
    msg['Subject'] = 'reinitialisation du mot de passe'
    msg['From'] = 'mouradkassa@gmail.com'
    msg['To'] = 'mouradkassa@yahoo.fr'
    msg.add_header('Content-Type', 'text/html')
    msg.set_payload('<b>mot de passe : ' + motDePasse + ' Identifiant : ' + idMat + '</b>'
                    '<br/>'                                                                    
                    '<a href="http://localhost:3000/passinitialisation">Reinitialiser le mot de passe</a>'
                    )

    try:
        # Send the message via local SMTP server.
        s = smtplib.SMTP_SSL('smtp.gmail.com', 465)
        s.ehlo()
        s.login(email_login, email_passwd)
        s.sendmail(msg['From'], [msg['To']], msg.as_string())
        s.quit()       
        print('Email sent!')
    except:
        print('Something went wrong...')
