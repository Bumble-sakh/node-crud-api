import { createServer, IncomingMessage, ServerResponse } from 'http';
import { Methods } from './constants';
import { store, UserData } from './store/store';
import { isUserDataValid } from './helpers';
import { v4 as uuid } from 'uuid';

const requestListener = (req: IncomingMessage, res: ServerResponse) => {
  const [prefix, endpoint, id] = req.url.split('/').slice(1);
  const method = req.method;

  let userData: UserData;

  req.setEncoding('utf-8');
  req.on('data', (data) => {
    userData = JSON.parse(data);
  });

  req.on('end', () => {
    if (prefix === 'api' && endpoint === 'users') {
      if (id) {
        switch (method) {
          case Methods.GET:
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(200);
            res.end(
              JSON.stringify({
                code: 200,
                message: 'OK',
              })
            );
            break;

          case Methods.PUT:
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(200);
            res.end(
              JSON.stringify({
                code: 200,
                message: 'OK',
              })
            );

            break;

          case Methods.DELETE:
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(200);
            res.end(
              JSON.stringify({
                code: 200,
                message: 'OK',
              })
            );
            break;

          default:
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(400);
            res.end(
              JSON.stringify({
                code: 400,
                message: 'Bad request',
              })
            );
            break;
        }
      } else {
        switch (method) {
          case Methods.GET:
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(200);
            res.end(
              JSON.stringify({
                code: 200,
                data: store,
                message: 'OK',
              })
            );
            break;

          case Methods.POST:
            if (isUserDataValid(userData)) {
              store.push({ ...userData, id: uuid() });

              res.setHeader('Content-Type', 'application/json');
              res.writeHead(201);
              res.end(
                JSON.stringify({
                  code: 201,
                  data: userData,
                  message: 'Created',
                })
              );
            } else {
              res.setHeader('Content-Type', 'application/json');
              res.writeHead(400);
              res.end(
                JSON.stringify({
                  code: 400,
                  message: 'Bad request',
                })
              );
            }
            break;

          default:
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(400);
            res.end(
              JSON.stringify({
                code: 400,
                message: 'Bad request',
              })
            );
            break;
        }
      }
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(404);
      res.end(
        JSON.stringify({
          code: 404,
          message: 'Not found',
        })
      );
    }
  });
};

export const runServer = (port: number) => {
  const server = createServer(requestListener);

  server.listen(port, () => {
    console.log(`Server process ${process.pid} listen: ${port}`);
  });
};
