from dotenv import load_dotenv
import os
from flask_mail import Mail
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

load_dotenv()

AUTH_TOKEN = os.getenv("AUTH_TOKEN")
API_URL = os.getenv("API_URL")
FLAG_URL = os.getenv("FLAG_URL")
CURRENT_YEAR = 2025

PORT = int(os.getenv("PORT", 8000))

EMAIL_ADDRESS = os.getenv("MAIL_USERNAME")
EMAIL_PASSWORD = os.getenv("MAIL_PASSWORD")

mail = Mail()


limiter = Limiter(key_func=get_remote_address, default_limits=[])


def init_mail(app):
    app.config["MAIL_SERVER"] = "smtp.gmail.com"
    app.config["MAIL_PORT"] = 587
    app.config["MAIL_USE_TLS"] = True
    app.config["MAIL_USERNAME"] = EMAIL_ADDRESS
    app.config["MAIL_PASSWORD"] = EMAIL_PASSWORD
    app.config["MAIL_DEFAULT_SENDER"] = EMAIL_ADDRESS

    mail.init_app(app)
