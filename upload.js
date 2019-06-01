// 读取到的图片base64，转成文件流

import { FileCompress } from '@/utils/FileCompress'

var fileCompress = new FileCompress(file)
fileCompress.readFile(Base64 => {
   fileCompress.convertBase64UrlToBlob(Base64)
}
