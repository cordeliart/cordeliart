const body = document.querySelector("body"),
  headselect = body.querySelector(".headselect"),
  head = body.querySelector(".head"),
  shirtselect = body.querySelector(".shirtselect"),
  shirt = body.querySelector(".shirt"),
  pantsselect = body.querySelector(".pantsselect"),
  pants = body.querySelector(".pants"),
  sss = body.querySelectorAll('.slimg'),
  camera = body.querySelector('.camera'),
  sender = body.querySelector('.sender'),
  bg = body.querySelector('.bg'),
  sendConfirm = sender.querySelector('#sendConfirm'),
  // cancel = body.querySelector('#cancel'),
  exit = body.querySelector('.exit'),
  zoom = body.querySelector('.mover'),
  backer = body.querySelector('.backer'),
  credentials = {
    Host: 'smtp.gmail.com',
    Port: 587,
    Secure: true,
    Auth: {
      User: 'munsoninstallation@gmail.com',
      Pass: 'vujr xjmj rtky wfya',
    }
  };
var munson;
var address;
var zoomNow = 'full';

document.querySelectorAll('.splide').forEach(carousel => new Splide( carousel,{
  type   : 'loop',
  perPage: 3,
  perMove: 1,
  pagination: false,
  gap: 0,
  // focus: 'center',
}).mount());

// BASIC ZOOM IN AND OUT

function draw() {}

head.addEventListener("click", () =>{
  close();
  head.classList.add("open");
  exit.classList.add('open');
  camera.classList.add('hidden');

  bg.style.transform = 'scale(1.8) translate(15vh,25vh)';
  for (var i = 0; i < sss.length; ++i) {
    sss[i].classList.add('scaler');
  }

  head.style.top = '40vh';
  shirt.style.top = '59.5vh';
  pants.style.top = '92.5vh';
})

shirt.addEventListener("click", () =>{
  close();
  shirt.classList.add("open");
  exit.classList.add('open');
  camera.classList.add('hidden');

  bg.style.transform = 'scale(1.6) translate(15vh,6vh)';
  for (var i = 0; i < sss.length; ++i) {
    sss[i].classList.add('scaler');}

  head.style.top = '10vh';
  shirt.style.top = '29.5vh';
  pants.style.top = '62.5vh';
})

pants.addEventListener("click", () =>{
  close();
  pants.classList.add("open");
  exit.classList.add('open');
  camera.classList.add('hidden');

  bg.style.transform = 'scale(1.5) translate(15vh,-11vh)';
  for (var i = 0; i < sss.length; ++i) {
    sss[i].classList.add('scaler');}

  head.style.top = '-23vh';
  shirt.style.top = '-3.5vh';
  pants.style.top = '29.5vh';
})

camera.addEventListener("click", () =>{
  sender.classList.add('sending');
  zoom.classList.add('moveover');
  camera.classList.add('hidden');
})

exit.addEventListener("click", () =>{
  close();
  bg.style.transform = 'scale(1)';
  bg.style.top = '-5vh';
  bg.style.bottom = '-5vh';
  bg.style.left = '-0';
  for (var i = 0; i < sss.length; ++i) {
    sss[i].classList.remove('scaler');}

  head.style.top = '15vh';
  shirt.style.top = '28vh';
  pants.style.top = '50vh';
})

function close() {
  head.classList.remove("open");
  shirt.classList.remove("open");
  pants.classList.remove("open");
  exit.classList.remove('open');
  camera.classList.remove('hidden');
}

// CAMERA STUFF

// exit camera
backer.addEventListener('click', () =>{
  zoom.classList.remove('moveover');
  sender.classList.remove('sending');
  camera.classList.remove('hidden');
})

sendConfirm.addEventListener("click", () =>{
  address = document.getElementById("emailadd").value;
  console.log(address);

  html2canvas(document.querySelector("#capture")).then(canvas => {
    Email.send({
      Host: 'smtp.gmail.com',
      Port: 587,
      Secure: true,
      Username: 'munsoninstallation@gmail.com',
      Password: 'vujr xjmj rtky wfya',
      To : address,
      From : "you@gmail.com",
      Subject : "Build-a-Munson",
      Body : "Look at Munson go!!",
      Attachments : [
      {
        name : "munson.png",
        data : canvas.toDataURL()
      }]
    }).then(
      message => alert(message)
    );
  })
  
  zoom.classList.remove('moveover');
  sender.classList.remove('sending');
  camera.classList.remove('hidden');
})

// cancel.addEventListener("click", () =>{
//   sender.classList.remove('open');
// })