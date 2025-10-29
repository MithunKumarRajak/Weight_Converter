from django.shortcuts import render

# Create your views here.
from .forms import WeightForm


def convert_weight(request):
    result = ""
    if request.method == "POST":
        form = WeightForm(request.POST)
        if form.is_valid():
            weight = form.cleaned_data['weight']
            unit = form.cleaned_data['unit'].upper()

            if unit == "K":
                KgToPound = weight * 2.20462262
                result = f"Your Weight is: {round(KgToPound, 2)} Lbs"
            elif unit == "P":
                PoundToKg = weight * 0.45359237
                result = f"Your Weight is: {round(PoundToKg, 2)} Kgs"
            else:
                result = f"'{unit}' is an invalid unit. Please enter 'K' for KG or 'P' for Pound."
    else:
        form = WeightForm()

    return render(request, 'converter\index.html', {'form': form, 'result': result})
