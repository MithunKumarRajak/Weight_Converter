from django import forms
from django.core.exceptions import ValidationError


class WeightForm(forms.Form):
    UNIT_CHOICES = [
        ('K', 'Kilograms (KG)'),
        ('P', 'Pounds (LBS)'),
    ]

    weight = forms.FloatField(
        label="Weight",
        widget=forms.NumberInput(attrs={
            'placeholder': 'Enter weight value',
            'step': '0.01',
            'min': '0.01',
            'max': '10000',
            'class': 'form-input',
        }),
        help_text="Enter a positive number",
        error_messages={
            'required': 'Please enter a weight value',
            'invalid': 'Please enter a valid number',
            'max_value': 'Weight cannot exceed 10000',
            'min_value': 'Weight must be greater than 0',
        }
    )
    
    unit = forms.ChoiceField(
        choices=UNIT_CHOICES,
        label="Unit",
        widget=forms.Select(attrs={
            'class': 'form-select',
        }),
        error_messages={
            'required': 'Please select a unit',
            'invalid_choice': 'Please select a valid unit',
        }
    )

    def clean_weight(self):
        weight = self.cleaned_data.get('weight')
        
        if weight is None:
            raise ValidationError('Weight is required.')
        
        if weight <= 0:
            raise ValidationError('Weight must be greater than 0.')
        
        if weight > 10000:
            raise ValidationError('Weight cannot exceed 10000.')
        
        return weight

    def clean_unit(self):
        unit = self.cleaned_data.get('unit')
        
        if not unit:
            raise ValidationError('Please select a unit.')
        
        if unit not in dict(self.UNIT_CHOICES):
            raise ValidationError('Invalid unit selected.')
        
        return unit
