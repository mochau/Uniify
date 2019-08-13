const cafeList = document.querySelector('#manage');

// create element & render cafe
function renderCafe(doc){
    let tr = document.createElement('tr');
    let fname = document.createElement('td');
    let course = document.createElement('td');
    let wam = document.createElement('td');
    let cv = document.createElement('td');
    let why = document.createElement('td');
    let status = document.createElement('td');
    let tick = document.createElement('button');
    let cross = document.createElement('button');

    tick.setAttribute("class", "btn green darken-2");
    tick.setAttribute("style", "margin-right: 10px;");
    cross.setAttribute("class", "btn red darken-2");

    tr.setAttribute('data-id', doc.id);
    fname.textContent = doc.data().fname;
    course.textContent = doc.data().course;
    wam.textContent = doc.data().wam;
    cv.textContent = doc.data().cv;
    why.textContent = doc.data().why;
    status.textContent = doc.data().status;
    tick.textContent = 'Accept';
    cross.textContent = 'Reject';

    tr.appendChild(fname);
    tr.appendChild(course);
    tr.appendChild(wam);
    tr.appendChild(cv);
    tr.appendChild(why);
    tr.appendChild(status);
    tr.appendChild(tick);
    tr.appendChild(cross);

    cafeList.appendChild(tr);

    tick.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('position').doc(id).update({
            status: "successful"
        });
    });

    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('position').doc(id).update({
            status: "unsuccessful"
        });
    });
}

//getting data
db.collection('position').get().orderBy("course").then(snapshot => {
    snapshot.docs.forEach(doc => {
        renderCafe(doc);
    });

});

