from app.models import Business, db


def seed_businesses():
    business_1 = Business(
        userId=1,
        address='1234 Addy',
        city='Atlanta', state='GA',
        country='USA',
        zip=30087,
        name='Krusty Krab',
        description='Who lives in a pineapple under the sea? SpongeBob SquarePants! Absorbent and yellow and porous is he SpongeBob SquarePants!',
        phone=6783490689,
        price='$',
        previewImageUrl='https://i.pinimg.com/originals/33/e9/31/33e9318abad9a87418c3eace3effae30.jpg'
    )

    business_2 = Business(
        userId=2,
        address='4567 Addy',
        city='New York City',
        state='NY',
        country='USA',
        zip=50023,
        name='Mussle City',
        description='Here you can find the biggest most shredded mussles. We work hard to get our mussles as pumped and juiciest around',
        phone=9775271337,
        price='$$',
        previewImageUrl='https://i.ndtvimg.com/i/2015-10/mussels-625_625x350_61444640859.jpg'
    )

    business_3 = Business(
        userId=3,
        address='7890 Addy',
        city='Los Angeles',
        state='CA',
        country='USA',
        zip=90025,
        name='Seaside Hooks',
        description='We only serve the freshs catch of the day. Indulge on all the best dishes that out oceans offer here',
        phone=2335041994,
        price='$$$$',
        previewImageUrl='https://s3-media0.fl.yelpcdn.com/bphoto/Zg95QGwmay_PpgV0Xecb6A/o.jpg'
    )

    businesses = [business_1, business_2, business_3]
    for business in businesses:
        db.session.add(business)
        db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_businesses():
    db.session.execute('TRUNCATE businesses RESTART IDENTITY CASCADE;')
    db.session.commit()
