from datetime import datetime
from .db import db

class Business(db.Model):
    __tablename__ = 'businesses'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    address = db.Column(db.VARCHAR(1000), nullable=False)
    city = db.Column(db.VARCHAR(100), nullable=False)
    state = db.Column(db.VARCHAR(100), nullable=False)
    country = db.Column(db.VARCHAR(100), nullable=False)
    zip = db.Column(db.INTEGER, nullable=False)
    lat = db.Column(db.DECIMAL, nullable=False)
    lng = db.Column(db.DECIMAL, nullable=False)
    name = db.Column(db.VARCHAR(1000), nullable=False)
    phone = db.Column(db.VARCHAR(20), nullable=False)
    description = db.Column(db.VARCHAR(2000), nullable=False)
    price = db.Column(db.VARCHAR(50), nullable=False)

    # timestamps
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)


    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'address': self.address,
            'city': self.city,
            'state': self.state,
            'country': self.country,
            'zip': self.zip,
            'lat': self.lat,
            'lng': self.lng,
            'name': self.name,
            'phone': self.phone,
            'description': self.description,
            'price': self.price,
            # timestamps
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
