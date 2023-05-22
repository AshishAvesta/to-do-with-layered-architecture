import express from 'express';

export interface IModule{
    init(app: express.Express): void;
}