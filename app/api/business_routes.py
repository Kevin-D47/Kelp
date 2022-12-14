from flask import Blueprint, jsonify, redirect, render_template, request
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages

from app.forms.business_form import BusinessForm
from app.forms.review_form import ReviewForm
from app.forms.image_form import ImageForm

from app.models import Business, Review, Image, db


business_routes = Blueprint('businesses', __name__)


# Businesses routes:

# Get business by id
@business_routes.route('/<int:id>')
@login_required
def get_business(id):
     business = Business.query.get(id)
     if business == None:
        return "Business is not available"
     return business.to_dict()


# Create a business
@business_routes.route("/new", methods=["POST"])
@login_required
def create_business():
    form = BusinessForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data
        new_business = Business(
            userId = form.data['userId'],
            address = form.data['address'],
            city = data['city'],
            state = data['state'],
            country = data['country'],
            zip = data['zip'],
            name = data['name'],
            description = data['description'],
            phone = data['phone'],
            price = data['price'],
            previewImageUrl = data['previewImageUrl'],
            type = data['type']
        )

        db.session.add(new_business)
        db.session.commit()
        return new_business.to_dict()
    if form.errors:
        # return form.data
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# Edit a business
@business_routes.route("/<int:id>/edit", methods=["PUT"])
@login_required
def edit_business(id):
    form = BusinessForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        old_business = Business.query.get(id)
        data = form.data

        old_business.address = data['address']
        old_business.city = data['city']
        old_business.state = data['state']
        old_business.country = data['country']
        old_business.zip = data['zip']
        old_business.name = data['name']
        old_business.description = data['description']
        old_business.phone = data['phone']
        old_business.price = data['price']
        old_business.previewImageUrl = data['previewImageUrl']
        old_business.type = data['type']
        db.session.commit()

        return old_business.to_dict()
    if form.errors:
        # return form.data
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# Delete a business
@business_routes.route("/<int:id>/delete", methods=["DELETE"])
@login_required
def delete_business(id):
    business = Business.query.get(id)
    db.session.delete(business)
    db.session.commit()
    return {
    "Message": "Business successfully deleted",
    "statusCode": "200"
    }



# Review routes:

# All reviews by businessId
@business_routes.route('/<int:businessId>/reviews', methods=["GET"])
@login_required
def get_reviewsByBusiness(businessId):
    reviews = Review.query.filter_by(businessId=businessId).all()
    if reviews == None:
        return "Business has no reviews"
    return {review.id: review.to_dict() for review in reviews}


# Post a review
@business_routes.route('/<int:businessId>/reviews/new', methods=['POST'])
@login_required
def create_review(businessId):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        new_review = Review(

            # validate user login, comeback to test when frontend is being built
            # grab businessId onclick on front end
            # userId=current_user.id,
            userId = data['userId'],
            businessId = data['businessId'],
            review = data['review'],
            stars = data['stars']
        )
        db.session.add(new_review)
        db.session.commit()
        return new_review.to_dict()
    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400
    # return render_template("test.html", form=form)


# Edit a review
@business_routes.route('/<int:businessId>/reviews/<int:id>/edit', methods=['GET','PUT'])
@login_required
def edit_review(businessId, id):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        editedReview = Review.query.get(id)
        data = form.data
        editedReview.userId = data['userId']
        editedReview.review = data['review']
        editedReview.stars = data['stars']

        db.session.commit()
        return editedReview.to_dict()
    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400
    # return render_template("test.html", form=form)


# Delete a review
@business_routes.route('/<int:businessId>/reviews/<int:id>/delete', methods=['GET', 'DELETE'])
@login_required
def delete_comment(businessId, id):
    review = Review.query.get(id)
    db.session.delete(review)
    db.session.commit()
    return {
    "Message": "Review successfully deleted",
    "statusCode": "200"
    }



# Images routes

# All images by businessId
@business_routes.route('/<int:businessId>/images', methods=["GET"])
@login_required
def get_imagesByBusiness(businessId):
    images = Image.query.filter_by(businessId=businessId).all()
    if images == None:
        return "Business has no images"
    return {image.id: image.to_dict() for image in images}


# Post a image
@business_routes.route('/<int:businessId>/images/new', methods=['POST'])
@login_required
def create_image(businessId):
    form = ImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        new_image = Image(

            # validate user login, comeback to test when frontend is being built
            # grab businessId onclick on front end
            # userId=current_user.id,
            userId = data['userId'],
            businessId = data['businessId'],
            imgUrl = data['imgUrl'],
            description = data['description']
        )
        db.session.add(new_image)
        db.session.commit()
        return new_image.to_dict()
    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400
    # return render_template("test.html", form=form)


# Edit a image
@business_routes.route('/<int:businessId>/images/<int:id>/edit', methods=['GET','PUT'])
@login_required
def edit_image(businessId, id):
    form = ImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        editedImage = Image.query.get(id)
        data = form.data
        editedImage.userId = data['userId']
        editedImage.businessId = data['businessId']
        editedImage.imgUrl = data['imgUrl']
        editedImage.description = data['description']

        db.session.commit()
        return editedImage.to_dict()
    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400
    # return render_template("test.html", form=form)


# Delete a image
@business_routes.route('/<int:businessId>/images/<int:id>/delete', methods=['GET', 'DELETE'])
@login_required
def delete_image(businessId, id):
    image = Image.query.get(id)
    db.session.delete(image)
    db.session.commit()
    return {
    "Message": "Image successfully deleted",
    "statusCode": "200"
    }
