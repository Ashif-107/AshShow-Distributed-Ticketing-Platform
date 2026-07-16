import { httpDuration } from "./metrics";

export function metricsMiddleware(req: any, res: any, next: any) {
  const end = httpDuration.startTimer();
  res.on("finish", () => {
    end({
      method: req.method,
      route: req.route?.path || req.path,
      status: res.statusCode,
    });
  });
  next();
}