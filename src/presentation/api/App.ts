// app.ts
import express from 'express';
import { IModule } from './IModule';
import {TaskModule} from './tasks/TaskModule';
import {UserModule} from './user/UserModule';
import {LoginModule} from './login/LoginModule';

export class App {
  static modules:IModule[] = [ new TaskModule(),new UserModule(),new LoginModule()];
  static create(){
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    this.initializeModules(app);
    return app;
  }

  static initializeModules(app: express.Express){
    this.modules.forEach((module)=>{
      module.init(app);
    })
  }
}