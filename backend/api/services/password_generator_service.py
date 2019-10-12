from random  import randint, choice
import string

class PasswordService:

    def passwordService(self):
        password_min = 6
        password_max = 12
        all_chars = string.ascii_letters + string.punctuation + string.digits
        password = "".join(choice(all_chars) for x in range(randint(password_min, password_max)))

        return password