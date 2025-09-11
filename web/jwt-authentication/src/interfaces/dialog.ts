/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Footer {
  text: string;
  action: (...args: any[]) => any;
}

export interface Props {
  open: boolean;
  title: string;
  content: any;
  footer: Footer[];
  closeDialog: () => void;
}
