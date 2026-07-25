const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req,res)=>{

    res.send("DRK Esports Sunucusu Çalışıyor!");

});


// KAYIT OL

app.post("/register", (req,res)=>{

    const {ad, soyad, kullanici, email, sifre} = req.body;


    let users = JSON.parse(
        fs.readFileSync("users.json")
    );


    const mevcut = users.find(
        user => user.email === email
    );


    if(mevcut){

        return res.json({
            mesaj:"Bu e-posta zaten kayıtlı!"
        });

    }


    users.push({

        ad,
        soyad,
        kullanici,
        email,
        sifre

    });


    fs.writeFileSync(
        "users.json",
        JSON.stringify(users,null,2)
    );


    res.json({

        mesaj:"Kayıt başarılı!"

    });


});


// GİRİŞ YAP

app.post("/login", (req,res)=>{

    const {email, sifre} = req.body;


    let users = JSON.parse(
        fs.readFileSync("users.json")
    );


    const user = users.find(
        kullanici =>
        kullanici.email === email &&
        kullanici.sifre === sifre
    );


    if(user){

return res.json({

    basarili:true,

    mesaj:"Giriş başarılı!",

    kullanici:user

});

    }


    res.json({

    basarili:false,
    mesaj:"E-posta veya şifre yanlış!"

});


});

app.listen(3000,()=>{

    console.log("DRK Esports server çalışıyor!");

});