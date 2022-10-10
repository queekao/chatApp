const messageModel = require("../model/messageModel");

module.exports.addMsg = async (req, res, next) => {
  try {
    const {from, to, message} = req.body;
    await messageModel.create({
      message: {text: message},
      users: [from, to],
      sender: from,
    });
    if (message && to && from)
      return res.json({msg: "Message added successfully"});
    else return res.json({msg: "Failed to add message to the database"});
  } catch (exception) {
    next(exception);
  }
};
module.exports.getAllMsg = async (req, res, next) => {
  try {
    const {from, to} = req.body;
    const messages = await messageModel
      .find({
        users: {
          //get all the message between this two user
          $all: [from, to],
        },
      })
      .sort({upadatedAt: 1}); // a date representing when this document was last updated
    const projectMessage = messages.map((msg) => {
      return {
        fromUser: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    // console.log(messages);
    return res.json(projectMessage);
  } catch (exception) {
    next(exception);
  }
};
