from flask import Blueprint, jsonify, request
from flask_mail import Message
from config import mail, EMAIL_ADDRESS, limiter

contact_bp = Blueprint("contact", __name__)


@contact_bp.route("", methods=["POST"])
@limiter.limit("1 per minute")
def send_email():
    try:
        req_data = request.get_json()

        title = req_data.get("title", "No title")
        email = req_data.get("email", "No email")
        issue_type = req_data.get("issue", "No issue type")
        page_url = req_data.get("page_url", "No page URL")
        description = req_data.get("description", "No description")

        message_body = f"Email: {email}\nIssue Type: {issue_type}\nPage URL: {page_url}\nDescription: {description}"

        msg = Message(subject=title, recipients=[EMAIL_ADDRESS], body=message_body)

        mail.send(msg)

        return jsonify({"message": "Your message has been sent!"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
