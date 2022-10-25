from flask import Blueprint, jsonify, redirect, render_template
from flask_login import login_required

from app.models import Business, db

restaurants_routes = Blueprint('restaurants', __name__)

# Get all businesses
@restaurants_routes.route('/')
@login_required
def get_all_businesses():
    all_businesses = Business.query.all()
    businesses = {'businesses': [business.to_dict() for business in all_businesses]}
    return businesses
