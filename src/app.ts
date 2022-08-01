import express from 'express';
import createError, {HttpError} from 'http-errors';
class App {
    public app: express.Application;

    public static bootstrap(): App {
        return new App();
    }

    constructor() {
        this.app = express();

        //route 영역
        this.app.use('/', () => {
            console.log("헬로우");
        });

        this.app.use(function (req, res, next) {
            next(createError(404));
        });

        this.app.use(function (err: HttpError, req: express.Request, res: express.Response, next: express.NextFunction) {
            let apiError = err;
            if (!err.status) {
                apiError = createError(err);
            }
        }) 
    }
}

export default App;