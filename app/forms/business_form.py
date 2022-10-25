from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, SubmitField, DecimalField, TextAreaField, SelectField
from wtforms.validators import DataRequired

PRICES = ['$', '$$', '$$$', '$$$$']

class BusinessForm(FlaskForm):
    userId = IntegerField("Id", validators=[DataRequired()])
    address = StringField("Adress", validators=[DataRequired()])
    city = StringField('City', validators=[DataRequired()])
    state = StringField('State', validators=[DataRequired()])
    country = StringField('Country', validators=[DataRequired()])
    zip = IntegerField('Zip', validators=[DataRequired()])
    lat = DecimalField('Latitude', validators=[DataRequired()])
    lng = DecimalField('Longitude', validators=[DataRequired()])
    name = StringField("Name", validators=[DataRequired()])
    phone = StringField("Phone", validators=[DataRequired()])
    description = TextAreaField("Description", validators=[DataRequired()])
    price = SelectField("Type", choices=PRICES, validators=[DataRequired()])
    submit = SubmitField("Submit")
