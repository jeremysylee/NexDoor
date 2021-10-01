/* eslint-disable spaced-comment */
const messagesService = require('./service');

const messagesControllers = {

  addMessage: async (req, res, next) => {
    const params = {
      taskId: req.params.taskId,
      userId: req.params.userId,
    };
    const message = {
      messageBody: req.body.message_body,
      date: req.body.date,
      time: req.body.time,
    };

    try {
      const success = await messagesService.addMessage(params, message);
      res.status(200).send(success);
    } catch (err) {
      next(err);
    }
  },

  getMessagesByTask: async (req, res, next) => {
    const { taskId } = req.params;
    try {
      const messages = await messagesService.getMessagesByTask(taskId);
      res.status(200).send(messages);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = messagesControllers;
