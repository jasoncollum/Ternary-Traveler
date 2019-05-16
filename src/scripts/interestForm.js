// Build and render form select options

import API from "./dbCalls"

const interestForm = {
    addSelectOptions(formSelect) {
        API.getAllPlaces()
            .then(places => {
                places.forEach(place => {
                    const option = document.createElement('option');
                    option.id = `option--${place.id}`;
                    option.className = 'select-option';
                    option.value = `${place.id}`;
                    option.textContent = `${place.name}`;
                    formSelect.append(option);
                })
            })
    }
}

export default interestForm;