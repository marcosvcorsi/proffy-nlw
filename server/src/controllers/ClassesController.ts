import { Response, Request } from 'express';

export default class ClassesControler {
  public async create(request: Request, response: Response): Promise<Response> {
    const {} = request.body;

    return response.send();
  }
}
