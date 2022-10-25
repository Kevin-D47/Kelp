from flask import Blueprint, jsonify, render_template, request
from flask_login import login_required, current_user
from app.models import Review, db
from app.api.auth_routes import validation_errors_to_error_messages

review_routes = Blueprint('reviews', __name__)

# get all reviews
@review_routes.route('/all')
@login_required
def get_all_reviews():
    all_reviews = Review.query.all()
    reviews = {review.id: review.to_dict() for review in all_reviews}
    return reviews

# specific review by id
@review_routes.route('/<int:id>')
@login_required
def get_single_review(id):
    review = Review.query.get(id)
    if review == None:
        return "No review found"
    return review.to_dict()
