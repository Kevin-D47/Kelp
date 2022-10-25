from datetime import datetime
from .db import db

class Image(db.Model):
    __tablename__ = 'images'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    businessId = db.Column(db.Integer, db.ForeignKey("businesses.id"), nullable=False)
    imgUrl = db.Column(db.VARCHAR)
    # timestamps
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)


    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'businessId': self.businessId,
            'imgUrl': self.imgUrl,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
