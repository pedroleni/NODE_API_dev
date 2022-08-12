const cloudinary = require('cloudinary').v2
const deleteFile = (imgUrl) => {
  console.log("esto es lo que le pasamoos " +imgUrl)
  const imgSplited = imgUrl.split('/')
  const nameSplited = imgSplited[imgSplited.length - 1].split('.')
  const folderSplited = imgSplited[imgSplited.length - 2]
  const public_id = `${folderSplited}/${nameSplited[0]}`;
  console.log(public_id)
  cloudinary.uploader.destroy(public_id, () => {
    console.log('Image delete in cloudinary')
  })
}

module.exports = { deleteFile }