function searchByPINCode() {
    const pinCode = document.getElementById('postalCode').value;

    if (!pinCode) {
        alert('Please enter a PIN code.');
        return;
    }

    const loadingDiv = document.getElementById('loading');
    const postalCodeInfoDiv = document.getElementById('postalCodeInfo');

    // Display loading message
    loadingDiv.style.display = 'block';
    // Hide postal code info
    postalCodeInfoDiv.style.display = 'none';

    fetch(`https://api.postalpincode.in/pincode/${pinCode}`)
        .then(response => response.json())
        .then(data => {
            // Update UI with location information
            updatePINCodeInfo(data);
        })
        .catch(error => {
            alert('Error fetching data. Please try again.');
            console.error('Error fetching data:', error);
        })
        .finally(() => {
            // Hide loading message after the request is complete
            loadingDiv.style.display = 'none';
        });
}

function updatePINCodeInfo(data) {
    const postalCodeInfoDiv = document.getElementById('postalCodeInfo');

    // Display PIN code info
    postalCodeInfoDiv.style.display = 'block';

    // Add location details to the DOM
    const postOffice = data[0].PostOffice[0];
    document.getElementById('code').textContent = postOffice.Pincode;
    document.getElementById('name').textContent = postOffice.Name;
    document.getElementById('branchtype').textContent = postOffice.BranchType;
    document.getElementById('division').textContent = postOffice.Division;
    document.getElementById('district').textContent = postOffice.District;
    document.getElementById('state').textContent = postOffice.State;
    document.getElementById('country').textContent = postOffice.Country;
}
