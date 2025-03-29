const body = document.querySelector("body"),
  headselect = body.querySelector(".headselect"),
  head = body.querySelector(".head"),
  shirtselect = body.querySelector(".shirtselect"),
  shirt = body.querySelector(".shirt"),
  pantsselect = body.querySelector(".pantsselect"),
  pants = body.querySelector(".pants"),
  camera = body.querySelector('#camera'),
  sender = body.querySelector('.sender'),
  confirm = body.querySelector('#confirm'),
  cancel = body.querySelector('#cancel'),
  exit1 = body.querySelector('#e1'),
  exit2 = body.querySelector('#e2'),
  exit3 = body.querySelector('#e3'),
  zoom = body.querySelector('.zoomer'),
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
var zoomNow = 'nope';

document.querySelectorAll('.splide').forEach(carousel => new Splide( carousel,{
  type: 'loop',
  perPage: 5,
  focus: 'center',
  gap    : 0,
  breakpoints: {
    640: {
      perPage: 2,
      gap    : 0,
      height : '6rem',
    },
    480: {
      perPage: 1,
      gap    : 0,
      height : '6rem',
    },
  }
} ).mount());

if (zoomNow == 'nope') {

  head.addEventListener("click", () =>{
    head.classList.add("open");
    shirt.classList.remove("open");
    pants.classList.remove("open");
    exit1.classList.add('open');
    exit2.classList.remove('open');
    exit3.classList.remove('open');
    zoom.classList.add('zoomin1');
    zoomNow = 1;
  })
  
  shirt.addEventListener("click", () =>{
    head.classList.remove("open");
    shirt.classList.add("open");
    pants.classList.remove("open");
    exit2.classList.add('open');
    exit1.classList.remove('open');
    exit3.classList.remove('open');
    zoom.classList.add('zoomin2');
    zoomNow = 2;
  })
  
  pants.addEventListener("click", () =>{
    head.classList.remove("open");
    shirt.classList.remove("open");
    pants.classList.add("open");
    exit3.classList.add('open');
    exit1.classList.remove('open');
    exit2.classList.remove('open');
    zoom.classList.add('zoomin3');
    zoomNow = 3;
  })

  camera.addEventListener("click", () =>{
    sender.classList.add('open');
    zoom.classList.add('moveover');
  })
}

if (zoomNow != 'nope') {
  exit1.addEventListener("click", close());
  exit2.addEventListener("click", close());
  exit3.addEventListener("click", close());
}

function close() {
  head.classList.remove("open");
  shirt.classList.remove("open");
  pants.classList.remove("open");
  exit1.classList.remove('open');
  exit2.classList.remove('open');
  exit3.classList.remove('open');
  zoom.classList.remove('zoomout');
  zoomNow = 'nope';
}

if (sender.classList.contains("open") == true) {
  confirm.addEventListener("click", () =>{
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
  
  })
  
  cancel.addEventListener("click", () =>{
    sender.classList.remove('open');
  })
}