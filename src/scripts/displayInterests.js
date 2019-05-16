import API from "./dbCalls";

const displayInt = {
    renderAll(output) {
        API.getAllInterests()
            .then(interests => {
                const interestsDiv = document.createElement('div');
                // interestsDiv.innerHTML = '';
                interests.forEach(interest => {
                    const intDiv = document.createElement('div');
                    intDiv.setAttribute('id', `interest--${interest.id}`);
                    intDiv.className = 'interest-item';

                    const intPlace = document.createElement('h4');
                    intPlace.textContent = `${interest.place.name}`;

                    const intName = document.createElement('p');
                    intName.textContent = `${interest.name}`;

                    const intDesc = document.createElement('p');
                    intDesc.textContent = `${interest.description}`;

                    const intCost = document.createElement('p');
                    intCost.textContent = `$${interest.cost}`;

                    const intReview = document.createElement('p');
                    intReview.textContent = `${interest.review}`;

                    const intEditBtn = document.createElement('button');
                    intEditBtn.setAttribute('id', `edit-btn--${interest.id}`);
                    intEditBtn.className = 'btn interest-edit-btn';
                    intEditBtn.textContent = 'Edit';

                    const intDeleteBtn = document.createElement('button');
                    intDeleteBtn.setAttribute('id', `delete-btn--${interest.id}`);
                    intDeleteBtn.className = 'btn interest-delete-btn';
                    intDeleteBtn.textContent = 'Delete';

                    intDiv.append(intPlace, intName, intDesc, intCost);

                    if (interest.review) {
                        intDiv.append(intReview);
                    }

                    intDiv.append(intEditBtn, intDeleteBtn);

                    interestsDiv.append(intDiv);

                    output.append(interestsDiv);
                })
            })
    }
}

export default displayInt;