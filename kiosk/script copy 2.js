const body = document.querySelector("body"),
  headselect = body.querySelector(".headselect"),
  head = body.querySelector(".head"),
  shirtselect = body.querySelector(".shirtselect"),
  shirt = body.querySelector(".shirt"),
  pantsselect = body.querySelector(".pantsselect"),
  pants = body.querySelector(".pants"),
  exit1 = body.querySelector("#exit1"),
  exit2 = body.querySelector("#exit2"),
  exit3 = body.querySelector("#exit3"),
  camera = body.querySelector('#camera'),
  closerL = body.querySelector('#closer-left'),
  closerR = body.querySelector('#closer-right'),
  credentials = {
    Host: 'smtp.gmail.com',
    Port: 587,
    Secure: true,
    Auth: {
      User: 'munsoninstallation@gmail.com',
      Pass: 'vujr xjmj rtky wfya',
    }
  };

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

head.addEventListener("click", () =>{
  head.classList.add("open");
  shirt.classList.remove("open");
  pants.classList.remove("open");
  // exit.classList.add("open");
})

shirt.addEventListener("click", () =>{
  head.classList.remove("open");
  shirt.classList.add("open");
  pants.classList.remove("open");
  // exit.classList.add("open");
})

pants.addEventListener("click", () =>{
  head.classList.remove("open");
  shirt.classList.remove("open");
  pants.classList.add("open");
  // exit.classList.add("open");
})

// exit1.addEventListener("click", () =>{
//   head.classList.remove("open");
//   shirt.classList.remove("open");
//   pants.classList.remove("open");
//   // exit.classList.remove("open");
// })

// exit2.addEventListener("click", () =>{
//   head.classList.remove("open");
//   shirt.classList.remove("open");
//   pants.classList.remove("open");
//   // exit.classList.remove("open");
// })

// exit3.addEventListener("click", () =>{
//   head.classList.remove("open");
//   shirt.classList.remove("open");
//   pants.classList.remove("open");
//   // exit.classList.remove("open");
// })

// closerL.addEventListener("click", () =>{
//   head.classList.remove("open");
//   shirt.classList.remove("open");
//   pants.classList.remove("open");
// })

// closerR.addEventListener("click", () =>{
//   head.classList.remove("open");
//   shirt.classList.remove("open");
//   pants.classList.remove("open");
// })

function increase() {
  clearInterval(intervalID)
  intervalID = setInterval(zoomin,10)
}

function increase() {
  clearInterval(intervalID)
  intervalID = setInterval(zoomout,10)
}

camera.addEventListener("click", () =>{
  screenshot();
})

// function screenshot() {
//   html2canvas(document.querySelector("#capture")).then(canvas => {
//       document.body.appendChild(canvas)
//       window.open(canvas);
//   });
// }

function screenshot() {
  html2canvas(document.querySelector("#capture")).then(canvas => {
      document.body.appendChild(canvas)

      // Email.send({
      //   Host: 'smtp.gmail.com',
      //   Port: 587,
      //   Secure: true,
      //   Username: 'munsoninstallation@gmail.com',
      //   Password: 'vujr xjmj rtky wfya',
      //   To : 'them@website.com',
      //   From : "you@gmail.com",
      //   Subject : "Build-a-Munson",
      //   Body : "Look at Munson go!!",
      //   Attachments : [
      //   {
      //     name : "munson.png",
      //     data : canvas.toDataURL()
      //   }]
      // }).then(
      //   message => alert(message)
      // );
      
  });
}

// function screenshot() {
//   $('#capture').html2canvas();
//   var queue = html2canvas.Parse();
//   var canvas = html2canvas.Renderer(queue,{elements:{length:1}});
//   var img = canvas.toDataURL();
//   window.open(img);
//   document.body.appendChild(canvas);
// }

// $('#capture').html2canvas();
// var queue = html2canvas.Parse();
// var canvas = html2canvas.Renderer(queue,{elements:{length:1}});
// var img = canvas.toDataURL();
// window.open(img);
// document.body.appendChild(canvas);

// $('#camera').click(function(){
//   html2canvas($('#capture'),
//   {
//     onrendered: function (canvas) {
//       var a = document.createElement('a');
//       a.href = canvas.toDataURL;
//       a.download = 'iamge.png';
//       a.click();
//     }
//   }
// )
// })