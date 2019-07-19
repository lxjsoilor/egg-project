'use strict';

const Controller = require('../../core/base_controller');
const path = require('path');
const fs = require('mz/fs');
const toArray = require('stream-to-array');
const sendToWormhole = require('stream-wormhole');
const uuidv1 = require('uuid/v1');

/**
 * Controller - utils upload
 * @class
 * @author ruiyong-lee
 */
class UtilsUploadController extends Controller {
  /**
   * 测试上传
   */
  async upload() {
    let stream;
    let buf;
    const { ctx } = this;

    try {
      stream = await ctx.getFileStream();
      try {
        const parts = await toArray(stream);
        console.log(parts);
        buf = Buffer.concat(parts);
      } catch (err) {
        await sendToWormhole(stream);
        throw err;
      }
      const fileName = `local-upload-image-${uuidv1()}-${stream.filename}`;
      const target = path.join(this.config.baseDir, 'app/public/upload', fileName);
      await fs.writeFile(target, buf);
      ctx.redirect('/public/upload/' + fileName);
    } catch (err) {
      if(err.message === 'Multipart: Boundary not found') {
        this.fail(300, '图片不能为空')
      } else {
        throw new Error(err)
      }
    }
  }
}

module.exports = UtilsUploadController;
