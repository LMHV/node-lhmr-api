"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = void 0;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma.user.findFirst();
        res.json({
            message: 'Successful response',
            data: users
        });
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: error.message });
    }
});
exports.getUsers = getUsers;
/*
export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ error: error.message })
    }
}

export const createUser = async (req, res) => {
    try {
        const { name, email, password, age } = req.body;
        const user = new User({
            name,
            email,
            password,
            age
        })

        // Check if exists
        const existUser = await User.findOne({ email: req.body.email })
        if (existUser) {
            console.log('Email already exist')
            return res.json({ status: 'Usuario existente.'})
        }

        await user.save();
        return res.json({status: 'Exitoso'})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ error: error.message })
    }
}

export const modifyUser = async (req, res) => {
    try {
        const { name, email, password, age } = req.body
        const newUser = { name, email, password, age };
        await User.findByIdAndUpdate(req.params.id, newUser);
        res.json({ status: 'Usuario modificado' });
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ error: error.message })
    }
}

export const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ status: 'Usuario eliminado' })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ error: error.message })
    }
}

export const findUser = async (req, res) => {
    try {
        const { email, password } = req.body;
    
        // Check if exists
        const existUser = await User.findOne({ email: req.body.email, password: req.body.password })
        if (!existUser) {
            return res.json({status: 'Usuario incorrecto. Intente otra vez...'})
        }
        return res.json({ status: 'Exitoso'})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ error: error.message })
    }
}
*/ 
