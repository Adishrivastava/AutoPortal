var url = window.location.href;

var queryStart = url.indexOf('?') + 1,
	queryEnd = url.indexOf('#') + 1 || url.length + 1,
	query = url.slice(queryStart, queryEnd - 1),
	pairs = query.replace(/\+/g, ' ').split('&'),
	parms = {},
	i,
	n,
	v,
	nv;

for (i = 0; i < pairs.length; i++) {
	nv = pairs[i].split('=', 2);
	n = decodeURIComponent(nv[0]);
	v = decodeURIComponent(nv[1]);

	if (!parms.hasOwnProperty(n)) parms[n] = [];
	parms[n].push(nv.length === 2 ? v : null);
}

var brandname;
var modelname;

function loop(n, parent) {
	var x = document.getElementById(parent).querySelectorAll('.fa');
	for (let i = 0; i < n; i++) {
		x[i].classList.add('checked');
	}
}
console.log(parms.name[0]);
// putting details of the car
db.collection('stocks')
	.doc(parms.name[0])
	.get()
	.then((doc) => {
		document.getElementById('location').innerHTML = doc.data().location;
		document.getElementById('age').innerHTML = doc.data().age;
		document.getElementById('fuel').innerHTML = doc.data().fuel;
		document.getElementById('kms').innerHTML = doc.data().kms;
		document.getElementById('price').innerHTML += doc.data().price;
		document.getElementById('car').innerHTML += doc.data().brand + ' ';
		document.getElementById('car').innerHTML += doc.data().model;
		document.getElementById('brand1').innerHTML += doc.data().brand;
		document.getElementById('age1').innerHTML += doc.data().age;
		document.getElementById('kms1').innerHTML += doc.data().kms;
		brandname = doc.data().brand;
		modelname = doc.data().model;
		document.getElementsByid('bar1').style.width = doc.data().interest;
		document.getElementsByid('ratetext').style.width = doc.data().interest;
		document.getElementsByid('bar2').style.width = doc.data().tenure;
		document.getElementsByid('tenuretext').style.width = doc.data().tenure;
		document.getElementsByid('emitext').style.width = doc.data().emi;
		n = doc.data().ratingEx;
		loop(n, 'exdiv');

		n = doc.data().ratingIn;
		loop(n, 'indiv');

		n = doc.data().ratingEn;
		loop(n, 'endiv');

		n = doc.data().ratingAir;
		loop(n, 'airdiv');

		n = doc.data().ratingSt;
		loop(n, 'stdiv');

		var length;

		if (doc.data().verified == 'yes') {
			var array = doc.data().externals;

			var ex = document.querySelector('#faq-list-1');
			length = array.length;
			for (var i = 1; i < length; i++) {
				let p = document.createElement('p');
				p.setAttribute('padding-left', '20px');
				p.innerText = array[i];

				ex.append(p);
			}
			var array = doc.data().internals;

			var ex = document.querySelector('#faq-list-2');
			length = array.length;
			for (var i = 1; i < length; i++) {
				let p = document.createElement('p');
				p.setAttribute('padding-left', '20px');
				p.innerText = array[i];

				ex.append(p);
			}
			var array = doc.data().engines;

			var ex = document.querySelector('#faq-list-3');
			length = array.length;
			for (var i = 1; i < length; i++) {
				let p = document.createElement('p');
				p.setAttribute('padding-left', '20px');
				p.innerText = array[i];

				ex.append(p);
			}
			var array = doc.data().airs;

			var ex = document.querySelector('#faq-list-4');
			length = array.length;
			for (var i = 1; i < length; i++) {
				let p = document.createElement('p');
				p.setAttribute('padding-left', '20px');
				p.innerText = array[i];

				ex.append(p);
			}
			var array = doc.data().steers;

			var ex = document.querySelector('#faq-list-5');
			length = array.length;
			for (var i = 1; i < length; i++) {
				let p = document.createElement('p');
				p.setAttribute('padding-left', '20px');
				p.innerText = array[i];

				ex.append(p);
			}
		} else {
			document.getElementById('verify').innerHTML +=
				'<span style="font-size:0.8em padding-left:20px;">(non-verified)</span>';
		}

		// Get a reference to the storage service, which is used to create references in your storage bucket
		var storage = firebase.storage();

		// Create a storage reference from our storage service
		var storageRef = storage.ref();
		// Create a reference under which you want to list
		var listRef = storageRef.child(parms.name[0]);

		// Find all the prefixes and items.
		listRef
			.listAll()
			.then(function (res) {
				var i = 0;
				res.items.forEach(function (itemRef) {
					// All the items under listRef

					itemRef.getDownloadURL().then(function (url) {
						if (i == 0) {
							var ff = document.getElementById('firstimg');
							ff.setAttribute('src', url);
							document.getElementById('img1').setAttribute('src', url);
						} else {
							var imagehtml =
								'<div class="carousel-item"><img src="' +
								url +
								'"class="d-block w-100" alt="..."></div>';
							var carousal = document.getElementById('stock-images');
							carousal.innerHTML += imagehtml;
						}

						var indicartorimage =
							'<img data-target="#carouselExampleIndicators" data-slide-to="' +
							i +
							'" src="' +
							url +
							'" style="height: 70px;" alt="">';

						var indicator = document.getElementById('indicator-images');
						indicator.innerHTML += indicartorimage;

						i++;
					});
				});
			})
			.catch(function (error) {
				// Uh-oh, an error occurred!
			});
	});

