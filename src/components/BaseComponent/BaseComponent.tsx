import { BaseComponentTitle } from 'components/BaseComponent/baseComponent.styled';
import { BaseComponentProps } from 'components/BaseComponent/baseComponent.types';

export const BaseComponent = ({ title }: BaseComponentProps) => (
  <BaseComponentTitle>{title}</BaseComponentTitle>
);
