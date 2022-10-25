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
    name = db.Column(db.VARCHAR(1000), nullable=False)
    phone = db.Column(db.INTEGER, nullable=False)
    description = db.Column(db.VARCHAR(2000), nullable=False)
    price = db.Column(db.VARCHAR(50), nullable=False)
    previewImageUrl = db.Column(db.VARCHAR, nullable=False)
    # timestamps
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    # one-to-many; business has many reviews, images
    reviews = db.relationship("Review", backref='business', cascade="all, delete-orphan")
    images = db.relationship('Image', backref='business', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'address': self.address,
            'city': self.city,
            'state': self.state,
            'country': self.country,
            'zip': self.zip,
            'name': self.name,
            'phone': self.phone,
            'description': self.description,
            'price': self.price,
            'previewImageUrl': self.previewImageUrl,
            # timestamps
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
