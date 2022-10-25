from app.models import Image, db

def seed_images():
    image_1 = Image(userId= 1, businessId= 1, imgUrl="URL1")
    image_2 = Image(userId= 1, businessId= 1, imgUrl="URL2")
    image_3 = Image(userId= 1, businessId= 1, imgUrl="URL3")
    image_4 = Image(userId= 2, businessId= 2, imgUrl="URL4")
    image_5 = Image(userId= 2, businessId= 2, imgUrl="URL5")
    image_6 = Image(userId= 2, businessId= 2, imgUrl="URL6")
    image_7 = Image(userId= 3, businessId= 3, imgUrl="URL7")
    image_8 = Image(userId= 3, businessId= 3, imgUrl="URL8")
    image_9 = Image(userId= 3, businessId= 3, imgUrl="URL9")

    images = [image_1, image_2, image_3, image_4, image_5, image_6, image_7, image_8, image_9]
    for image in images:
        db.session.add(image)
        db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_images():
    db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;')
    db.session.commit()
