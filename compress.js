export class FileCompress {
  constructor (file, quality = '0.7') {
    this.file = file
    this.quality = quality
  }

  // 读取文件流，转成BASE64格式
  readFile (callback) {
    let _this = this
    const ready = new FileReader()
    ready.readAsDataURL(_this.file.file)
    ready.onload = function () {
      const re = this.result
      _this.baseToImg(re, callback)
    }
  }

  // 将base64图片 转成Img 得到宽高
  baseToImg (path, callback) {
    let _this = this
    const img = new Image()
    img.src = path
    img.onload = function () {
      const W = this.width
      const H = this.height
      // 创建canvas
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      // 创建属性节点
      var anw = document.createAttribute('width')
      anw.nodeValue = W
      var anh = document.createAttribute('height')
      anh.nodeValue = H
      canvas.setAttributeNode(anw)
      canvas.setAttributeNode(anh)
      ctx.drawImage(img, 0, 0, W, H)
      var base64 = canvas.toDataURL('image/jpeg', _this.quality)
      callback(base64)
    }
  }
  // 将baseUrl转成
  convertBase64UrlToBlob (urlData) {
    var arr = urlData.split(',')
    var mime = arr[0].match(/:(.*?);/)[1]
    var bstr = atob(arr[1])
    var n = bstr.length
    var u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new Blob([u8arr], {type: mime})
  }
}
