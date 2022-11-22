from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField, SubmitField
from wtforms.validators import DataRequired


class ImageForm(FlaskForm):
    userId = IntegerField("userId", validators=[DataRequired()])
    businessId = IntegerField("businessId", validators=[DataRequired()])
    imgUrl = StringField("imgUrl", validators=[DataRequired()])
    description = TextAreaField("Description", validators=[DataRequired()])

    submit = SubmitField("Submit")
