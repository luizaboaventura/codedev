import { Router } from "express";
import UserRepository from "../repositories/UserRepository.js";


const userRouter = Router();

userRouter.get("/users", async (req, res) => {
    const users = await UserRepository.getUsers();
    return res.status(200).json(users);
})

userRouter.get("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const user = await UserRepository.getUser(id);

        return res.status(200).send(user);
    } catch (err) {
        return res.status(400).send(err.message);
    }
})

userRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await UserRepository.login(email, password);

        return res.status(200).send(user);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
})

userRouter.post("/users", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await UserRepository.save(name, email, password);

        return res.status(201).send(user);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
})

userRouter.put("/users/:id", async (req, res) => {
    try {
        const body = req.body;
        const { id } = req.params;

        await UserRepository.update(id, body);

        return res.status(200).json({ message: 'Cadastro atualizado com sucesso' });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
})


userRouter.delete("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await UserRepository.deleteUser(id);

        return res.status(204).send('Success');
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
})

export default userRouter;