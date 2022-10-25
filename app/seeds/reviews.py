from app.models import Review, db

def seed_reviews():
    review_1 = Review(userId=1, businessId= 3, review="Very Nice place", stars=5)
    review_2 = Review(userId=2, businessId= 2, review="It was okay spot", stars=3)
    review_3 = Review(userId=3, businessId= 1, review="This is bad", stars=1)

    reviews = [review_1, review_2, review_3]
    for review in reviews:
        db.session.add(review)
        db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
