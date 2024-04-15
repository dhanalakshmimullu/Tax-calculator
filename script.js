$(document).ready(function() {
    $('#submitBtn').click(function() {
        // Reset error states
        $('.error-icon').hide();
        $('.tooltip').hide();

        // Fetching input values
        var grossIncome = parseFloat($('#grossIncome').val());
        var extraIncome = parseFloat($('#extraIncome').val());
        var age = $('#age').val();
        var deductions = parseFloat($('#deductions').val());

        // Validation
        var error = false;
        if (isNaN(grossIncome) || grossIncome < 0) {
            $('#incomeErrorIcon').show();
            $('#incomeTooltip').show();
            error = true;
        }
        if (isNaN(extraIncome) || extraIncome < 0) {
            $('#extraIncomeErrorIcon').show();
            $('#extraIncomeTooltip').show();
            error = true;
        }
        if (!age) {
            $('#ageErrorIcon').show();
            $('#ageTooltip').show();
            error = true;
        }
        if (isNaN(deductions) || deductions < 0) {
            $('#deductionsErrorIcon').show();
            $('#deductionsTooltip').show();
            error = true;
        }

        if (!error) {
            // Perform tax calculation
            var taxableIncome = Math.max(0, grossIncome + extraIncome - 8);
            var taxRate = 0;
            if (age === '<40') {
                taxRate = 0.3;
            } else if (age === '>=40&<60') {
                taxRate = 0.4;
            } else if (age === '>=60') {
                taxRate = 0.1;
            }
            var taxAmount = taxRate * taxableIncome;
            var overallIncome = (grossIncome + extraIncome) - taxAmount;

            // Display result in modal
            $('#modalContent').html('Your overall income will be <br/>' + overallIncome.toFixed(2) + '<br/> after tax deduction');
            $('#resultModal').modal('show');
        }
    });
});
