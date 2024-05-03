import UserEntity from "../entities/User.js"
import { AppDataSource } from "../../database/data-source.js"
import * as bcrypt from 'bcrypt';

const userRepository = AppDataSource.getRepository(UserEntity);

const getUsers = () => {
    return userRepository.find();
};

const getUser = async (id) => {
    return await userRepository.findOneBy({ id });
};

const login = async (email, password) => {
    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
        throw new Error('Email incorreto ou não cadastrado. Tente novamente.')
    }

    if (!bcrypt.compareSync(password, user.password)) {
        throw new Error('Senha incorreta.');
    }

    return await userRepository.findOneBy({ email });
};

const save = async (name, email, password) => {
    const registeredUser = await userRepository.findOne({ where: { email } });

    if (registeredUser) {
        throw new Error('Email já cadastrado.');
    }

    const newUser = {
        email: email,
        name: name,
        password: await bcrypt.hash(password, 10),
    };

    return await userRepository.save(newUser);
};

const update = async (id, user) => {
    if (user.password) {
        user.password = await bcrypt.hash(user.password, 10);
    }

    await userRepository.update({ id }, user);
};

const deleteUser = async (id) => {
    await userRepository.delete({ id })
}

export default { getUsers, save, getUser, update, deleteUser, login };
