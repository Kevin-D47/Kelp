from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, SubmitField, DecimalField, TextAreaField, FloatField
from wtforms.validators import DataRequired

class BusinessForm(FlaskForm):
    userId = IntegerField("userId", validators=[DataRequired()])
    address = StringField("Addddress", validators=[DataRequired()])
    city = StringField('city', validators=[DataRequired()])
    state = StringField('state', validators=[DataRequired()])
    country = StringField('country', validators=[DataRequired()])
    zip = IntegerField('zip', validators=[DataRequired()])
    lat = FloatField('lat', validators=[DataRequired()])
    lng = FloatField('lng', validators=[DataRequired()])
    name = StringField("name", validators=[DataRequired()])
    phone = StringField("phone", validators=[DataRequired()])
    description = TextAreaField("description", validators=[DataRequired()])
    price = StringField("price", validators=[DataRequired()])
    submit = SubmitField("submit")
