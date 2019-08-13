const cafeList = document.querySelector('#review');
const form = document.querySelector('#review-form');

// create element & render cafe
function renderCafe(doc) {
    let tr = document.createElement('tr');
    let fname = document.createElement('td');
    let course = document.createElement('td');
    let review = document.createElement('td');
    let cross = document.createElement('span');

   cross.setAttribute("class", "btn red darken-2");

    tr.setAttribute('data-id', doc.id);
    fname.textContent = doc.data().fname;
    course.textContent = doc.data().course;
    review.textContent = doc.data().review;
    cross.textContent = 'X';

    tr.appendChild(fname);
    tr.appendChild(course);
    tr.appendChild(review);
    tr.appendChild(cross);

    cafeList.appendChild(tr);

    // deleting data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('rev').doc(id).delete();
    });
}

// getting data
// db.collection('cafes').orderBy('city').get().then(snapshot => {
//     snapshot.docs.forEach(doc => {
//         renderCafe(doc);
//     });
// });

// saving data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('rev').add({
        fname: form.input_fn.value,
        course: form.input_course.value,
        review: form.input_review.value
    });
    form.input_fn.value = '';
    form.input_course.value = '';
    form.input_review.value = '';
});


// real-time listener
db.collection('rev').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        console.log(change.doc.data());
        if (change.type == 'added') {
            renderCafe(change.doc);
        } else if (change.type == 'removed') {
            let tr = cafeList.querySelector('[data-id=' + change.doc.id + ']');
            cafeList.removeChild(tr);
        }
    });
});