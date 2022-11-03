from app.models import Review, db

def seed_reviews():
    review_1 = Review(userId=8, businessId= 1, review="Nice spot for a date night", stars=5)
    review_2 = Review(userId=6, businessId= 1, review="I think this was a nice experince but I forgot", stars=4)
    review_3 = Review(userId=10, businessId= 1, review="Very fancy and nice but a little too expensive", stars=4)
    review_4 = Review(userId=5, businessId= 2, review="Great food and great live music", stars=4)
    review_5 = Review(userId=9, businessId= 2, review="The food was good as but music was tastless", stars=3)
    review_6 = Review(userId=8, businessId= 2, review="Good food reminds me of home", stars=5)
    review_7 = Review(userId=2, businessId= 2, review="Great place good and banging live bands", stars=4)
    review_8 = Review(userId=9, businessId= 3, review="Great hardy meals to build strength", stars=5)
    review_9 = Review(userId=8, businessId= 3, review="I like me some steamy mussles", stars=4)
    review_10 = Review(userId=3, businessId= 4, review="Pretty neat spot and experince to have", stars=4)
    review_11 = Review(userId=4, businessId= 4, review="So traditional and great cutomer service", stars=5)
    review_12 = Review(userId=6, businessId= 4, review="Decent but wished it was cooked though", stars=3)
    review_13 = Review(userId=3, businessId= 5, review="I love Krabby Patties not jsut because I work here", stars=5)
    review_14 = Review(userId=5, businessId= 5, review="Burger was decent nice place if your in a hurry", stars=3)
    review_15 = Review(userId=6, businessId= 5, review="Good burgers I think", stars=3)
    review_16 = Review(userId=2, businessId= 6, review="Tasty love the flavors but bad customer sevice", stars=2)
    review_17 = Review(userId=5, businessId= 6, review="Customer service was poor but food made up for it", stars=4)
    review_18 = Review(userId=6, businessId= 6, review="I forgot but I think they were mean", stars=2)
    review_19 = Review(userId=2, businessId= 7, review="Very intresting food and good size portions", stars=3)
    review_20 = Review(userId=4, businessId= 7, review="The dishes are unique and tasty", stars=4)
    review_21 = Review(userId=3, businessId= 7, review="The restraunt decor is old, but the food is fun", stars=4)


    reviews = [
        review_1, review_2, review_3, review_4, review_5, review_6, review_7, review_8, review_9, review_10, review_11, review_12, review_13, review_14, review_15, review_16, review_17, review_18, review_19, review_20, review_21
    ]
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
