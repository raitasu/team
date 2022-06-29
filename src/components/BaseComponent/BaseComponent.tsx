import { BaseComponentProps } from 'components/BaseComponent/baseComponent.types';
import { BaseComponentTitle } from 'components/BaseComponent/baseComponent.styled';

export const BaseComponent = ({ title }: BaseComponentProps) => {
  return <BaseComponentTitle>{title}</BaseComponentTitle>;
};
