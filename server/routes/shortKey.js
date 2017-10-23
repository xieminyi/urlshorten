'use strict';

//!\ METHOD : random key
// - @return random key
// - @return error
exports.generate_short_code = function(req, res) {
  try{
    let d = new Date().getTime();
    let uuid = 'xyx4xyy'.replace(/[xy]/g,function(c) {
      let r = (d + Math.random()*16)%16 | 0;
      d = Math.floor(d/16);
      return (c=='x' ? r : (r&0x7|0x8)).toString(16);
    });
    res.json({newKey: uuid.toLowerCase()});
  } catch (err){
    res.send('Could not decode request: Internal error');
    // or Log err and time to log file /var/log/myserver.log
  }
}

