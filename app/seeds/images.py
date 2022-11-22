from app.models import Image, db

def seed_images():
    image_1 = Image(userId= 1, businessId= 1, imgUrl="https://www.gannett-cdn.com/presto/2021/11/18/NPPP/d0eb8abd-a8b6-4607-92b6-2ebd9ff513eb-Corvina_Gerard_Roncal_1.jpg", description='TEST1')
    image_2 = Image(userId= 1, businessId= 1, imgUrl="https://www.foodandwine.com/thmb/aTAmotbtG72fdSN7Lw077Jv5Flg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/lobster-thermidor-FT-RECIPE0621-74e5a3b2e07d488bb03b5868b389877f.jpg", description='TEST2')
    image_3 = Image(userId= 1, businessId= 1, imgUrl="https://sobeseafoodfest.com/wp-content/uploads/2019/07/A-Fish-Called-Avalon-BLOG-PHOTO-2019.06.29.jpg", description='TEST3')
    image_4 = Image(userId= 2, businessId= 2, imgUrl="URL4", description='TEST4')
    image_5 = Image(userId= 2, businessId= 2, imgUrl="URL5", description='TEST5')
    image_6 = Image(userId= 2, businessId= 2, imgUrl="URL6", description='TEST6')
    image_7 = Image(userId= 3, businessId= 3, imgUrl="URL7", description='TEST7')
    image_8 = Image(userId= 3, businessId= 3, imgUrl="URL8", description='TEST8')
    image_9 = Image(userId= 3, businessId= 3, imgUrl="URL9", description='TEST9')

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
