import express from 'express';
import joi from 'joi';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import dayjs from 'dayjs';

const app = express();

app.use(express.json());
app.use(cors());
dotenv.config();

let db = null;
const mongoClient = new MongoClient(process.env.MONGO_DB_URI);
const promise = mongoClient.connect().then(() => {
  db = mongoClient.db(process.env.MONGO_DATABASE_NAME);
});

promise.catch(err => {
  console.log('Deu pau ao conectar o banco de dados!!!!');
});

app.post('/participants', async (req, res) => {
  const participant = req.body;

  const participantsSchema = joi.object({
    name: joi.string().required()
  });

  const { error } = participantsSchema.validate(participant);

  if (error) {
    return res.sendStatus(422);
  }

  try {
    const participantExists = await db
      .collection('participants')
      .findOne({ name: participant.name });
    if (participantExists) {
      return res.sendStatus(409);
    }

    await db
      .collection('participants')
      .insertOne({ name: participant.name, lastStatus: Date.now() });

    await db.collection('messages').insertOne({
      from: participant.name,
      to: 'Todos',
      text: 'entra na sala...',
      type: 'status',
      time: dayjs().format('HH:mm:ss')
    });

    res.sendStatus(201);
  } catch (error) {
    console.error({ error });
    res.status(500).send('Deu zica na hora de cadastrar o participante ou a mensagem');
  }
});

app.get('/participants', async (req, res) => {
  try {
    const participants = await db.collection('participants').find();
    res.send(participants);
  } catch (error) {
    console.error({ error });
    res.status(500).send('Deu pau na hora de pegar todos os participantes!');
  }
});

app.post('/messages', async (req, res) => {
  const message = req.body;
  const { user } = req.headers;

  const messageSchema = joi.object({
    to: joi.string().required(),
    text: joi.string().required(),
    type: joi.string().valid('message', 'private_message')
  });

  const { error } = messageSchema.validate(message);

  if (error) {
    return res.sendStatus(422);
  }

  try {
    const participant = await db.collection('participants').findOne({ name: user });
    if (!participant) {
      return res.sendStatus(422);
    }

    const { to, text, type } = message;
    await db.collection('messages').insertOne({
      to,
      text,
      type,
      from: user,
      time: dayjs().format('HH:mm:ss')
    });

    res.sendStatus(201);
  } catch (error) {
    return res.status(500).send('Deu pau na hora de gravar a mensagem');
  }
});

app.get('/messages', async (req, res) => {
  const limit = parseInt(req.query.limit);
  const { user } = req.headers; //const user = req.header("User");
  console.log({ user });
  try {
    const messages = await db.collection('messages').find().toArray();
    const filteredMessages = messages.filter(message => {
      const { from, to, type } = message;
      const toUser = to === 'Todos' || to === user || from === user;
      const isPublic = type === 'message';

      return toUser || isPublic; // true/false
    });

    if (limit && limit !== NaN) {
      return res.send(filteredMessages.slice(-limit));
    }

    res.send(filteredMessages);
  } catch (e) {
    console.log('Erro ao obter mensagens', e);
    res.sendStatus(500);
  }
});

app.post('/status', async (req, res) => {
  const { user } = req.headers; //const user = req.header("User");
  try {
    const participant = await db.collection('participants').findOne({ name: user });
    if (!participant) return res.sendStatus(404);

    await db
      .collection('participants')
      .updateOne({ name: user }, { $set: { lastStatus: Date.now() } });
    res.sendStatus(200);
  } catch (e) {
    console.log('Erro ao atualizar status', e);
    res.sendStatus(500);
  }
});

const TIME_TO_CHECK = 15 * 1000; // 15s
setInterval(async () => {
  console.log('removendo a galera');
  const seconds = Date.now() - 10 * 1000; // 10s
  console.log({ seconds });
  try {
    const inactiveParticipants = await db
      .collection('participants')
      .find({ lastStatus: { $lte: seconds } })
      .toArray();
    if (inactiveParticipants.length > 0) {
      const inativeMessages = inactiveParticipants.map(inactiveParticipant => {
        return {
          from: inactiveParticipant.name,
          to: 'Todos',
          text: 'sai da sala...',
          type: 'status',
          time: dayjs().format('HH:mm:ss')
        };
      });

      await db.collection('messages').insertMany(inativeMessages);
      await db.collection('participants').deleteMany({ lastStatus: { $lte: seconds } });
    }
  } catch (e) {
    console.log('Erro ao remover usuários inativos!', e);
    res.sendStatus(500);
  }
}, TIME_TO_CHECK);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Servidor funfando por aqui -> ${PORT} !!!`);
});
