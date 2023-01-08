const qri= require('qr-image');
const qr = require('qrcode')
let image;

module.exports =function  (link){
    let strData = link;
    /* console.log(link);
    qr.toString(strData, {type:'svg'},(err, code) =>{
        if(err) return console.log("error occurred");
        png=code;});

    qr.toDataURL(strData, (err, code) =>{
    if(err) return console.log("error occurred")
    console.log(code)}); */
    image=qri.image(strData,{type:"svg"});
    image.pipe(require("fs").createWriteStream("./pub/qrImg.svg"));
}