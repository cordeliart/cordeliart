const body = document.querySelector("body"),
  faceselect = body.querySelector(".faceselect"),
  face = body.querySelector(".face"),
  headselect = body.querySelector(".headselect"),
  head = body.querySelector(".head"),
  shirtselect = body.querySelector(".shirtselect"),
  shirt = body.querySelector(".shirt"),
  pantsselect = body.querySelector(".pantsselect"),
  pants = body.querySelector(".pants"),
  camera = body.querySelector('.camera'),
  sender = body.querySelector('.sender'),
  bg = body.querySelector('.bg'),
  sendConfirm = sender.querySelector('#sendConfirm'),
  exit = body.querySelector('.exit'),
  exiter1 = body.querySelector('.exiter1'),
  exiter2 = body.querySelector('.exiter2'),
  zoom = body.querySelector('.mover'),
  backer = body.querySelector('.backer');
var munson;
var address;

// SPLIDE

document.querySelectorAll('.splide').forEach(carousel => new Splide( carousel,{
  type   : 'loop',
  perPage: 3,
  perMove: 1,
  pagination: false,
  gap: 0,
  clones: 2,
  // focus: 'center',
}).mount());
const spclones = body.querySelectorAll('.slide__slide--clone');
for (var i = 0; i < spclones.length; ++i) {
  spclones[i].classList.add('slimg');
}
const scaling = body.querySelectorAll('.slimg');

// BASIC ZOOM IN AND OUT

function draw() {}

faceselect.addEventListener("click", () =>{
  // click  face
  close();
  face.classList.add("open");
  exit.classList.add('open');
  camera.classList.add('hidden');
  exiter1.style.display = 'block';
  exiter2.style.display = 'block';
  faceselect.style.display = 'none';
  headselect.style.display = 'none';
  shirtselect.style.display = 'none';
  pantsselect.style.display = 'none';

  bg.style.transform = 'scale(1.8) translate(15vh,25vh)';
  for (var i = 0; i < scaling.length; ++i) {
    scaling[i].classList.add('scaler');
  }

  face.style.top = '41.5vh';
  head.style.top = '28vh';
  shirt.style.top = '59.5vh';
  pants.style.top = '92.5vh';
})

headselect.addEventListener("click", () =>{
  // click  hat
  close();
  head.classList.add("open");
  exit.classList.add('open');
  camera.classList.add('hidden');
  exiter1.style.display = 'block';
  exiter2.style.display = 'block';
  faceselect.style.display = 'none';
  headselect.style.display = 'none';
  shirtselect.style.display = 'none';
  pantsselect.style.display = 'none';

  bg.style.transform = 'scale(1.8) translate(15vh,25vh)';
  for (var i = 0; i < scaling.length; ++i) {
    scaling[i].classList.add('scaler');
  }

  face.style.top = '41.5vh';
  head.style.top = '28vh';
  shirt.style.top = '59.5vh';
  pants.style.top = '92.5vh';
})

shirtselect.addEventListener("click", () =>{
  // click shirt
  close();
  shirt.classList.add("open");
  exit.classList.add('open');
  camera.classList.add('hidden');
  exiter1.style.display = 'block';
  exiter2.style.display = 'block';
  faceselect.style.display = 'none';
  headselect.style.display = 'none';
  shirtselect.style.display = 'none';
  pantsselect.style.display = 'none';

  bg.style.transform = 'scale(1.6) translate(15vh,6vh)';
  for (var i = 0; i < scaling.length; ++i) {
    scaling[i].classList.add('scaler');}

  face.style.top = '11.5vh';
  head.style.top = '-2vh';
  shirt.style.top = '29.5vh';
  pants.style.top = '62.5vh';
})

pantsselect.addEventListener("click", () =>{
  // click pants
  close();
  pants.classList.add("open");
  exit.classList.add('open');
  camera.classList.add('hidden');
  exiter1.style.display = 'block';
  faceselect.style.display = 'none';
  headselect.style.display = 'none';
  shirtselect.style.display = 'none';
  pantsselect.style.display = 'none';

  bg.style.transform = 'scale(1.5) translate(15vh,-11vh)';
  for (var i = 0; i < scaling.length; ++i) {
    scaling[i].classList.add('scaler');}

  face.style.top = '-21.5vh';
  head.style.top = '-35vh';
  shirt.style.top = '-3.5vh';
  pants.style.top = '29.5vh';
})

exit.addEventListener("click", () =>{
  // listens for exit
  zoomOut();
  close();
})

exiter1.addEventListener("click", () =>{
  // listens for exit
  zoomOut();
  close();
})

exiter2.addEventListener("click", () =>{
  // listens for exit
  zoomOut();
  close();
})

function zoomOut() {
  // zooms out
  bg.style.transform = 'scale(1)';
  bg.style.top = '-5vh';
  bg.style.bottom = '-5vh';
  bg.style.left = '-0';
  for (var i = 0; i < scaling.length; ++i) {
    scaling[i].classList.remove('scaler');}

  face.style.top = '16vh';
  head.style.top = '7vh';
  shirt.style.top = '28vh';
  pants.style.top = '50vh';
  headselect.style.display = 'block';
  shirtselect.style.display = 'block';
  pantsselect.style.display = 'block';
  faceselect.style.display = 'block';
}

function close() {
  // hide everything (from both zoom and camera move)
  face.classList.remove("open");
  head.classList.remove("open");
  shirt.classList.remove("open");
  pants.classList.remove("open");
  exit.classList.remove('open');
  camera.classList.remove('hidden');
  exiter1.style.display = 'none';
  exiter2.style.display = 'none';
}

// SHARING

camera.addEventListener("click", () =>{
  // click share
  sender.classList.add('sending');
  zoom.classList.add('moveover');
  camera.classList.add('hidden');
})

backer.addEventListener('click', () =>{
  // exit share
  zoom.classList.remove('moveover');
  sender.classList.remove('sending');
  camera.classList.remove('hidden');
})

// EMAILING

sendConfirm.addEventListener("click", () =>{
  // saves input
  address = document.getElementById("emailadd").value;

  // sends email

  // Email.send({
  //   // SecureToken: 'b3988c3f-6748-4eb9-969e-97b334726cb4',
  //   Host: 's1.maildns.net',
  //   Username: 'munsoninstallation@gmail.com',
  //   Password: 'vujr xjmj rtky wfya',
  //   To : address,
  //   From : "munsoninstallation@gmail.com",
  //   Subject : "Your Build-a-Munson",
  //   Body : "Look at Munson go!!"
  //     // Attachments : [
  //     // {
  //     //   name : "munson.png",
  //     //   data : canvas.toDataURL()
  //     // }]
  // }).then(
  //   message => alert(message)
  // );
  html2canvas(body.querySelector("#capture")).then(canvas => {
    var imagedata = canvas.toDataURL('image/png');
    var imgdata = imagedata.replace(/^data:image\/(png|jpg);base64,/, "");
    $.ajax({
      type: 'POST',
      url: 'script/PHPMailer/mail.php',
      data: {address:address,
        imgdata: imgdata}
      // success: function (response) {
      //   console.log(respnse);
      // }
    })
  })
  
  console.log(address);
  
  // resets to screen
  zoom.classList.remove('moveover');
  sender.classList.remove('sending');
  camera.classList.remove('hidden');
})