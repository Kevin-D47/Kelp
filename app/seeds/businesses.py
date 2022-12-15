from app.models import Business, db


def seed_businesses():

    business_1 = Business(
        userId=4,
        address='4567 Broadway',
        city='New York City',
        state='New York',
        country='USA',
        zip=10005,
        name="Ocean's Finest",
        description='We serve only the finest dishes that the ocean has to offer. All our seafood dishes are finely prepared with only the freshest and most exquisite ingredients from the seas.',
        phone=9175271337,
        price='$$$$',
        previewImageUrl='https://www.gannett-cdn.com/presto/2021/11/18/NPPP/d0eb8abd-a8b6-4607-92b6-2ebd9ff513eb-Corvina_Gerard_Roncal_1.jpg',
        type ='All'
    )

    business_2 = Business(
        userId=3,
        address='6725 St Claire Avenue',
        city='Cleveland',
        state='Ohio',
        country='USA',
        zip=44105,
        name='Rockin Bass',
        description='Our fresh caught fish is always served alongside live music. Come sea the liviest bands and food we have to offer in town. ',
        phone=2093059328,
        price='$$$',
        previewImageUrl='https://s3-media0.fl.yelpcdn.com/bphoto/Zg95QGwmay_PpgV0Xecb6A/o.jpg',
        type ='Fish'
    )

    business_3 = Business(
        userId=2,
        address='3942 Santa Monica Pier',
        city='Venice',
        state='California',
        country='USA',
        zip=20619,
        name='Flexing Mussles',
        description='Here you can find the biggest most shredded mussles. We work hard to build to get our mussles pumped and juiciest around.',
        phone=4083401294,
        price='$$',
        previewImageUrl='https://www.washingtonpost.com/resizer/S0uE7ze24z1spZwWS_XsFyN5YBc=/arc-anglerfish-washpost-prod-washpost/public/E37EMGFVZYI6ZA2YECVBMNK7WQ.jpg',
        type ='Clams, Oysters, and Scallops'
    )

    business_4 = Business(
        userId=5,
        address='7890 Peach Avenue',
        city='Atlanta',
        state='Georgia',
        country='USA',
        zip=30045,
        name='Sushi Samurai',
        description='Owned and ran by a decendent of legenday samurai clan. Here you can find the most authentic omakase experience with an sharp edge.',
        phone=6789513096,
        price='$$$$',
        previewImageUrl='https://media.blogto.com/articles/20170503-japango-09.jpg?w=1200&cmd=resize_then_crop&height=630&quality=70',
        type ='Fish'
    )


    business_5 = Business(
        userId=10,
        address='3866 Conch Street',
        city='Bikini Bottom',
        state='Hawaii',
        country='USA',
        zip=96701,
        name='Krusty Krab',
        description='Come get a quick bite at the famous under the sea burger spot. Our tasy Krabby Patties made with our seceret ingriedient prepared by our famous square yellow chef, will have you coming back for more.',
        phone=2800931122,
        price='$',
        previewImageUrl='https://images.spot.im/v1/production/sleaikuscaczuzq1ivdn',
        type='Other'
    )

    business_6 = Business(
        userId=7,
        address='2422 Bourbon Street',
        city='New Orleans',
        state='Louisiana',
        country='USA',
        zip=70032,
        name='The Shellfish Pot',
        description='We honestly think our seafood boils are too good to share with others. We rather keep them for ourselves but since so many beg for our tasty seafood here you go.',
        phone=5046149001,
        price='$$',
        previewImageUrl='https://wallpapercave.com/wp/wp5116626.jpg',
        type ='Crabs, Lobsters, and Shrimp'
    )

    business_7 = Business(
        userId=8,
        address='4450 Palmside walk',
        city='Miami',
        state='Florida',
        country='USA',
        zip=33109,
        name='Jaw-some Bites',
        description='Discovery some of the most exotic seafood options you have never tried before. Come take a sharkful bite out of our unique and massively delicious dishes',
        phone=7276803020,
        price='$$$',
        previewImageUrl='https://media.istockphoto.com/photos/octopus-picture-id1324632301?b=1&k=20&m=1324632301&s=170667a&w=0&h=45KkZRjC19LMbQh5ewcPI0MQHnuTtaBZmav2cfe0kxE=',
        type='All'
    )



    businesses = [business_1, business_2, business_3, business_4, business_5, business_6, business_7]
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
