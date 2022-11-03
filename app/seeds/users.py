from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo',
        first_name='Demo',
        last_name='User',
        email='demo@aa.io',
        profileImageUrl="https://millingtontownship.com/wp-content/uploads/2021/01/default.jpg",
        password='password'
    )

    user_2 = User(
        username='Aquaman',
        first_name='Aqua',
        last_name='Man',
        email='aquaman@gmail.com',
        profileImageUrl="https://cdn.britannica.com/90/199490-050-DA632B69/promotional-art-Jason-Momoa-Justic-League-2017.jpg",
        password='password'
    )

    user_3 = User(
        username='Spongebob',
        first_name='SpongeBob',
        last_name='SquarePants',
        email='spongebob@gmail.com',
        profileImageUrl="https://assets.nick.com/uri/mgid:arc:imageassetref:nick.com:a625d441-bbbf-42c8-9927-6a0157aac911?quality=0.7&gen=ntrn&legacyStatusCode=true",
        password='password'
    )

    user_4 = User(
        username='LittleMermaid',
        first_name='Princess',
        last_name='Ariel',
        email='arielp@gmail.com',
        profileImageUrl="https://lumiere-a.akamaihd.net/v1/images/image_a072d0f3.jpeg?region=0,0,629,354",
        password='password'
    )

    user_5 = User(
        username='Kisame',
        first_name='Kisame',
        last_name='Hoshigaki',
        email='kisame@gmail.com',
        profileImageUrl="https://cdn.myanimelist.net/images/characters/11/433351.jpg",
        password='password'
    )

    user_6 = User(
        username='Dory',
        first_name='Dory',
        last_name='BlueTang',
        email='dory@gmail.com',
        profileImageUrl="https://images2.minutemediacdn.com/image/upload/c_fill,w_720,ar_16:9,f_auto,q_auto,g_auto/shape/cover/sport/501587-gettyimages-462249793-6e64021292535a8602b61e5ed87657ec.jpg",
        password='password'
    )

    user_7 = User(
        username='BigDaddy',
        first_name='Big',
        last_name='Daddy',
        email='bigdaddy@gmail.com',
        profileImageUrl="https://wallpaperaccess.com/full/2723990.jpg",
        password='password'
    )

    user_8 = User(
        username='DavyJones',
        first_name='Davy',
        last_name='Jones',
        email='davy@gmail.com',
        profileImageUrl="https://legendary-digital-network-assets.s3.amazonaws.com/wp-content/uploads/2020/08/13025201/Davy-Jones-POTC-featured.jpg",
        password='password'
    )

    user_9 = User(
        username='PoseidonGodOfTheSea',
        first_name='Poseidon',
        last_name='Neptos',
        email='poseidon@gmail.com',
        profileImageUrl="https://classicalwisdom.com/wp-content/uploads/2018/05/ezgif-5-91a0cd74a7.jpg",
        password='password'
    )


    user_10 = User(
        username='Mr.Krabs',
        first_name='Eugene',
        last_name='Krabs',
        email='mrkrabs@gmail.com',
        profileImageUrl="https://i.pinimg.com/originals/1b/2c/77/1b2c77099fb8c4484f6a2b3f2b1e735c.jpg",
        password='password'
    )


    users = [demo, user_2, user_3, user_4, user_5, user_6, user_7, user_8, user_9, user_10]
    for user in users:
        db.session.add(user)
        db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
