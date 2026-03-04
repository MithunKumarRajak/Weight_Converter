from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.views.decorators.cache import cache_page
from .forms import WeightForm
import logging

logger = logging.getLogger(__name__)


@require_http_methods(["GET", "POST"])
def convert_weight(request):
    """
    Main weight converter view.
    Handles both GET and POST requests for weight conversion.
    """
    result = ""
    result_value = ""
    result_unit = ""
    original_weight = ""
    form = WeightForm()

    if request.method == "POST":
        form = WeightForm(request.POST)
        if form.is_valid():
            try:
                weight = form.cleaned_data.get('weight')
                unit = form.cleaned_data.get('unit', '').upper()
                original_weight = weight

                # Perform conversion
                if unit == "K":
                    converted_weight = round(weight * 2.20462262, 2)
                    result_value = converted_weight
                    result_unit = "Lbs"
                    result = f"Your Weight is: {converted_weight} Lbs (from {weight} KG)"
                    logger.info(f"Converted {weight} KG to {converted_weight} LBS")
                    
                elif unit == "P":
                    converted_weight = round(weight * 0.45359237, 2)
                    result_value = converted_weight
                    result_unit = "Kgs"
                    result = f"Your Weight is: {converted_weight} Kgs (from {weight} LBS)"
                    logger.info(f"Converted {weight} LBS to {converted_weight} KG")
                else:
                    result = f"Invalid unit selected. Please try again."
                    logger.warning(f"Invalid unit attempted: {unit}")

            except (ValueError, TypeError) as e:
                result = "Error occurred during conversion. Please check your input."
                logger.error(f"Conversion error: {str(e)}")
        else:
            logger.warning(f"Form validation failed: {form.errors}")

    context = {
        'form': form,
        'result': result,
        'result_value': result_value,
        'result_unit': result_unit,
        'original_weight': original_weight,
    }

    return render(request, 'converter/index.html', context)
