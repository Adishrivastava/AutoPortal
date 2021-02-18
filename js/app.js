const mailer = require("nodemailer")

const transporter = mailer.createTransport({
   service: 'gmail',
   auth:{
      user:'sharingonitachi13@gmail.com',
      pass:'mangekyon'
   }
})

form.addEventListener('submit',(e) =>{
   e.preventDefault();
   let name = form.name.value;
   let owner = form.owner.value;
   let mobile = form.mobile.value;
   let age = form.age.value;
   let carmodel = form.car-model.value;
   let regisno = form.regis-no.value;
   let trim = form.trim.value;
   let brand = form.brand.value;
   let body = {
      from: 'sharingonitachi13@gmail.com',
      to: 'aadi.shrivastava2905@gmail.com',
      subject: 'New seller in autoportal',
      html: '<h2>'+name+'</h2> <br> <p>'+owner+'</p><br><p>'+mobile+'</p><br><p>'+age+'</p><br><p>'+carmodel+'</p><br><p>'+regisno+'</p><br><p>'+trim+'</p><br><p>'+brand
   }

   transporter.sendMail(body,(err,result)=>{
      if(err){
         console.log(err);
         return false;
      }
      console.log(result);
   })
});

  