import db from '../databases/mongodb.js';
import { transactionSchema } from '../schemas/transactionSchema.js';
import dayjs from 'dayjs';

export async function pegarTransacoes(req, res) {
  const { user } = res.locals;
  console.log(user._id);
  try {
    const transactions = await db
      .collection('transactions')
      .find({ userId: user._id })
      .toArray();

    res.status(200).send(transactions);
  } catch (error) {
    console.error('Não foi possível pegar as transações do usuário');
  }
}

export async function cadastrarTransaction(req, res) {
  const { value, description, type } = req.body;

  const validate = transactionSchema.validate({ value, description, type });

  if (validate.error) {
    return res.sendStatus(422);
  }

  try {
    const { user } = res.locals;
    await db
      .collection('transactions')
      .insertOne({
        value,
        description,
        type,
        userId: user._id,
        createAt: dayjs().format('DD/MM')
      });
    res.sendStatus(201);
  } catch (error) {
    console.error('Deu pau na hora de cadastrar a transacao');
    res.sendStatus(500);
  }
}
