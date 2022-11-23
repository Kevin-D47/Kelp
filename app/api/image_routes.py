from flask import Blueprint, jsonify, render_template, request
from flask_login import login_required, current_user
from app.models import Image, db
from app.api.auth_routes import validation_errors_to_error_messages

image_routes = Blueprint('images', __name__)

# get all images
@image_routes.route('/all')
@login_required
def get_all_images():
    all_images = Image.query.all()
    images = {image.id: image.to_dict() for image in all_images}
    return images

# specific image by id
@image_routes.route('/<int:id>')
@login_required
def get_single_image(id):
    image = Image.query.get(id)
    if image == None:
        return "No image found"
    return image.to_dict()
