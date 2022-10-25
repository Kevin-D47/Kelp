from flask import Blueprint, jsonify, redirect, render_template, request
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages

from app.forms.business_form import BusinessForm


business_routes = Blueprint('businesses', __name__)

@business_routes.route('/')
# @login_required
def get_all_businesses():
    all_businesses = Business.query.all()
    businesses = {'businesses': [business.to_dict() for business in all_businesses]}
    return businesses


@business_routes.route("/new-business", methods=["POST"])
@login_required
def create_business():
    form = BusinessForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        new_business = Business(
            user_id = data['userId'],
            address = data['address'],
            city = data['city'],
            state = data['state'],
            country = data['country'],
            zip = data['zip'],
            lat = data['lat'],
            lng = data['lng'],
            name = data['name'],
            description = data['description'],
            phone = data['phone'],
            price = data['price']
        )

        db.session.add(new_business)
        db.session.commit()
        return new_business.to_dict()
    if form.errors:
        # return form.data
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


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
        old_business.lat = data['lat']
        old_business.lng = data['lng']
        old_business.name = data['name']
        old_business.description = data['description']
        old_business.phone = data['phone']
        old_business.price = data['price']

        db.session.commit()

        return old_business.to_dict()
    if form.errors:
        # return form.data
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


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
