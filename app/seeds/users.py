from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', first_name='Demo', last_name='User', email='demo@aa.io', profileImageUrl="https://millingtontownship.com/wp-content/uploads/2021/01/default.jpg", password='password')
    marnie = User(
        username='marnie', first_name='Marnie', last_name='Sims', email='marnie@aa.io', profileImageUrl="https://millingtontownship.com/wp-content/uploads/2021/01/default.jpg", password='password')
    bobbie = User(
        username='bobbie', first_name='Bobbie', last_name='Johnson', email='bobbie@aa.io', profileImageUrl="https://millingtontownship.com/wp-content/uploads/2021/01/default.jpg", password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
