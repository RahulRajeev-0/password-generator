# from cryptography.fernet import Fernet
# from decouple import config

# # Use a pre-generated key and store it securely (e.g., in an environment variable)
# key = config('ENCRYPTION_KEY')
# cipher_suite = Fernet(key)

# def encrypt_password(password):
#     """Encrypts a password."""
#     return cipher_suite.encrypt(password.encode()).decode()

# def decrypt_password(encrypted_password):
#     """Decrypts a password."""
#     return cipher_suite.decrypt(encrypted_password.encode()).decode()