auth.onAuthStateChanged(user => {
    if (user) {
        console.log('user logged in: ', user);
        var docRef = db.collection("student").doc(firebase.auth().currentUser.uid);
        docRef.get().then(function(doc) {
            document.getElementById("input_fn").value = doc.data().fname
            document.getElementById("input_deg").value = doc.data().degree;
            document.getElementById("input_zid").value = doc.data().zid;
            document.getElementById("input_wam").value = doc.data().wam;
            M.updateTextFields();
        })
    }
})

const form = document.querySelector('#position-form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log("user id: " + firebase.auth().currentUser.uid);
    db.collection('position').add({
        fname: document.getElementById("input_fn").value,
        degree: document.getElementById("input_deg").value,
        zid: document.getElementById("input_zid").value,
        wam: document.getElementById("input_wam").value,
        why: document.getElementById("input_why").value,
        cv: document.getElementById("input_cv").value,
        course: document.getElementById("input_course").value,
        status: "unassigned"
    });
    form.reset();
    M.toast({html: 'Record updated successfully!', classes: 'rounded'});
    var docRef = db.collection("student").doc(firebase.auth().currentUser.uid);
        docRef.get().then(function(doc) {
            document.getElementById("input_fn").value = doc.data().fname
            document.getElementById("input_deg").value = doc.data().degree;
            document.getElementById("input_zid").value = doc.data().zid;
            document.getElementById("input_wam").value = doc.data().wam;
            M.updateTextFields();
        })
});