auth.onAuthStateChanged(user => {
    if (user) {
        console.log('user logged in: ', user);
        var docRef = db.collection("student").doc(firebase.auth().currentUser.uid);
        docRef.get().then(function (doc) {
            document.getElementById("input_fn").value = doc.data().fname
            document.getElementById("input_deg").value = doc.data().degree
            document.getElementById("input_zid").value = doc.data().zid
            document.getElementById("input_year").value = doc.data().year
            document.getElementById("input_wam").value = doc.data().wam
            document.getElementById("input_phone").value = doc.data().phone
            document.getElementById("check-lic").checked = doc.data().check_tic;
            M.updateTextFields();
        })
    }
})

const form = document.querySelector('#student-form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log("user id: " + firebase.auth().currentUser.uid);
    db.collection('student').doc(firebase.auth().currentUser.uid).set({
        fname: document.getElementById("input_fn").value,
        degree: document.getElementById("input_deg").value,
        zid: document.getElementById("input_zid").value,
        year: document.getElementById("input_year").value,
        wam: document.getElementById("input_wam").value,
        phone: document.getElementById("input_phone").value,
        //check_tic: document.getElementById("check-lic").checked
    });
    if (document.getElementById("check_code").value == "ISTM") {
        M.toast({ html: 'LIC Code Valid!', classes: 'rounded' });
        db.collection('student').doc(firebase.auth().currentUser.uid).update({
            check_tic: document.getElementById("check-lic").checked
        });
    } else {
        M.toast({ html: 'Please check LIC Code!', classes: 'rounded' });
    }
    console.log("doc: " + document.getElementById("check-lic").checked);
    document.getElementById("check-lic").checked = true;
    form.reset();
    M.toast({ html: 'Record updated successfully!', classes: 'rounded' });
    var docRef = db.collection("student").doc(firebase.auth().currentUser.uid);
    docRef.get().then(function (doc) {
        console.log("fname: ", doc.data().fname);
        document.getElementById("input_fn").value = doc.data().fname;
        document.getElementById("input_deg").value = doc.data().degree
        document.getElementById("input_zid").value = doc.data().zid
        document.getElementById("input_year").value = doc.data().year
        document.getElementById("input_wam").value = doc.data().wam
        document.getElementById("input_phone").value = doc.data().phone
        document.getElementById("check-lic").checked = doc.data().check_tic;
        console.log("db: " + doc.data().check_tic);
        M.updateTextFields();
    });
});