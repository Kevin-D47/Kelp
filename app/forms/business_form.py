from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, TextAreaField, SubmitField
from wtforms.validators import DataRequired

class BusinessForm(FlaskForm):
    userId = IntegerField("userId", validators=[DataRequired()])
    address = StringField("Address", validators=[DataRequired()])
    city = StringField('City', validators=[DataRequired()])
    state = StringField('State', validators=[DataRequired()])
    country = StringField('Country', validators=[DataRequired()])
    zip = IntegerField('Zip', validators=[DataRequired()])
    name = StringField("Name", validators=[DataRequired()])
    phone = IntegerField("Phone", validators=[DataRequired()])
    description = TextAreaField("Description", validators=[DataRequired()])
    price = StringField("Price", validators=[DataRequired()])
    previewImageUrl = StringField("PreviewImage", validators=[DataRequired()])
    type = StringField("Type", validators=[DataRequired()])
    submit = SubmitField("Submit")
