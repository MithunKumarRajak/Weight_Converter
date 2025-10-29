from django import forms


class WeightForm(forms.Form):
    weight = forms.FloatField(label="What is weight of your:")
    unit = forms.ChoiceField(
        choices=[('K', 'KG'), ('P', 'Pound')],
        label="Unit for weight (K For KG or P For Pound):"
    )