db.collection('stocks')
	.get()
	.then(function (querySnapshot) {
		querySnapshot.forEach(function (doc) {
			// doc.data() is never undefined for query doc snapshots
			var storage = firebase.storage();

			// Create a storage reference from our storage service
			var storageRef = storage.ref();
			var suggestion = document.getElementById('suggestions');
			let imgs;
			storageRef
				.child(doc.id + '/0')
				.getDownloadURL()
				.then(function (url) {
					// `url` is the download URL for 'images/stars.jpg'
					console.log(doc.id);
					imgs = url;
					var html =
						'<div class="carousel-item col-12 col-sm-6 col-md-4 col-lg-3"><div class="media d-block media-feature text-center"><img src="' +
						imgs +
						'" style="width: 100%; height: 160px;" alt=""><div class="media-body"><h3 class="mt-3 text-black" style="font-size: 1.4em;">' +
						doc.data().brand +
						'</h3><p class="mt-3"><span>' +
						doc.data().age +
						' YEARS </span> <span class="">' +
						doc.data().kms +
						'km</span></p><p class="mb-0"><a href="details.html?name=' +
						doc.id +
						'" class="btn btn-primary">Veiw full details</a></p></div></div></div>';
					suggestion.innerHTML += html;
				})

				.catch(function (error) {
					// Handle any errors
				});
		});
	})
	.catch(function (error) {
		console.log('Error getting documents: ', error);
	});

// getting form information of buyer
const form = document.querySelector('#buyer-form');
var id;
form.addEventListener('submit', (e) => {
	e.preventDefault();
	db.collection('leads')
		.add({
			brand: brandname,
			model: modelname,
			email: form.email.value,
			name: form.name.value,
			mobile: form.mobile.value,
			location: form.location.value,
			customer: 'buyer',
		})
		.then(function (docRef) {
			console.log('Document written with ID: ', docRef.id);
			db.collection('admin-emails')
				.doc('senders')
				.get()
				.then(function (snapshot) {
					let senderEmail = snapshot.data().email;
					let senderPassword = snapshot.data().password;
					let receiverEmail = snapshot.data().receiveremail;
					console.log(snapshot.id);
					window.location.href =
						'http://webaditya29.000webhostapp.com/travelhub/mailing.php?name=' +
						form.name.value +
						'&email=' +
						form.email.value +
						'&mobile=' +
						form.mobile.value +
						'&location=' +
						form.location.value +
						'&model=' +
						modelname +
						'&brand=' +
						brandname +
						'&id=' +
						parms.name[0] +
						'&customer=buyer&senderEmail=' +
						senderEmail +
						'&senderPassword=' +
						senderPassword +
						'&receiverEmail=' +
						receiverEmail;
				});
		})
		.catch(function (error) {
			console.error('Error adding document: ', error);
		});
});
