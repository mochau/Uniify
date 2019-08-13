var zid_id;
auth.onAuthStateChanged(user => {
    if (user) {
        console.log('user logged in: ', user);
        var docRef = db.collection("student").doc(firebase.auth().currentUser.uid);
        docRef.get().then(function (doc) {
            zid_id = doc.data().zid;
            console.log(zid_id);
            db.collection('position').where("zid", "==", zid_id).get().then(snapshot => {
                snapshot.docs.forEach(doc => {
                    renderCafe(doc);
                });
            
            });
        });
    }
})

const cafeList = document.querySelector('#manage');

// create element & render cafe
function renderCafe(doc) {
    let tr = document.createElement('tr');
    let fname = document.createElement('td');
    let course = document.createElement('td');
    let status = document.createElement('td');

    tr.setAttribute('data-id', doc.id);
    fname.textContent = doc.data().fname;
    course.textContent = doc.data().course;
    status.textContent = doc.data().status;

    tr.appendChild(fname);
    tr.appendChild(course);
    tr.appendChild(status);

    cafeList.appendChild(tr);

}

//getting data


