const _ = require('lodash')
const mongoose = require('mongoose')
const { Path } = require('path-parser')
const requireCredits = require('../middlewares/requireCredits')
const requireLogin = require('../middlewares/requireLogin')
const Mailer = require('../services/mailer')
const surveyTemplate = require('../services/emailTemplates/surveyTemplate')

const Survey = mongoose.model('surveys')

module.exports = (app) => {
  app.get('/api/surveys', requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }, '-recipients')

    res.send(surveys)
  })

  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for voting!')
  })

  app.post('/api/surveys/webhooks', (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice')

    const events = _.chain(req.body)
      .map(({ url, email }) => {
        const match = p.test(new URL(url).pathname)
        if (match) {
          return { email, ...match }
        }
      })
      .compact()
      .uniqBy('email', 'surveyId')
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne({
          _id: surveyId,
          recipients: {
            $elemMatch: { email, responded: false },
          },
        }, {
          $inc: { [choice]: 1 },
          $set: { 'recipients.$.responded': true },
          lastResponded: new Date(),
        }).exec()
      })
      .value()

    console.log(events)

    res.send({})
  })

  app.post('/api/surveys',
    requireLogin,
    requireCredits,
    async (req, res) => {
      const { title, subject, body, recipients } = req.body

      const survey = new Survey({
        title,
        subject,
        body,
        recipients: recipients.split(',').map(e => ({ email: e.trim() })),
        _user: req.user.id,
        dateSent: Date.now(),
      })

      const mailer = new Mailer(survey, surveyTemplate(survey))

      try {
        await mailer.send()
        await survey.save()
        req.user.credits -= 1
        const user = await req.user.save()

        res.send(user)
      } catch (error) {
        res.status(402).send(error)
      }
    },
  )
}
