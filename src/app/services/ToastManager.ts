import { Toaster, IToaster, IToastProps, Intent } from '@blueprintjs/core';
import { DEFAULT_TOASTER_PROPS } from 'app/constants';

export const defaultToastProps: IToastProps = {
  className: 'toast-item',
  intent: Intent.PRIMARY,
  message: '_blank_',
  timeout: 10000,
};

export class ToastManager {
  private toaster: IToaster;
  
  constructor() {
    this.toaster = Toaster.create(DEFAULT_TOASTER_PROPS);
  }

  public show(options: IToastProps): void {
    this.toaster.show(Object.assign({}, defaultToastProps, options));
  }

  public showError(message: string): void {
    this.show({
      message,
      icon: 'error',
      intent: Intent.WARNING,
    });

    console.log(`ToastError: ${message}`);
  }
  
  public showSuccess(message: string): void {
    this.show({
      message,
      icon: 'tick',
      intent: Intent.SUCCESS,
    });
  
    console.log(`ToastSuccess: ${message}`);
  }
}

export default ToastManager;
