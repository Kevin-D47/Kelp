from app.models import Image, db

def seed_images():
    image_1 = Image(userId= 4, businessId= 1, imgUrl="https://www.gannett-cdn.com/presto/2021/11/18/NPPP/d0eb8abd-a8b6-4607-92b6-2ebd9ff513eb-Corvina_Gerard_Roncal_1.jpg", description='Come try our Fancy Fresh Oysters')
    image_2 = Image(userId= 6, businessId= 1, imgUrl="https://www.foodandwine.com/thmb/aTAmotbtG72fdSN7Lw077Jv5Flg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/lobster-thermidor-FT-RECIPE0621-74e5a3b2e07d488bb03b5868b389877f.jpg", description='Went tried the grilled lobster, I think is was very good')
    image_3 = Image(userId= 10, businessId= 1, imgUrl="https://sobeseafoodfest.com/wp-content/uploads/2019/07/A-Fish-Called-Avalon-BLOG-PHOTO-2019.06.29.jpg", description='This sea bass was scrumptious')
    image_4 = Image(userId= 3, businessId= 2, imgUrl='https://s3-media0.fl.yelpcdn.com/bphoto/Zg95QGwmay_PpgV0Xecb6A/o.jpg', description='Our Grilled Bass with rice is ROCKIN!')
    image_5 = Image(userId= 2, businessId= 2, imgUrl="https://www.onceuponachef.com/images/2011/08/Grilled-Salmon-11.jpg", description='There salmon with creamy cucumber-dill salad is great')
    image_6 = Image(userId= 5, businessId= 2, imgUrl="https://www.eatthis.com/wp-content/uploads/sites/4/2018/12/healthy-grilled-mahi-mahi-salsa-verde.jpg?quality=82&strip=1", description='This fish and veggie skillet is amazing')
    image_7 = Image(userId= 2, businessId= 3, imgUrl='https://www.washingtonpost.com/resizer/S0uE7ze24z1spZwWS_XsFyN5YBc=/arc-anglerfish-washpost-prod-washpost/public/E37EMGFVZYI6ZA2YECVBMNK7WQ.jpg', description='These are some strong tasting mussles')
    image_8 = Image(userId= 8, businessId= 3, imgUrl="https://www.foodandwine.com/thmb/gFSjvW9k7eaAXC6jw0pliAyugzY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2012-r-xl-pasta-with-mussels-2000-c4ab022c677d4f7e9829835fbb1200e5.jpg", description='Mussels with pasta is a hardy meal')
    image_9 = Image(userId= 9, businessId= 3, imgUrl="https://assets.epicurious.com/photos/580e4a19f0c22d7756cc2c4a/master/pass/mussels-in-light-tomato-broth-102416.jpg", description='I devoured these mussels with red sauce')
    image_10 = Image(userId= 5, businessId= 4, imgUrl='https://media.blogto.com/articles/20170503-japango-09.jpg?w=1200&cmd=resize_then_crop&height=630&quality=70', description='We offer a wide variety of Sashimi as you can see')
    image_11 = Image(userId= 3, businessId= 4, imgUrl="https://www.justonecookbook.com/wp-content/uploads/2020/01/Sushi-Rolls-Maki-Sushi-%E2%80%93-Hosomaki-1106-II.jpg", description='These sushi rolls remind me of a traffic light')
    image_12 = Image(userId= 4, businessId= 4, imgUrl="https://insanelygoodrecipes.com/wp-content/uploads/2020/05/Sushi-1024x536.jpg", description="There so beautiful I didn't even want to eat them" )
    image_13 = Image(userId= 10, businessId= 5, imgUrl='https://images.spot.im/v1/production/sleaikuscaczuzq1ivdn', description='The famous Krabby Patty made with my secret formula')
    image_14 = Image(userId= 6, businessId= 5, imgUrl="https://i.pinimg.com/originals/33/e9/31/33e9318abad9a87418c3eace3effae30.jpg", description='The place is a little run down and old')
    image_15 = Image(userId= 3, businessId= 5, imgUrl="https://images.tokopedia.net/img/cache/500-square/VqbcmM/2020/10/5/b965a359-abab-4597-bb23-038be08c8a60.jpg", description='I did not know they served pizza!')
    image_16 = Image(userId= 7, businessId= 6, imgUrl='https://wallpapercave.com/wp/wp5116626.jpg', description='Whatever comes in a shell, we boil it here')
    image_17 = Image(userId= 2, businessId= 6, imgUrl="https://coopcancook.com/wp-content/uploads/2020/06/Photo-Apr-02-9-59-25-AM.jpg", description="Can't believe they serve crawfish by the bucket")
    image_18 = Image(userId= 5, businessId= 6, imgUrl="https://www.mashed.com/img/gallery/cajun-crab-boil-recipe/l-intro-1625841760.jpg", description='Best king crabs in town here')
    image_19 = Image(userId= 8, businessId= 7, imgUrl='https://media.istockphoto.com/photos/octopus-picture-id1324632301?b=1&k=20&m=1324632301&s=170667a&w=0&h=45KkZRjC19LMbQh5ewcPI0MQHnuTtaBZmav2cfe0kxE=', description='Our exotic octupus dish will leave you grabbing for more')
    image_20 = Image(userId= 2, businessId= 7, imgUrl="https://medmunch.com/wp-content/uploads/2020/08/Sea-Urchin-2.jpg", description='First time having sea urchin')
    image_21 = Image(userId= 3, businessId= 7, imgUrl="https://images.getrecipekit.com/20220525112807-softshell-20crab-20sandwich-20img-201.jpg?class=16x9", description='There soft shell crab burger is unique twist')

    images = [image_1, image_2, image_3, image_4, image_5, image_6, image_7, image_8, image_9, image_10, image_11, image_12, image_13, image_14, image_15, image_16, image_17, image_18, image_19, image_20, image_21]
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
