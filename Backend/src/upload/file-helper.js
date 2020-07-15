const fs = require('fs'), sharp = require('sharp');

exports.compressImage = (file, size) => {
    var arquivo = file[0].path;
    var newPath = file[0].path.split('.')[0] + '.webp';

    return sharp(arquivo).resize(size).toFormat('webp').webp({
        quality: 80
    }).toBuffer().then(data => {
        fs.access(arquivo, (err) => {
            if(!err){
                fs.unlink(arquivo, err => {
                    if(err) console.log(err)      
                })
            } 
        });

        fs.writeFile(newPath, data, err => {
            if(err){
                throw err;
            }
        });

        return newPath;
    })
}