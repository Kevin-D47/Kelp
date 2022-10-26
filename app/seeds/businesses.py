from app.models import Business, db

def seed_businesses():
    business_1 = Business(userId=1, address='1234 Addy', city='Atlanta', state='GA', country='USA', zip=30087, name='Krusty Krab', description='something', phone=678, price='$', previewImageUrl='previewURL1')
    business_2 = Business(userId=2, address='4567 Addy', city='New York City', state='NY', country='USA', zip=50023, name='Mussle City', description='something1', phone=977, price='$$', previewImageUrl='previewURL2')
    business_3 = Business(userId=3, address='7890 Addy', city='Los Angeles', state='CA', country='USA', zip=90025, name='Big Fish Dinner', description='something2', phone=233, price='$$$$', previewImageUrl='previewURL3')

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
