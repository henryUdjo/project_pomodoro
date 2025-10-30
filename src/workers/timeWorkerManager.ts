import type { TaskStateModel } from '../models/TaskStateModel';

let instance: timeWorkerManager | null = null;

export class timeWorkerManager {
  private worker: Worker;

  private constructor() {
    this.worker = new Worker(new URL('./timeworker.js', import.meta.url));
  }

  static getInstance(): timeWorkerManager {
    if (!instance) {
      instance = new timeWorkerManager();
    }

    return instance;
  }

  postMessage(messsage: TaskStateModel) {
    this.worker.postMessage(messsage);
  }

  onmessage(cb: (e: MessageEvent) => void) {
    this.worker.onmessage = cb;
  }

  terminate() {
    this.worker.terminate();
    instance = null;
  }
}
