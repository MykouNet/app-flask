import smtplib


def EnvoiMail(motDePasse, idMat):


    gmail_user = 'mouradkassa@gmail.com'
    gmail_password = 'S0fteam01' #complète avec ton username et password

    sent_from = gmail_user
    to = ['mouradkassa@yahoo.fr']
    subject = 'REinitialisation de votre mot de passe'
    body = idMat + ", votre MDP : " + motDePasse


    email_text = """\
    From: %s
    To: %s
    Subject: %s
  
    Votre identifiant : %s
    
    
    """ % (sent_from, ", ".join(to), subject, body)

    try:
        server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
        server.ehlo()
        server.login(gmail_user, gmail_password)
        server.sendmail(sent_from, to, email_text)
        server.close()

        print('Email sent!')
    except:
        print('Something went wrong...')
