// Function to fetch data from the backend API and display it
function fetchDataAndDisplay() {
     axios.get('http://localhost:3000/products')
        .then(response => {
            const data = response.data;
            
            displayData(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

// Function to handle editing an item
function handleEdit(item) {
    // Populate form fields with data of the item to be edited
    document.getElementById('exp').value = item.amount;
    document.getElementById('des').value = item.description;
    document.getElementById('cat').value = item.catogary;

    // Remove the existing form submission event listener
    form.removeEventListener('submit', addFormHandler);

    // Add a new form submission event listener for editing
    form.addEventListener('submit', function editFormHandler(event) {
        event.preventDefault();

        // Create an object with the updated data from the form
        const updatedObj = {
            amount: event.target.exp.value,
            description: event.target.des.value,
            catogary: event.target.cat.value,
        };

        // Make a PUT request to update the existing item
        axios.put(`http://localhost:3000/products/${item.id}`, updatedObj)
            .then(() => {
                // After successfully updating the item, fetch updated data and display
                fetchDataAndDisplay();

                // Reset the form
                form.reset();

                // Remove the form submission event listener for editing
                form.removeEventListener('submit', editFormHandler);

                // Re-add the form submission event listener for adding new items
                form.addEventListener('submit', addFormHandler);
            })
            .catch(error => {
                console.error('Error updating item:', error);
            });
    });
}

// Function to delete an item
function handleDelete(id) {
    axios.delete(`http://localhost:3000/products/${id}`)
        .then(() => {
            // After successfully deleting the item, fetch updated data and display
            fetchDataAndDisplay();
        })
        .catch(error => {
            console.error('Error deleting item:', error);
        });
}

// Function to display data on the screen
function displayData(data) {
    const rec = document.getElementById('rec');
    rec.innerHTML = ''; // Clear previous data before displaying new data

    data.forEach(item => {
        const listItem = document.createElement('li');
        const text = document.createTextNode(`${item.amount}\t${item.description}\t${item.catogary}`);
        listItem.appendChild(text);

        const ed = document.createElement('button');
        const del = document.createElement('button');
        ed.innerText = 'edit';
        ed.className = "btn btn-primary btn-sm";
        del.innerText = 'delete';
        del.className = "btn btn-danger btn-sm";

        listItem.appendChild(ed);
        listItem.appendChild(del);
        rec.appendChild(listItem);

        del.onclick = function () {
            handleDelete(item.id);
        };
        ed.onclick = function () {
            handleEdit(item);
        };
    });
}

// Window onload event to fetch data and display it when the page loads
window.onload = function () {
    fetchDataAndDisplay();
};

// Form submission event listener to add new items
const form = document.getElementById('fe');
function addFormHandler(event) {
    event.preventDefault();

    // Create an object with the form data
    const obj = {
        amount: event.target.exp.value,
        description: event.target.des.value,
        catogary: event.target.cat.value,
    };

    // Make a POST request to add the new item
    axios.post('http://localhost:3000/products', obj)
        .then(() => {
            // After successfully adding the item, fetch updated data and display
            fetchDataAndDisplay();

            // Reset the form
            form.reset();
        })
        .catch(error => {
            console.error('Error adding item:', error);
        });
}

// Add form submission event listener for adding new items
form.addEventListener('submit', addFormHandler);
