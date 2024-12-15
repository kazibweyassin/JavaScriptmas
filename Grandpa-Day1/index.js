// Get references to DOM elements
const itemInput = document.getElementById('item-input');
const addItemButton = document.getElementById('add-item-button');
const shoppingList = document.getElementById('shopping-list');
const listArr = []; // Store the original inputs for display
const normalizedSet = new Set(); // Store normalized inputs for duplicate checking

// Function to check for duplicates and add item to the list
function checkDuplicate() {
    // Normalize the input (trim spaces and standardize casing)
    const rawInput = itemInput.value; // Grandpa's input
    const normalizedInput = normalizeText(rawInput); // Normalized version

    // Check for duplicates
    if (normalizedSet.has(normalizedInput)) {
        alert(`"${rawInput.trim()}" is already on the list!`);
        itemInput.value = ''; // Clear the input field
        return;
    }

    // Add to the list if not a duplicate
    if (rawInput.trim() !== '') {
        listArr.push(rawInput.trim());
        normalizedSet.add(normalizedInput);
        renderList();
    } else {
        alert("Please enter a valid item."); // Prevent adding empty strings
    }
}

// Helper function to normalize text
function normalizeText(text) {
    return text.trim().replace(/\s+/g, ' ').toLowerCase();
}

// Function to render the shopping list
function renderList() {
    shoppingList.innerHTML = ''; // Clear current list
    listArr.forEach((gift, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = gift;

        // Add Edit and Delete buttons
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-button');
        editButton.onclick = () => editItem(index);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.onclick = () => deleteItem(index);

        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);

        shoppingList.appendChild(listItem);
    });
    itemInput.value = ''; // Clear the input field
}

// Function to edit an item in the list
function editItem(index) {
    const newItem = prompt('Edit item:', listArr[index]);
    if (newItem) {
        const normalizedNewItem = normalizeText(newItem);
        if (normalizedSet.has(normalizedNewItem) && normalizeText(listArr[index]) !== normalizedNewItem) {
            alert('This item already exists in the list!');
        } else {
            // Update both arrays
            normalizedSet.delete(normalizeText(listArr[index])); // Remove old normalized version
            listArr[index] = newItem.trim();
            normalizedSet.add(normalizedNewItem); // Add new normalized version
            renderList();
        }
    }
}

// Function to delete an item from the list
function deleteItem(index) {
    normalizedSet.delete(normalizeText(listArr[index])); // Remove from Set
    listArr.splice(index, 1); // Remove from Array
    renderList();
}

// Add event listener to button
addItemButton.addEventListener('click', checkDuplicate);

// Allow adding items by pressing Enter key
itemInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        checkDuplicate();
    }
});
