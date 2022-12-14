from datetime import datetime

# add environment and add_prefix-for_prod to existing import statement
from .db import db, environment, SCHEMA, add_prefix_for_prod

class Image(db.Model):
    __tablename__ = 'images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    businessId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("businesses.id")), nullable=False)
    imgUrl = db.Column(db.String, nullable=False)
    description = db.Column(db.String(800), nullable=False)
    # timestamps
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)


    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'businessId': self.businessId,
            'imgUrl': self.imgUrl,
            "description": self.description,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
