import db from '../databases/mongodb.js';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { authCadastroSchema, authLoginSchema } from '../schemas/authSchema.js';

export async function loginUser(req, res) {
  try {
    const user = req.body;

    const validate = authLoginSchema.validate(user);

    if (validate.error) {
      return res.status(422).send('Email e senha são obrigatorio!!');
    }

    const checkUser = await db.collection('users').findOne({ email: user.email });

    if (!checkUser) {
      return res.status(422).send('Email ou senha inválidos');
    }

    const decryptedPassword = bcrypt.compareSync(user.password, checkUser.password);

    if (decryptedPassword) {
      const token = uuid();
      await db.collection('sessions').insertOne({ token, userId: checkUser._id });

      return res.status(200).send({ token, name: checkUser.name });
    }

    res.status(200).send('cadastrou');
  } catch (error) {
    console.error('Houve um problema ao logar o usuário');
    res.status(500).send('Houve um problema ao logar o usuário');
  }
}

export async function createUser(req, res) {
  try {
    const newUser = req.body;

    const validate = authCadastroSchema.validate(newUser);

    if (validate.error) {
      return res.status(422).send('Todos os dados são obrigatórios');
    }

    const passwordHash = bcrypt.hashSync(newUser.password, 10);

    await db.collection('users').insertOne({
      name: newUser.name,
      email: newUser.email,
      password: passwordHash
    });

    res.status(200).send('cadastrou');
  } catch (error) {
    console.error('Houve um problema ao cadastrar o usuário');
    res.status(500).send('Houve um problema ao cadastrar o usuário');
  }
}
