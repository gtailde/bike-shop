export type onChangePassword = (currentPassword: string, newPassword: string) => Promise<void>;

export interface UserPassworsProps {
  onChangePassword: onChangePassword;
}

export interface UserPasswordEditProps {
  onBack: () => void;
  onSave: () => void;
  onChangePassword: onChangePassword;
}
