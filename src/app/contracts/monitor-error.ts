export interface IMonitorError {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  capture: (exception: Error, metadata?: any) => void;
}
