console.log('main.js')

import API from "./dbCalls";
import interestForm from "./interestForm";
import displayInt from "./displayInterests";

const formContainer = document.querySelector('#form-container');
const formSelect = document.querySelector('#interest-form-select');
const submitBtn = document.querySelector('#interest-form-save-btn');
const formNameInput = document.querySelector('#interest-form-name');
const formDescription = document.querySelector('#interest-form-desc');
const formCostInput = document.querySelector('#interest-form-cost');
const formReviewInput = document.querySelector('#interest-form-review');
const hiddenInputId = document.querySelector('#hidden-input');

const output = document.querySelector('.output');

// Interest form event listeners
formNameInput.addEventListener('keyup', (e) => {
    formNameInput.classList.remove('warning');
})

formDescription.addEventListener('keyup', (e) => {
    formDescription.classList.remove('warning');
})

formCostInput.addEventListener('keyup', (e) => {
    formCostInput.classList.remove('warning');
})

formReviewInput.addEventListener('keyup', (e) => {
    formReviewInput.classList.remove('warning');
})

formSelect.addEventListener('change', (e) => {
    formSelect.classList.remove('warning');
})

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (!formNameInput.value) {
        formNameInput.classList.add('warning');
    } else if (!formDescription.value) {
        formDescription.classList.add('warning');
    } else if (!formCostInput.value) {
        formCostInput.classList.add('warning');
    } else if (formSelect.value === 'choose') {
        formSelect.classList.add('warning');
    } else {
        if (!hiddenInputId.value) {
            const newInterestObj = {
                name: formNameInput.value,
                description: formDescription.value,
                cost: Number(formCostInput.value),
                placeId: Number(formSelect.value),
                review: ''
            }

            output.innerHTML = '';

            API.addNewInterest(newInterestObj)
                .then(response => {
                    displayInt.renderAll(output);
                })
        } else {
            const updatedInterestObj = {
                name: formNameInput.value,
                description: formDescription.value,
                cost: Number(formCostInput.value),
                placeId: Number(formSelect.value),
                review: formReviewInput.value
            }

            API.updateInterest(hiddenInputId.value, updatedInterestObj)
                .then(response => {
                    displayInt.renderAll(output);
                })
        }

        hiddenInputId.value = '';
        formNameInput.value = '';
        formDescription.value = '';
        formCostInput.value = '';
        formReviewInput.value = '';
        formSelect.value = 'choose';
    }
})

// Output listener
output.addEventListener('click', (e) => {
    if (e.target.className === 'interest-edit-btn') {
        const editId = e.target.id.split('--')[1];
        output.innerHTML = '';
        formReviewInput.classList.remove('hidden');
        submitBtn.value = 'Update';

        API.getOneInterest(editId)
            .then(interest => {
                hiddenInputId.value = interest.id;
                formNameInput.value = interest.name;
                formDescription.value = interest.description;
                formCostInput.value = interest.cost;
                formReviewInput.value = interest.review;
                formSelect.value = interest.place.id;
            })
    }
    if (e.target.className === 'interest-delete-btn') {
        const userResponse = prompt('Are you sure you want to delete this item?');
        if (userResponse === '') {
            const deleteId = e.target.id.split('--')[1];
            output.innerHTML = '';
            API.deleteInterest(deleteId)
                .then(response => {
                    displayInt.renderAll(output);
                })
        }
    }
})

////////

// Populate form with select options
interestForm.addSelectOptions(formSelect);

// Render all interests to DOM
displayInt.renderAll(output);